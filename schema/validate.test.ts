import { describe, expect, it } from "vitest";
import * as validation from "./validate.ts";
import {
  parseReviewResult,
  validateComparisonResult,
  validateReviewResult,
} from "./validate.ts";

function contractValidator(name: "validateReviewRequest" | "validateReviewArtifact") {
  const candidate = (validation as Record<string, unknown>)[name];
  expect(typeof candidate).toBe("function");
  return candidate as (input: unknown) => { ok: boolean; errors?: string[] };
}

const materialFinding = {
  id: "finding-1",
  title: "Primary workflow is visually subordinate",
  observation:
    "Four aggregate KPI cards occupy the strongest first-viewport hierarchy.",
  product_mismatch:
    "The user's primary job is monitoring active execution, which sits below the fold.",
  depth: "information_architecture",
  severity: "material",
  confidence: "high",
  evidence: [
    {
      kind: "screenshot",
      path: "evidence/desktop-first-viewport.png",
      region: "top 400px",
      fact: "KPI strip is the dominant first-viewport structure.",
    },
  ],
  revision_constraint:
    "Do not solve by merely shrinking or restyling the KPI cards.",
};

const validRevise = {
  protocol_version: "0.1",
  schema_version: "0.1",
  verdict: "REVISE",
  summary: "Live execution is subordinate to generic metrics.",
  deepest_problem: "information_architecture",
  overall_confidence: "high",
  alternatives_required: true,
  alternative_constraints: [
    "One direction must organize around active execution.",
    "One direction cannot use a conventional dashboard grid.",
  ],
  findings: [materialFinding],
};

