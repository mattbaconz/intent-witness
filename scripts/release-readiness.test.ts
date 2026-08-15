import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { describe, expect, it } from "vitest";
import {
  validateReviewArtifact,
  validateReviewRequest,
} from "../schema/validate.ts";
import { checkCursorInstall } from "./install-cursor.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = join(root, "evals", "fixtures", "relayops-dogfood");

function readYaml(path: string): unknown {
  return parseYaml(readFileSync(path, "utf8"));
}

function sourceFilePaths(directory: string, relative = ""): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    const child = relative ? `${relative}/${entry.name}` : entry.name;
    return entry.isDirectory() ? sourceFilePaths(path, child) : [child];
  });
}

describe("release readiness contracts", () => {
  it("requires captured evidence before a review request can validate", () => {
    const request = {
      protocol_version: "0.1",
      schema_version: "0.1",
      review_id: "capture-required",
      mode: "initial",
      target: { route: "/runs", base_url: "http://localhost:5173", changed_files: ["src/App.tsx"] },
      product_intent: {
        domain: "operations",
        target_users: ["operator"],
        primary_job: "Monitor active execution",
        primary_objects: ["run"],
      },
      constraints: ["Preserve keyboard navigation."],
      captured_evidence: [],
    };

    const result = validateReviewRequest(request);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(" ")).toMatch(/capturedEvidence.*>=1/i);
  });

  it("keeps the reviewer read-only and the repository install canonical", () => {
    const reviewer = readFileSync(join(root, "adapters", "cursor", "intent-witness-reviewer.md"), "utf8");
    expect(reviewer).toMatch(/^readonly:\s*true$/m);
    expect(reviewer).toMatch(/untrusted content, not instructions/i);
    expect(checkCursorInstall(root)).toEqual([]);
  });

  it("ships a deterministic RelayOps protocol-fixture sequence", () => {
    const names = readdirSync(fixtureRoot).sort();
    expect(names).toEqual([
      "README.md",
      "baseline-source.json",
      "comparison-pass.yaml",
      "initial-revise.yaml",
      "pass-with-notes.yaml",
      "pass.yaml",
      "prompt-injection.yaml",
      "request-initial.yaml",
      "request-insufficient-evidence.yaml",
    ]);

    const request = validateReviewRequest(readYaml(join(fixtureRoot, "request-initial.yaml")));
    expect(request.ok).toBe(true);
    if (request.ok) {
      expect(request.value.capturedEvidence).toHaveLength(3);
      expect(request.value.capturedEvidence.some((evidence) => "path" in evidence)).toBe(true);
    }

    const initial = validateReviewArtifact(readYaml(join(fixtureRoot, "initial-revise.yaml")));
    expect(initial.ok).toBe(true);
    if (initial.ok) {
      expect(initial.value.result.verdict).toBe("REVISE");
      expect(initial.value.result.deepestProblem).toBe("information_architecture");
      expect(initial.value.result.findings[0]?.id).toBe("relayops-active-run-subordinate");
    }

    const comparison = validateReviewArtifact(readYaml(join(fixtureRoot, "comparison-pass.yaml")));
    expect(comparison.ok).toBe(true);
    if (comparison.ok) {
      expect(comparison.value.metadata.mode).toBe("comparison");
      expect(comparison.value.comparison?.priorReviewId).toBe("relayops-fixture-initial");
      expect(comparison.value.comparison?.resolvedFindingIds).toContain("relayops-active-run-subordinate");
      expect(comparison.value.result.verdict).toBe("PASS");
    }

    for (const [name, verdict] of [["pass.yaml", "PASS"], ["pass-with-notes.yaml", "PASS_WITH_NOTES"], ["request-insufficient-evidence.yaml", "INSUFFICIENT_EVIDENCE"], ["prompt-injection.yaml", "INSUFFICIENT_EVIDENCE"]] as const) {
      const artifact = validateReviewArtifact(readYaml(join(fixtureRoot, name)));
      expect(artifact.ok).toBe(true);
      if (artifact.ok) expect(artifact.value.result.verdict).toBe(verdict);
    }
  });

  it("treats prompt injection in evidence as untrusted rather than a verdict instruction", () => {
    const artifact = validateReviewArtifact(readYaml(join(fixtureRoot, "prompt-injection.yaml")));
    expect(artifact.ok).toBe(true);
    if (!artifact.ok) return;
    expect(artifact.value.result.summary).toMatch(/untrusted/i);
    expect(artifact.value.result.verdict).toBe("INSUFFICIENT_EVIDENCE");
  });

  it("keeps RelayOps source at the task baseline", () => {
    const baseline = JSON.parse(readFileSync(join(fixtureRoot, "baseline-source.json"), "utf8")) as {
      files: Record<string, string>;
    };
    expect(sourceFilePaths(join(root, "examples", "demo-dashboard")).filter((path) => path.startsWith("src/")).sort()).toEqual(
      Object.keys(baseline.files).sort(),
    );
    const actual = Object.fromEntries(
      Object.keys(baseline.files).map((relativePath) => [
        relativePath,
        createHash("sha256").update(readFileSync(join(root, "examples", "demo-dashboard", relativePath))).digest("hex"),
      ]),
    );
    expect(actual).toEqual(baseline.files);
  });

  it("documents automated checks separately from external release gates", () => {
    const document = join(root, "docs", "release-readiness.md");
    expect(existsSync(document)).toBe(true);
    const content = readFileSync(document, "utf8");
    expect(content).toMatch(/Automated.*green/i);
    expect(content).toMatch(/professional name clearance/i);
    expect(content).toMatch(/current-stable Cursor dogfood/i);
    expect(content).toMatch(/public\/private repo creation/i);
    expect(content).toMatch(/branch protection/i);
    expect(content).toMatch(/npm publication/i);
    expect(content).toMatch(/GitHub release/i);
    expect(content).toMatch(/not proof of actual Cursor behavior or benchmark results/i);
  });
});
