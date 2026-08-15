import Ajv2020 from "ajv/dist/2020.js";
import reviewResultSchema from "./review-result.schema.json";
import reviewArtifactSchema from "./review-artifact.schema.json";
import { describe, expect, it } from "vitest";
import { validateComparisonResult } from "./validate.ts";

const valid = {
  protocolVersion: "0.1", schemaVersion: "0.1", verdict: "REVISE", summary: "Hierarchy needs revision.", deepestProblem: "information_architecture", overallConfidence: "high", alternativesRequired: true,
  alternativeConstraints: ["Put active work first.", "Keep administration secondary."],
  findings: [{ id: "f1", title: "Active work is buried", observation: "Metrics lead.", productMismatch: "Operators need active work first.", depth: "information_architecture", severity: "material", confidence: "high", evidence: [{ kind: "screenshot", path: "evidence/a.png" }] }],
};
const ajv = new Ajv2020({ strict: false, formats: { "date-time": true } });
const check = ajv.compile(reviewResultSchema);

describe("generated review-result JSON Schema", () => {
  it.each([
    ["material evidence", { ...valid, findings: [{ ...valid.findings[0], evidence: [] }] }],
    ["REVISE material finding", { ...valid, findings: [{ ...valid.findings[0], severity: "non_blocking" }] }],
    ["PASS material finding", { ...valid, verdict: "PASS" }],
    ["PASS_WITH_NOTES material finding", { ...valid, verdict: "PASS_WITH_NOTES" }],
    ["one alternative", { ...valid, alternativeConstraints: ["Only one"] }],
    ["four alternatives", { ...valid, alternativeConstraints: ["1", "2", "3", "4"] }],
    ["non-structural alternative depth", { ...valid, deepestProblem: "composition" }],
    ["blank alternative", { ...valid, alternativeConstraints: ["1", ""] }],
  ])("rejects invalid %s", (_name, input) => expect(check(input)).toBe(false));

  it("accepts three structural alternatives", () => expect(check({ ...valid, alternativeConstraints: ["1", "2", "3"] })).toBe(true));

  it("documents and runtime-enforces cross-array disjointness", () => {
    expect((reviewArtifactSchema as { $comment?: string }).$comment).toMatch(/disjoint/i);
    expect(validateComparisonResult({ priorReviewId: "r", resolvedFindingIds: ["f"], unresolvedFindingIds: ["f"], regressions: [], improvements: [], verdict: "REVISE", nextAction: "Fix it." }).ok).toBe(false);
  });

  it("rejects duplicate comparison arrays in the artifact schema", () => {
    const artifact = {
      protocolVersion: "0.1", schemaVersion: "0.1", metadata: { reviewId: "r", createdAt: "2026-08-15T00:00:00.000Z", mode: "comparison" }, result: valid,
      comparison: { priorReviewId: "prior", resolvedFindingIds: ["f", "f"], unresolvedFindingIds: [], regressions: [], improvements: [], verdict: "REVISE", nextAction: "Fix it." },
    };
    expect(ajv.compile(reviewArtifactSchema)(artifact)).toBe(false);
  });
});
