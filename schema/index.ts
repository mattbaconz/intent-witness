export {
  parseComparisonResult,
  parseReviewResult,
  validateComparisonResult,
  validateReviewResult,
} from "./validate.ts";
export {
  PROTOCOL_VERSION,
  SCHEMA_VERSION,
  type ComparisonResult,
  type Confidence,
  type Evidence,
  type FindingSeverity,
  type ProblemDepth,
  type ProductIntent,
  type ReviewFinding,
  type ReviewResult,
  type ReviewVerdict,
  type ValidationResult,
} from "./types.ts";
export {
  comparisonResultSchema,
  evidenceSchema,
  problemDepthSchema,
  productIntentSchema,
  reviewFindingSchema,
  reviewResultSchema,
} from "./zod.ts";