describe("validateReviewResult", () => {
  it("accepts a valid REVISE result in snake_case", () => {
    const result = validateReviewResult(validRevise);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.verdict).toBe("REVISE");
      expect(result.value.protocolVersion).toBe("0.1");
      expect(result.value.deepestProblem).toBe("information_architecture");
      expect(result.value.findings[0]?.productMismatch).toContain("active execution");
    }
  });

  it("accepts camelCase keys", () => {
    const result = validateReviewResult({
      protocolVersion: "0.1",
      schemaVersion: "0.1",
      verdict: "PASS",
      summary: "The metric-first layout matches an executive health-scan job.",
      overallConfidence: "high",
      alternativesRequired: false,
      findings: [],
    });
    expect(result.ok).toBe(true);
  });

  it("rejects REVISE without a material finding", () => {
    const result = validateReviewResult({
      ...validRevise,
      findings: [
        {
          ...materialFinding,
          severity: "non_blocking",
        },
      ],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/material finding/i);
    }
  });

  it("rejects a material finding without evidence", () => {
    const result = validateReviewResult({
      ...validRevise,
      findings: [
        {
          ...materialFinding,
          evidence: [],
        },
      ],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/evidence/i);
    }
  });

  it("rejects more than 5 material findings", () => {
    const findings = Array.from({ length: 6 }, (_, i) => ({
      ...materialFinding,
      id: `finding-${i + 1}`,
    }));
    const result = validateReviewResult({ ...validRevise, findings });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/5/);
    }
  });

  it("rejects alternativesRequired when deepest problem is polish", () => {
    const result = validateReviewResult({
      ...validRevise,
      deepest_problem: "polish",
      alternatives_required: true,
      findings: [
        {
          ...materialFinding,
          depth: "polish",
        },
      ],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.join(" ")).toMatch(/alternatives/i);
    }
  });

  it("requires two to three non-empty structural alternative constraints", () => {
    const result = validateReviewResult({
      ...validRevise,
      alternative_constraints: ["", "Keep the active run prominent.", "Extra direction", "Too many"],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toMatch(/2.*3|non-empty/i);
  });

  it("rejects material findings from PASS verdicts", () => {
    const result = validateReviewResult({ ...validRevise, verdict: "PASS" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toMatch(/PASS.*material/i);
  });

  it("rejects material findings from PASS_WITH_NOTES verdicts", () => {
    const result = validateReviewResult({ ...validRevise, verdict: "PASS_WITH_NOTES" });
    expect(result.ok).toBe(false);
  });

  it.each([[1, false], [3, true], [4, false]])("accepts structural alternative constraint count %i only at valid bounds", (count, expected) => {
    const result = validateReviewResult({ ...validRevise, alternative_constraints: Array.from({ length: count }, (_, index) => `Constraint ${index + 1}`) });
    expect(result.ok).toBe(expected);
  });

  it("rejects an invalid depth", () => {
    const result = validateReviewResult({
      ...validRevise,
      findings: [{ ...materialFinding, depth: "vibe" }],
    });
    expect(result.ok).toBe(false);
  });

  it("accepts INSUFFICIENT_EVIDENCE without fabricated findings", () => {
    const result = validateReviewResult({
      protocol_version: "0.1",
      schema_version: "0.1",
      verdict: "INSUFFICIENT_EVIDENCE",
      summary: "The app did not render; no screenshot or live route was available.",
      overall_confidence: "low",
      alternatives_required: false,
      findings: [],
    });
    expect(result.ok).toBe(true);
  });

  it("accepts specific evidence requests for INSUFFICIENT_EVIDENCE", () => {
    const result = validateReviewResult({
      protocol_version: "0.1", schema_version: "0.1", verdict: "INSUFFICIENT_EVIDENCE",
      summary: "The primary route was not captured.", overall_confidence: "low",
      alternatives_required: false, findings: [],
      evidence_requests: [{ id: "desktop", request: "Capture /runs at 1440px with the active run visible.", reason: "The primary object is not visible." }],
    });
    expect(result.ok).toBe(true);
  });
});

describe("parseReviewResult", () => {
  it("parses YAML reviewer output", () => {
    const yaml = `
protocol_version: "0.1"
schema_version: "0.1"
verdict: PASS_WITH_NOTES
summary: Shipable with minor type contrast notes.
overall_confidence: medium
alternatives_required: false
findings:
  - id: finding-1
    title: Secondary label contrast is low
    observation: Muted gray labels on the KPI strip fail WCAG-ish contrast in the screenshot.
    product_mismatch: Operators scanning health counts may miss a failing count.
    depth: polish
    severity: non_blocking
    confidence: medium
    evidence:
      - kind: screenshot
        path: evidence/desktop.png
        fact: KPI labels are low-contrast gray on dark navy.
`;
    const parsed = parseReviewResult(yaml);
    expect(parsed.verdict).toBe("PASS_WITH_NOTES");
    expect(parsed.findings).toHaveLength(1);
  });
});

describe("validateComparisonResult", () => {
  it("accepts a comparison that references prior finding IDs", () => {
    const result = validateComparisonResult({
      prior_review_id: "review-1",
      resolved_finding_ids: ["finding-1"],
      unresolved_finding_ids: [],
      regressions: [],
      improvements: ["Active runs now occupy the first viewport."],
      verdict: "PASS_WITH_NOTES",
      next_action: "Ship remaining polish notes or stop.",
    });
    expect(result.ok).toBe(true);
  });

  it("rejects duplicate and overlapping comparison IDs", () => {
    const result = validateComparisonResult({
      prior_review_id: "review-1", resolved_finding_ids: ["finding-1", "finding-1"],
      unresolved_finding_ids: ["finding-1"], regressions: [], improvements: [], verdict: "REVISE",
      next_action: "Address the remaining finding.",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toMatch(/unique|disjoint/i);
  });
});

const validRequest = {
  protocol_version: "0.1", schema_version: "0.1", review_id: "review-20260815-01", mode: "initial",
  target: { route: "/runs", base_url: "http://localhost:5173", changed_files: ["src/App.tsx"] },
  product_intent: { domain: "operations", target_users: ["operator"], primary_job: "Monitor active execution", primary_objects: ["run"] },
  constraints: ["Keep keyboard navigation."],
  captured_evidence: [{ kind: "screenshot", path: ".intent-witness/evidence/review-20260815-01/desktop.png", fact: "The KPI row appears above the active run." }],
};

describe("review request and artifact contracts", () => {
  it("accepts an evidence-bounded initial review request", () => {
    const result = contractValidator("validateReviewRequest")(validRequest);
    expect(result.ok).toBe(true);
  });

  it("requires a prior review reference for comparison mode", () => {
    const result = contractValidator("validateReviewRequest")({ ...validRequest, mode: "comparison" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect((result.errors ?? []).join(" ")).toMatch(/prior/i);
  });

  it("wraps a result and comparison in a review artifact", () => {
    const result = contractValidator("validateReviewArtifact")({
      protocol_version: "0.1", schema_version: "0.1",
      metadata: { review_id: "review-2", created_at: "2026-08-15T00:00:00.000Z", mode: "comparison" },
      result: validRevise,
      comparison: { prior_review_id: "review-1", resolved_finding_ids: [], unresolved_finding_ids: ["finding-1"], regressions: [], improvements: [], verdict: "REVISE", next_action: "Rework hierarchy." },
    });
    expect(result.ok).toBe(true);
  });

  it("parses artifact YAML", () => {
    const parser = (validation as Record<string, unknown>).parseReviewArtifact;
    expect(typeof parser).toBe("function");
    expect((parser as (input: string) => { metadata: { reviewId: string } })(`protocol_version: "0.1"\nschema_version: "0.1"\nmetadata:\n  review_id: r\n  created_at: "2026-08-15T00:00:00.000Z"\n  mode: initial\nresult:\n  protocol_version: "0.1"\n  schema_version: "0.1"\n  verdict: PASS\n  summary: Valid\n  overall_confidence: high\n  alternatives_required: false\n  findings: []\n`).metadata.reviewId).toBe("r");
  });
});
