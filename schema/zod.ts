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
export const comparisonVerdictSchema = z.enum(["PASS", "PASS_WITH_NOTES", "REVISE"]);

const screenshotEvidenceSchema = z.object({
  kind: z.literal("screenshot"),
  path: z.string().min(1),
  region: z.string().optional(),
  note: z.string().optional(),
  fact: z.string().optional(),
});

const domEvidenceSchema = z.object({
  kind: z.literal("dom"),
  selector: z.string().optional(),
  fact: z.string().min(1),
});

const sourceEvidenceSchema = z.object({
  kind: z.literal("source"),
  file: z.string().min(1),
  line: z.number().optional(),
  fact: z.string().min(1),
});

const interactionEvidenceSchema = z.object({
  kind: z.literal("interaction"),
  route: z.string().min(1),
  steps: z.array(z.string()),
  fact: z.string().min(1),
});

const responsiveEvidenceSchema = z.object({
  kind: z.literal("responsive"),
  viewport: z.string().min(1),
  fact: z.string().min(1),
});

const designMemoryEvidenceSchema = z.object({
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

export const reviewFindingSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  observation: z.string().min(1),
  productMismatch: z.string().min(1),
  evidence: z.array(evidenceSchema),
  depth: problemDepthSchema,
  severity: severitySchema,
  confidence: confidenceSchema,
  revisionConstraint: z.string().optional(),
});

export const reviewResultSchema = z.object({
  protocolVersion: z.string().min(1),
  schemaVersion: z.string().min(1),
  verdict: reviewVerdictSchema,
  summary: z.string().min(1),
  deepestProblem: problemDepthSchema.nullable().optional(),
  findings: z.array(reviewFindingSchema),
  alternativesRequired: z.boolean(),
  alternativeConstraints: z.array(z.string()).optional(),
  overallConfidence: confidenceSchema,
});

export const comparisonResultSchema = z.object({
  priorReviewId: z.string().min(1),
  resolvedFindingIds: z.array(z.string()),
  unresolvedFindingIds: z.array(z.string()),
  regressions: z.array(reviewFindingSchema),
  improvements: z.array(z.string()),
  verdict: comparisonVerdictSchema,
  nextAction: z.string().min(1),
});

export const productIntentSchema = z.object({
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
