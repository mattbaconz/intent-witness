import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("publishable package", () => {
  it("exposes the Cursor-only executable and consumer schema exports", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.bin["intent-witness"]).toBe("bin/intent-witness.mjs");
    expect(pkg.exports["./schema"].import).toBe("./dist/schema/index.js");
    expect(existsSync(join(root, pkg.bin["intent-witness"]))).toBe(true);
  });

  it("installs and imports the schema export in plain Node ESM", () => {
    const npmCli = process.env.npm_execpath;
    if (!npmCli) throw new Error("npm_execpath is required to test a packed install");
    const dir = mkdtempSync(join(tmpdir(), "intent-witness-package-"));
    try {
      execFileSync(process.execPath, [npmCli, "pack", "--pack-destination", dir], { cwd: root, encoding: "utf8" });
      const packageFile = join(dir, "mattbaconz-intent-witness-0.1.0-alpha.1.tgz");
      execFileSync(process.execPath, [npmCli, "init", "-y"], { cwd: dir, encoding: "utf8" });
      execFileSync(process.execPath, [npmCli, "install", "--ignore-scripts", packageFile], { cwd: dir, encoding: "utf8" });
      const program = "import { validateComparisonResult, validateReviewResult } from '@mattbaconz/intent-witness/schema'; const runtime = validateComparisonResult({ priorReviewId: 'r', resolvedFindingIds: ['f'], unresolvedFindingIds: ['f'], regressions: [], improvements: [], verdict: 'REVISE', nextAction: 'Fix it.' }); console.log(typeof validateReviewResult, runtime.ok);";
      expect(execFileSync(process.execPath, ["--input-type=module", "--eval", program], { cwd: dir, encoding: "utf8" }).trim()).toBe("function false");
    } finally { rmSync(dir, { recursive: true, force: true }); }
  }, 60_000);

  it("accepts only install/check Cursor command shapes", () => {
    const bin = join(root, "bin", "intent-witness.mjs");
    expect(execFileSync(process.execPath, [bin, "install", "cursor", "--help"], { encoding: "utf8" })).toMatch(/install cursor/i);
    expect(() => execFileSync(process.execPath, [bin, "install", "vscode"], { encoding: "utf8", stdio: "pipe" })).toThrow();
    expect(() => execFileSync(process.execPath, [bin, "check", "cursor", "--unknown"], { encoding: "utf8", stdio: "pipe" })).toThrow();
  });

  it("keeps private, generated, local-state, test, and scratch artifacts out of the tarball", () => {
    const npmCli = process.env.npm_execpath;
    if (!npmCli) throw new Error("npm_execpath is required to inspect npm pack content");
    const packed = JSON.parse(execFileSync(process.execPath, [npmCli, "pack", "--dry-run", "--json"], { cwd: root, encoding: "utf8" }));
    const paths = packed[0].files.map((file: { path: string }) => file.path);
    expect(paths.some((path: string) => /intent-witness-vault|\.cursor|\.intent-witness|\.test\.|evals\/|(?:^|\/)\.env(?:\.|$)|node_modules\/|\.superpowers\/|\.worktrees\/|(?:^|\/)dist\/(?!schema\/)/.test(path))).toBe(false);
  });
});
