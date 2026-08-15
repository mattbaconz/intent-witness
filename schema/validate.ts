import { parse as parseYaml } from "yaml";
import type {
  ComparisonResult,
  ReviewFinding,
  ReviewResult,
  ValidationResult,
} from "./types.ts";
import { normalizeKeys, normalizeReviewShape } from "./normalize.ts";
import { comparisonResultSchema, reviewResultSchema } from "./zod.ts";

const STRUCTURAL_DEPTHS = new Set(["information_architecture", "interaction"]);
const MAX_MATERIAL_FINDINGS = 5;

function zodIssues(error: { issues: { path: (string | number)[]; message: string }[] }): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  });
}

function materialFindings(findings: ReviewFinding[]): ReviewFinding[] {
  return findings.filter((finding) => finding.severity === "material");
}

function reviewRuleErrors(result: ReviewResult): string[] {
  const errors: string[] = [];
  const material = materialFindings(result.findings);

  for (const finding of material) {
    if (!finding.evidence || finding.evidence.length === 0) {
      errors.push(`Material finding ${finding.id} requires at least one evidence item`);
    }
  }

  if (result.verdict === "REVISE" && material.length === 0) {
    errors.push("REVISE requires at least one material finding");
  }

  if (material.length > MAX_MATERIAL_FINDINGS) {
    errors.push(`Reviewer may not return more than ${MAX_MATERIAL_FINDINGS} material findings`);
  }

  if (result.alternativesRequired) {
    const depth = result.deepestProblem;
    if (!depth || !STRUCTURAL_DEPTHS.has(depth)) {
      errors.push(
        "alternativesRequired is only valid when deepestProblem is information_architecture or interaction",
      );
    }
  }

  return errors;
}

export function validateReviewResult(input: unknown): ValidationResult<ReviewResult> {
  const normalized = normalizeReviewShape(input);
  const parsed = reviewResultSchema.safeParse(normalized);
  if (!parsed.success) {
    return { ok: false, errors: zodIssues(parsed.error) };
  }
  const rules = reviewRuleErrors(parsed.data);
  if (rules.length > 0) {
    return { ok: false, errors: rules };
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
