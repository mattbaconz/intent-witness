import Ajv2020 from "ajv/dist/2020.js";
import reviewResultSchema from "./review-result.schema.json";
import reviewArtifactSchema from "./review-artifact.schema.json";
import reviewRequestSchema from "./review-request.schema.json";
import { describe, expect, it } from "vitest";
import { validateComparisonResult, validateReviewArtifact, validateReviewRequest } from "./validate.ts";

const valid = {
  protocolVersion: "0.1", schemaVersion: "0.1", verdict: "REVISE", summary: "Hierarchy needs revision.", deepestProblem: "information_architecture", overallConfidence: "high", alternativesRequired: true,
  alternativeConstraints: ["Put active work first.", "Keep administration secondary."],
  findings: [{ id: "f1", title: "Active work is buried", observation: "Metrics lead.", productMismatch: "Operators need active work first.", depth: "information_architecture", severity: "material", confidence: "high", evidence: [{ kind: "screenshot", path: "evidence/a.png" }] }],
};
const ajv = new Ajv2020({ strict: false, formats: { "date-time": true } });
const check = ajv.compile(reviewResultSchema);
const checkArtifact = ajv.compile(reviewArtifactSchema);
const checkRequest = ajv.compile(reviewRequestSchema);

const validRequest = {
  protocolVersion: "0.1", schemaVersion: "0.1", reviewId: "r", mode: "initial",
  target: { route: "/runs", baseUrl: "http://localhost:5173", changedFiles: ["src/App.tsx"] },
  productIntent: { domain: "operations", targetUsers: ["operator"], primaryJob: "Monitor active execution", primaryObjects: ["run"] },
  constraints: [], capturedEvidence: [{ kind: "screenshot", path: "evidence/a.png", fact: "Metrics lead." }],
};

const artifactWith = (result: unknown, comparison?: unknown) => ({
  protocolVersion: "0.1", schemaVersion: "0.1",
  metadata: { reviewId: "r", createdAt: "2026-08-15T00:00:00.000Z", mode: comparison ? "comparison" : "initial" },
  result,
  ...(comparison ? { comparison } : {}),
});

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

  it("rejects more than five material findings in standalone results and artifacts", () => {
    const findings = Array.from({ length: 6 }, (_, index) => ({ ...valid.findings[0], id: `f${index + 1}` }));
    const result = { ...valid, findings };
    expect(check(result)).toBe(false);
    expect(checkArtifact(artifactWith(result))).toBe(false);
  });

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

  it("rejects a material comparison regression with no evidence", () => {
    const artifact = {
      protocolVersion: "0.1", schemaVersion: "0.1", metadata: { reviewId: "r", createdAt: "2026-08-15T00:00:00.000Z", mode: "comparison" }, result: valid,
      comparison: { priorReviewId: "prior", resolvedFindingIds: [], unresolvedFindingIds: [], regressions: [{ ...valid.findings[0], evidence: [] }], improvements: [], verdict: "REVISE", nextAction: "Fix it." },
    };
    expect(ajv.compile(reviewArtifactSchema)(artifact)).toBe(false);
  });

  it("rejects more than five material comparison regressions at runtime and in artifacts", () => {
    const comparison = {
      priorReviewId: "prior", resolvedFindingIds: [], unresolvedFindingIds: [],
      regressions: Array.from({ length: 6 }, (_, index) => ({ ...valid.findings[0], id: `r${index + 1}` })),
      improvements: [], verdict: "REVISE", nextAction: "Fix it.",
    };
    expect(validateComparisonResult(comparison).ok).toBe(false);
    expect(checkArtifact(artifactWith(valid, comparison))).toBe(false);
  });
});

describe("runtime and JSON Schema input parity", () => {
  it("requires priorReviewId for comparison requests in both validators", () => {
    const request = { ...validRequest, mode: "comparison" };
    expect(validateReviewRequest(request).ok).toBe(false);
    expect(checkRequest(request)).toBe(false);
  });

  it("accepts reference evidence shorthand in requests and nested artifacts", () => {
    const referenceEvidence = { kind: "source", reference: "src/App.tsx", fact: "Metrics precede active work." };
    const request = { ...validRequest, capturedEvidence: [referenceEvidence] };
    const nestedFinding = { ...valid.findings[0], evidence: [referenceEvidence] };
    const comparison = {
      priorReviewId: "prior", resolvedFindingIds: [], unresolvedFindingIds: [],
      regressions: [{ ...nestedFinding, id: "r1" }], improvements: [], verdict: "REVISE", nextAction: "Fix it.",
    };
    const artifact = artifactWith({ ...valid, findings: [nestedFinding] }, comparison);

    expect(validateReviewRequest(request).ok).toBe(true);
    expect(checkRequest(request)).toBe(true);
    expect(validateReviewArtifact(artifact).ok).toBe(true);
    expect(checkArtifact(artifact)).toBe(true);
  });

  it("rejects unrelated evidence fields in both validators", () => {
    const request = {
      ...validRequest,
      capturedEvidence: [{ ...validRequest.capturedEvidence[0], unrelated: "not evidence" }],
    };
    expect(validateReviewRequest(request).ok).toBe(false);
    expect(checkRequest(request)).toBe(false);
  });
});
