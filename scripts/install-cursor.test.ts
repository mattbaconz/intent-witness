import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkCursorInstall, installCursor } from "./install-cursor.mjs";

describe("install-cursor", () => {
  it("copies skill and readonly reviewer, then --check passes", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      expect(checkCursorInstall(dir)).toEqual([]);
      const agent = readFileSync(
        join(dir, ".cursor", "agents", "intent-witness-reviewer.md"),
        "utf8",
      );
      expect(agent).toMatch(/readonly:\s*true/);
      expect(readFileSync(join(dir, ".intent-witness", "intent.md"), "utf8")).toContain(
        "Product Intent",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("does not overwrite an existing intent.md", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      mkdirSync(join(dir, ".intent-witness"), { recursive: true });
      writeFileSync(join(dir, ".intent-witness", "intent.md"), "# keep me\n");
      installCursor(dir);
      expect(readFileSync(join(dir, ".intent-witness", "intent.md"), "utf8")).toBe("# keep me\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails --check when the installed skill drifted", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      writeFileSync(join(dir, ".cursor", "skills", "intent-witness", "SKILL.md"), "drift\n");
      expect(checkCursorInstall(dir).length).toBeGreaterThan(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("backs up and removes generated legacy Cursor paths", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      const legacySkill = join(dir, ".cursor", "skills", "deliberate");
      const legacyAgent = join(dir, ".cursor", "agents", "deliberate-reviewer.md");
      mkdirSync(legacySkill, { recursive: true });
      mkdirSync(join(dir, ".cursor", "agents"), { recursive: true });
      writeFileSync(join(legacySkill, "SKILL.md"), "# legacy skill\n");
      writeFileSync(legacyAgent, "# legacy agent\n");

      installCursor(dir);

      expect(existsSync(legacySkill)).toBe(false);
      expect(existsSync(legacyAgent)).toBe(false);
      const backups = readdirSync(join(dir, ".intent-witness", "backups"));
      expect(backups).toHaveLength(1);
      expect(backups[0]).toMatch(/^\d{8}T\d{9}Z$/);
      const legacyBackup = join(dir, ".intent-witness", "backups", backups[0], "legacy");
      expect(readFileSync(join(legacyBackup, "skills", "deliberate", "SKILL.md"), "utf8")).toBe(
        "# legacy skill\n",
      );
      expect(readFileSync(join(legacyBackup, "agents", "deliberate-reviewer.md"), "utf8")).toBe(
        "# legacy agent\n",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("copies legacy intent without altering legacy state", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      const legacyState = join(dir, ".deliberate");
      const legacyIntent = join(legacyState, "intent.md");
      const legacyReview = join(legacyState, "reviews", "prior.yaml");
      mkdirSync(join(legacyState, "reviews"), { recursive: true });
      writeFileSync(legacyIntent, "# legacy intent\n");
      writeFileSync(legacyReview, "verdict: PASS\n");

      installCursor(dir);

      expect(readFileSync(join(dir, ".intent-witness", "intent.md"), "utf8")).toBe("# legacy intent\n");
      expect(readFileSync(legacyIntent, "utf8")).toBe("# legacy intent\n");
      expect(readFileSync(legacyReview, "utf8")).toBe("verdict: PASS\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("reports remaining legacy Cursor paths during --check", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      mkdirSync(join(dir, ".cursor", "skills", "deliberate"), { recursive: true });
      mkdirSync(join(dir, ".cursor", "agents"), { recursive: true });
      writeFileSync(join(dir, ".cursor", "agents", "deliberate-reviewer.md"), "legacy\n");

      expect(checkCursorInstall(dir)).toEqual(
        expect.arrayContaining([
          join(".cursor", "skills", "deliberate"),
          join(".cursor", "agents", "deliberate-reviewer.md"),
        ]),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
