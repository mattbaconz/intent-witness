import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
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

  it("writes a manifest and creates reviews and evidence directories", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      const manifest = JSON.parse(readFileSync(join(dir, ".intent-witness", "install.json"), "utf8"));
      expect(manifest.packageVersion).toBe("0.1.0-alpha.1");
      expect(manifest.packageName).toBe("@mattbaconz/intent-witness");
      expect(manifest.adapter).toBe("cursor");
      expect(manifest.adapterVersion).toBe("0.1");
      expect(manifest.managedFiles[".cursor/agents/intent-witness-reviewer.md"]).toMatch(/^[a-f0-9]{64}$/);
      expect(existsSync(join(dir, ".intent-witness", "reviews"))).toBe(true);
      expect(existsSync(join(dir, ".intent-witness", "evidence"))).toBe(true);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("refuses an unmanaged conflicting skill without force", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      const conflict = join(dir, ".cursor", "skills", "intent-witness");
      mkdirSync(conflict, { recursive: true });
      writeFileSync(join(conflict, "SKILL.md"), "# user skill\n");
      expect(() => installCursor(dir)).toThrow(/unmanaged.*intent-witness/i);
      expect(readFileSync(join(conflict, "SKILL.md"), "utf8")).toBe("# user skill\n");
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("backs up unmanaged conflicts before a forced replacement", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      const conflict = join(dir, ".cursor", "agents", "intent-witness-reviewer.md");
      mkdirSync(join(dir, ".cursor", "agents"), { recursive: true });
      writeFileSync(conflict, "# user agent\n");
      installCursor(dir, { force: true });
      const backupRoot = join(dir, ".intent-witness", "backups");
      const backup = readdirSync(backupRoot)[0]!;
      expect(readFileSync(join(backupRoot, backup, "agents", "intent-witness-reviewer.md"), "utf8")).toBe("# user agent\n");
      expect(checkCursorInstall(dir)).toEqual([]);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("backs up locally modified managed files during an upgrade", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      const skillFile = join(dir, ".cursor", "skills", "intent-witness", "SKILL.md");
      writeFileSync(skillFile, "# locally modified\n");
      installCursor(dir);
      const backup = readdirSync(join(dir, ".intent-witness", "backups"))[0]!;
      expect(readFileSync(join(dir, ".intent-witness", "backups", backup, "skills", "intent-witness", "SKILL.md"), "utf8")).toBe("# locally modified\n");
      expect(checkCursorInstall(dir)).toEqual([]);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it.each([
    ["partial", { packageVersion: "0.1.0-alpha.1", adapterVersion: "0.1" }],
    ["forged", { packageVersion: "0.1.0-alpha.1", adapterVersion: "0.1", installedAt: "not-a-date", managedFiles: {} }],
    ["wrong package", { packageVersion: "0.0.0", adapterVersion: "0.1", installedAt: "2026-08-15T00:00:00.000Z", managedFiles: {} }],
  ])("treats a %s manifest as an unmanaged conflict", (_name, manifest) => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      const conflict = join(dir, ".cursor", "agents", "intent-witness-reviewer.md");
      mkdirSync(dirname(conflict), { recursive: true });
      mkdirSync(join(dir, ".intent-witness"), { recursive: true });
      writeFileSync(conflict, "# user agent\n");
      writeFileSync(join(dir, ".intent-witness", "install.json"), JSON.stringify(manifest));
      expect(() => installCursor(dir)).toThrow(/unmanaged/i);
      expect(checkCursorInstall(dir).join(" ")).toMatch(/install\.json.*(missing|invalid|package|installedAt|managedFiles)/i);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("upgrades a safe prior-version manifest with a different managed-file set", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      const staleRelative = ".cursor/skills/intent-witness/obsolete.md";
      const staleFile = join(dir, ".cursor", "skills", "intent-witness", "obsolete.md");
      writeFileSync(staleFile, "old managed content\n");
      const manifestPath = join(dir, ".intent-witness", "install.json");
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      manifest.packageVersion = "0.0.9";
      manifest.managedFiles[staleRelative] = createHash("sha256").update("old managed content\n").digest("hex");
      writeFileSync(manifestPath, JSON.stringify(manifest));

      installCursor(dir);

      expect(existsSync(staleFile)).toBe(false);
      expect(checkCursorInstall(dir)).toEqual([]);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("refuses a manifest that claims an unsafe managed path", () => {
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-install-"));
    try {
      installCursor(dir);
      const manifestPath = join(dir, ".intent-witness", "install.json");
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      manifest.managedFiles[".cursor/agents/../../settings.json"] = "a".repeat(64);
      writeFileSync(manifestPath, JSON.stringify(manifest));
      expect(() => installCursor(dir)).toThrow(/unmanaged/i);
      expect(checkCursorInstall(dir).join(" ")).toMatch(/unsafe|managedFiles/i);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
});
