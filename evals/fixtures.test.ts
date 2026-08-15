import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseReviewResult } from "../schema/validate.ts";

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), "fixtures");

type FixtureFile = {
  id: string;
  scenario: string;
  expected: {
    verdict: string;
    deepest_problem?: string | null;
  };
  review: unknown;
};

function loadFixtures(): FixtureFile[] {
  return readdirSync(fixturesDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const raw = readFileSync(join(fixturesDir, name), "utf8");
      return JSON.parse(raw) as FixtureFile;
    });
}

describe("protocol fixtures", () => {
  const fixtures = loadFixtures();

  it("loads the five required fixtures", () => {
    const ids = fixtures.map((f) => f.id).sort();
    expect(ids).toEqual([
      "card-removal-trap",
      "generic-metric-first",
      "insufficient-evidence",
      "justified-kpi",
      "redundant-routes",
    ]);
  });

  it.each(loadFixtures().map((f) => [f.id, f] as const))(
    "%s validates and matches expected verdict",
    (_id, fixture) => {
      const parsed = parseReviewResult(fixture.review);
      expect(parsed.verdict).toBe(fixture.expected.verdict);
      if (fixture.expected.deepest_problem === null) {
        expect(parsed.deepestProblem ?? null).toBeNull();
      } else if (fixture.expected.deepest_problem) {
        expect(parsed.deepestProblem).toBe(fixture.expected.deepest_problem);
      }
    },
  );
});
