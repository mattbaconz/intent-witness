import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
});
