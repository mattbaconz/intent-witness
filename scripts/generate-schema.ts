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

function applyComparisonRules(schema: JsonObject) {
  const properties = schema.properties as JsonObject;
  properties.resolvedFindingIds.uniqueItems = true;
  properties.unresolvedFindingIds.uniqueItems = true;
}

const schemas: Record<string, JsonObject> = {
  "review-result.schema.json": z.toJSONSchema(reviewResultSchema),
  "review-request.schema.json": z.toJSONSchema(reviewRequestSchema),
  "review-artifact.schema.json": z.toJSONSchema(reviewArtifactSchema),
};
applyReviewResultRules(schemas["review-result.schema.json"]);
const artifact = schemas["review-artifact.schema.json"];
applyReviewResultRules(artifact.properties.result);
applyComparisonRules(artifact.properties.comparison);
applyFindingRules(artifact.properties.comparison.properties.regressions.items);
artifact.$comment = "JSON Schema cannot express that resolvedFindingIds and unresolvedFindingIds are disjoint, or that regression IDs are globally unique; validate those cross-array rules with the published runtime validator.";
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
