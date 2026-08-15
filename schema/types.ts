export const PROTOCOL_VERSION = "0.1";
export const SCHEMA_VERSION = "0.1";

export interface ProductIntent {
  productName?: string;
  domain: string;
  targetUsers: string[];
  primaryJob: string;
  secondaryJobs?: string[];
  primaryObjects: string[];
  criticalStates?: string[];
  desiredTraits?: string[];
  constraints?: string[];
  explicitAvoid?: string[];
}

export type Evidence =
  | { kind: "screenshot"; path: string; region?: string; note?: string; fact?: string }
  | { kind: "dom"; selector?: string; fact: string }
  | { kind: "source"; file: string; line?: number; fact: string }
  | { kind: "interaction"; route: string; steps: string[]; fact: string }
  | { kind: "responsive"; viewport: string; fact: string }
  | { kind: "design-memory"; source: string; fact: string };

export type ProblemDepth =
  | "polish"
  | "composition"
  | "information_architecture"
  | "interaction";

export type FindingSeverity = "non_blocking" | "material";
export type Confidence = "low" | "medium" | "high";
export type ReviewVerdict =
  | "PASS"
  | "PASS_WITH_NOTES"
  | "REVISE"
  | "INSUFFICIENT_EVIDENCE";

export interface ReviewFinding {
  id: string;
  title: string;
  observation: string;
  productMismatch: string;
  evidence: Evidence[];
  depth: ProblemDepth;
  severity: FindingSeverity;
  confidence: Confidence;
  revisionConstraint?: string;
}

export interface ReviewResult {
  protocolVersion: string;
  schemaVersion: string;
  verdict: ReviewVerdict;
  summary: string;
  deepestProblem?: ProblemDepth | null;
  findings: ReviewFinding[];
  alternativesRequired: boolean;
  alternativeConstraints?: string[];
  overallConfidence: Confidence;
}

export interface ComparisonResult {
  priorReviewId: string;
  resolvedFindingIds: string[];
  unresolvedFindingIds: string[];
  regressions: ReviewFinding[];
  improvements: string[];
  verdict: "PASS" | "PASS_WITH_NOTES" | "REVISE";
  nextAction: string;
}

export type ValidationSuccess<T> = { ok: true; value: T };
export type ValidationFailure = { ok: false; errors: string[] };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;
