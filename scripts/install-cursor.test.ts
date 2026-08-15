import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkCursorInstall, installCursor } from "./install-cursor.mjs";

describe("install-cursor", () => {
  it("copies skill and readonly reviewer, then --check passes", () => {
    const dir = mkdtempSync(join(tmpdir(), "deliberate-install-"));
    try {
      installCursor(dir);
      expect(checkCursorInstall(dir)).toEqual([]);
      const agent = readFileSync(
        join(dir, ".cursor", "agents", "deliberate-reviewer.md"),
        "utf8",
      );
      expect(agent).toMatch(/readonly:\s*true/);
      expect(readFileSync(join(dir, ".deliberate", "intent.md"), "utf8")).toContain(
        "Product Intent",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("does not overwrite an existing intent.md", () => {
    const dir = mkdtempSync(join(tmpdir(), "deliberate-install-"));
    try {
      mkdirSync(join(dir, ".deliberate"), { recursive: true });
      writeFileSync(join(dir, ".deliberate", "intent.md"), "# keep me\n");
      installCursor(dir);
      expect(readFileSync(join(dir, ".deliberate", "intent.md"), "utf8")).toBe("# keep me\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("fails --check when the installed skill drifted", () => {
    const dir = mkdtempSync(join(tmpdir(), "deliberate-install-"));
    try {
      installCursor(dir);
      writeFileSync(join(dir, ".cursor", "skills", "deliberate", "SKILL.md"), "drift\n");
      expect(checkCursorInstall(dir).length).toBeGreaterThan(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
