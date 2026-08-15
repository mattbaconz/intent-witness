import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";
import { reviewArtifactSchema, reviewRequestSchema, reviewResultSchema } from "../schema/zod.ts";

const root = resolve(import.meta.dirname, "..");
type JsonObject = Record<string, any>;

function applyReviewResultRules(schema: JsonObject) {
  const properties = schema.properties as JsonObject;
  const finding = properties.findings.items as JsonObject;
  applyFindingRules(finding);
  applyMaterialFindingLimit(properties.findings);
  schema.allOf = [...(schema.allOf ?? []),
    {
      if: { properties: { verdict: { const: "REVISE" } }, required: ["verdict"] },
      then: { properties: { findings: { contains: { properties: { severity: { const: "material" } }, required: ["severity"] }, minContains: 1 } } },
    },
    {
      if: { properties: { verdict: { enum: ["PASS", "PASS_WITH_NOTES"] } }, required: ["verdict"] },
      then: { properties: { findings: { not: { contains: { properties: { severity: { const: "material" } }, required: ["severity"] } } } } },
    },
    {
      if: { properties: { alternativesRequired: { const: true } }, required: ["alternativesRequired"] },
      then: { required: ["alternativeConstraints"], properties: { deepestProblem: { enum: ["information_architecture", "interaction"] }, alternativeConstraints: { minItems: 2, maxItems: 3, items: { type: "string", minLength: 1 } } } },
    },
  ];
}

function applyFindingRules(finding: JsonObject) {
  finding.allOf = [...(finding.allOf ?? []), {
    if: { properties: { severity: { const: "material" } }, required: ["severity"] },
    then: { properties: { evidence: { minItems: 1 } } },
  }];
}

function applyMaterialFindingLimit(findings: JsonObject) {
  findings.contains = { properties: { severity: { const: "material" } }, required: ["severity"] };
  findings.minContains = 0;
  findings.maxContains = 5;
}

function applyComparisonRules(schema: JsonObject) {
  const properties = schema.properties as JsonObject;
  properties.resolvedFindingIds.uniqueItems = true;
  properties.unresolvedFindingIds.uniqueItems = true;
  applyMaterialFindingLimit(properties.regressions);
}

function applyReviewRequestRules(schema: JsonObject) {
  schema.allOf = [...(schema.allOf ?? []), {
    if: { properties: { mode: { const: "comparison" } }, required: ["mode"] },
    then: { required: ["priorReviewId"] },
  }];
}

const EVIDENCE_REQUIRED_FIELDS: Record<string, string[]> = {
  screenshot: ["path"],
  dom: ["fact"],
  source: ["file", "fact"],
  interaction: ["route", "fact"],
  responsive: ["viewport", "fact"],
  "design-memory": ["source", "fact"],
};

function applyEvidenceReferenceSemantics(schema: unknown) {
  if (!schema || typeof schema !== "object") return;
  const node = schema as JsonObject;
  const kind = node.properties?.kind?.const;
  const canonicalRequired = typeof kind === "string" ? EVIDENCE_REQUIRED_FIELDS[kind] : undefined;
  if (canonicalRequired) {
    node.properties.reference = { type: "string", minLength: 1 };
    node.required = (node.required ?? []).filter((field: string) => !canonicalRequired.includes(field));
    node.allOf = [...(node.allOf ?? []), {
      anyOf: [
        { required: ["reference"] },
        { required: canonicalRequired },
      ],
    }];
  }
  for (const nested of Object.values(node)) applyEvidenceReferenceSemantics(nested);
}

const schemas: Record<string, JsonObject> = {
  "review-result.schema.json": z.toJSONSchema(reviewResultSchema),
  "review-request.schema.json": z.toJSONSchema(reviewRequestSchema),
  "review-artifact.schema.json": z.toJSONSchema(reviewArtifactSchema),
};
applyReviewResultRules(schemas["review-result.schema.json"]);
applyReviewRequestRules(schemas["review-request.schema.json"]);
const artifact = schemas["review-artifact.schema.json"];
applyReviewResultRules(artifact.properties.result);
applyComparisonRules(artifact.properties.comparison);
applyFindingRules(artifact.properties.comparison.properties.regressions.items);
artifact.$comment = "JSON Schema cannot express that resolvedFindingIds and unresolvedFindingIds are disjoint, or that regression IDs are globally unique; validate those cross-array rules with the published runtime validator.";
for (const schema of Object.values(schemas)) applyEvidenceReferenceSemantics(schema);
const check = process.argv.includes("--check");
const drifted: string[] = [];
for (const [name, schema] of Object.entries(schemas)) {
  const path = resolve(root, "schema", name);
  const output = `${JSON.stringify(schema, null, 2)}\n`;
  if (check) {
    if (!existsSync(path) || readFileSync(path, "utf8") !== output) drifted.push(`schema/${name}`);
  } else writeFileSync(path, output);
}
if (drifted.length) {
  console.error(`Schema drift detected: ${drifted.join(", ")}`);
  process.exit(1);
}
