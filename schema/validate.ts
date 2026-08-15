import { parse as parseYaml } from "yaml";
import type {
  ComparisonResult,
  ReviewArtifact,
  ReviewFinding,
  ReviewRequest,
  ReviewResult,
  ValidationResult,
} from "./types.ts";
import { normalizeKeys, normalizeReviewShape } from "./normalize.ts";
import { comparisonResultSchema, reviewArtifactSchema, reviewRequestSchema, reviewResultSchema } from "./zod.ts";

function zodIssues(error: { issues: { path: PropertyKey[]; message: string }[] }): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  });
}

export function validateReviewResult(input: unknown): ValidationResult<ReviewResult> {
  const normalized = normalizeReviewShape(input);
  const parsed = reviewResultSchema.safeParse(normalized);
  if (!parsed.success) {
    return { ok: false, errors: zodIssues(parsed.error) };
  }
  return { ok: true, value: parsed.data };
}

export function parseReviewResult(input: unknown): ReviewResult {
  const raw = typeof input === "string" ? parseYaml(input) : input;
  const result = validateReviewResult(raw);
  if (!result.ok) {
    throw new Error(result.errors.join("; "));
  }
  return result.value;
}

export function validateComparisonResult(input: unknown): ValidationResult<ComparisonResult> {
  const normalized = normalizeKeys(input);
  const parsed = comparisonResultSchema.safeParse(normalized);
  if (!parsed.success) {
    return { ok: false, errors: zodIssues(parsed.error) };
  }
  return { ok: true, value: parsed.data };
}

export function parseComparisonResult(input: unknown): ComparisonResult {
  const raw = typeof input === "string" ? parseYaml(input) : input;
  const result = validateComparisonResult(raw);
  if (!result.ok) {
    throw new Error(result.errors.join("; "));
  }
  return result.value;
}

export function validateReviewRequest(input: unknown): ValidationResult<ReviewRequest> {
  const parsed = reviewRequestSchema.safeParse(normalizeReviewShape(input));
  return parsed.success ? { ok: true, value: parsed.data } : { ok: false, errors: zodIssues(parsed.error) };
}

export function validateReviewArtifact(input: unknown): ValidationResult<ReviewArtifact> {
  const parsed = reviewArtifactSchema.safeParse(normalizeReviewShape(input));
  return parsed.success ? { ok: true, value: parsed.data } : { ok: false, errors: zodIssues(parsed.error) };
}

export function parseReviewArtifact(input: unknown): ReviewArtifact {
  const raw = typeof input === "string" ? parseYaml(input) : input;
  const result = validateReviewArtifact(raw);
  if (!result.ok) throw new Error(result.errors.join("; "));
  return result.value;
}
