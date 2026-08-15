import { z } from "zod";

export const problemDepthSchema = z.enum([
  "polish",
  "composition",
  "information_architecture",
  "interaction",
]);

export const confidenceSchema = z.enum(["low", "medium", "high"]);
export const severitySchema = z.enum(["non_blocking", "material"]);
export const reviewVerdictSchema = z.enum([
  "PASS",
  "PASS_WITH_NOTES",
  "REVISE",
  "INSUFFICIENT_EVIDENCE",
]);
export const reviewModeSchema = z.enum(["initial", "comparison"]);
export const comparisonVerdictSchema = z.enum(["PASS", "PASS_WITH_NOTES", "REVISE"]);

const screenshotEvidenceSchema = z.strictObject({
  kind: z.literal("screenshot"),
  path: z.string().min(1),
  region: z.string().optional(),
  note: z.string().optional(),
  fact: z.string().optional(),
});

const domEvidenceSchema = z.strictObject({
  kind: z.literal("dom"),
  selector: z.string().optional(),
  fact: z.string().min(1),
});

const sourceEvidenceSchema = z.strictObject({
  kind: z.literal("source"),
  file: z.string().min(1),
  line: z.number().optional(),
  fact: z.string().min(1),
});

const interactionEvidenceSchema = z.strictObject({
  kind: z.literal("interaction"),
  route: z.string().min(1),
  steps: z.array(z.string()).default([]),
  fact: z.string().min(1),
});

const responsiveEvidenceSchema = z.strictObject({
  kind: z.literal("responsive"),
  viewport: z.string().min(1),
  fact: z.string().min(1),
});

const designMemoryEvidenceSchema = z.strictObject({
  kind: z.literal("design-memory"),
  source: z.string().min(1),
  fact: z.string().min(1),
});

export const evidenceSchema = z.discriminatedUnion("kind", [
  screenshotEvidenceSchema,
  domEvidenceSchema,
  sourceEvidenceSchema,
  interactionEvidenceSchema,
  responsiveEvidenceSchema,
  designMemoryEvidenceSchema,
]);

export const reviewFindingSchema = z.strictObject({
  id: z.string().min(1),
  title: z.string().min(1),
  observation: z.string().min(1),
  productMismatch: z.string().min(1),
  evidence: z.array(evidenceSchema),
  depth: problemDepthSchema,
  severity: severitySchema,
  confidence: confidenceSchema,
  revisionConstraint: z.string().optional(),
}).superRefine((finding, context) => {
  if (finding.severity === "material" && finding.evidence.length === 0) context.addIssue({ code: "custom", path: ["evidence"], message: `Material finding ${finding.id} requires at least one evidence item` });
});

export const evidenceRequestSchema = z.strictObject({
  id: z.string().min(1),
  request: z.string().trim().min(1),
  reason: z.string().trim().min(1),
});

const structuralDepths = new Set(["information_architecture", "interaction"]);
const materialFindings = (findings: z.infer<typeof reviewFindingSchema>[]) =>
  findings.filter((finding) => finding.severity === "material");

export const reviewResultSchema = z.strictObject({
  protocolVersion: z.literal("0.1"),
  schemaVersion: z.literal("0.1"),
  verdict: reviewVerdictSchema,
  summary: z.string().min(1),
  deepestProblem: problemDepthSchema.nullable().optional(),
  findings: z.array(reviewFindingSchema),
  alternativesRequired: z.boolean(),
  alternativeConstraints: z.array(z.string()).optional(),
  overallConfidence: confidenceSchema,
  evidenceRequests: z.array(evidenceRequestSchema).optional(),
}).superRefine((result, context) => {
  const material = materialFindings(result.findings);
  if (result.verdict === "REVISE" && material.length === 0) context.addIssue({ code: "custom", path: ["findings"], message: "REVISE requires at least one material finding" });
  if ((result.verdict === "PASS" || result.verdict === "PASS_WITH_NOTES") && material.length > 0) context.addIssue({ code: "custom", path: ["findings"], message: `${result.verdict} cannot contain material findings` });
  if (material.length > 5) context.addIssue({ code: "custom", path: ["findings"], message: "Reviewer may not return more than 5 material findings" });
  if (result.alternativesRequired) {
    if (!result.deepestProblem || !structuralDepths.has(result.deepestProblem)) context.addIssue({ code: "custom", path: ["alternativesRequired"], message: "alternativesRequired is only valid when deepestProblem is information_architecture or interaction" });
    const constraints = result.alternativeConstraints ?? [];
    if (constraints.length < 2 || constraints.length > 3 || constraints.some((constraint) => constraint.trim().length === 0)) context.addIssue({ code: "custom", path: ["alternativeConstraints"], message: "Structural alternatives require 2–3 non-empty constraints" });
  }
});

export const comparisonResultSchema = z.strictObject({
  priorReviewId: z.string().min(1),
  resolvedFindingIds: z.array(z.string()),
  unresolvedFindingIds: z.array(z.string()),
  regressions: z.array(reviewFindingSchema),
  improvements: z.array(z.string()),
  verdict: comparisonVerdictSchema,
  nextAction: z.string().min(1),
}).superRefine((comparison, context) => {
  const resolved = new Set(comparison.resolvedFindingIds);
  const unresolved = new Set(comparison.unresolvedFindingIds);
  if (materialFindings(comparison.regressions).length > 5) context.addIssue({ code: "custom", path: ["regressions"], message: "Comparison may not return more than 5 material regressions" });
  const allIds = [...comparison.resolvedFindingIds, ...comparison.unresolvedFindingIds, ...comparison.regressions.map((finding) => finding.id)];
  if (new Set(allIds).size !== allIds.length) context.addIssue({ code: "custom", path: ["resolvedFindingIds"], message: "Comparison finding IDs must be unique" });
  if ([...resolved].some((id) => unresolved.has(id))) context.addIssue({ code: "custom", path: ["unresolvedFindingIds"], message: "Resolved and unresolved finding IDs must be disjoint" });
});

export const productIntentSchema = z.strictObject({
  productName: z.string().optional(),
  domain: z.string().min(1),
  targetUsers: z.array(z.string()),
  primaryJob: z.string().min(1),
  secondaryJobs: z.array(z.string()).optional(),
  primaryObjects: z.array(z.string()),
  criticalStates: z.array(z.string()).optional(),
  desiredTraits: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
  explicitAvoid: z.array(z.string()).optional(),
});

export const reviewRequestSchema = z.strictObject({
  protocolVersion: z.literal("0.1"),
  schemaVersion: z.literal("0.1"),
  reviewId: z.string().min(1),
  mode: reviewModeSchema,
  target: z.strictObject({ route: z.string().min(1), baseUrl: z.string().url(), changedFiles: z.array(z.string().min(1)) }),
  productIntent: productIntentSchema,
  constraints: z.array(z.string().min(1)),
  capturedEvidence: z.array(evidenceSchema).min(1),
  priorReviewId: z.string().min(1).optional(),
}).superRefine((request, context) => {
  if (request.mode === "comparison" && !request.priorReviewId) context.addIssue({ code: "custom", path: ["priorReviewId"], message: "comparison mode requires a priorReviewId" });
});

export const reviewArtifactSchema = z.strictObject({
  protocolVersion: z.literal("0.1"),
  schemaVersion: z.literal("0.1"),
  metadata: z.strictObject({ reviewId: z.string().min(1), createdAt: z.string().datetime(), mode: reviewModeSchema }),
  result: reviewResultSchema,
  comparison: comparisonResultSchema.optional(),
});
