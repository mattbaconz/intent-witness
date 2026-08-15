import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("publishable package", () => {
  it("exposes the Cursor-only executable and consumer schema exports", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    expect(pkg.bin["intent-witness"]).toBe("bin/intent-witness.mjs");
    expect(pkg.exports["./schema"]).toBe("./schema/index.ts");
    expect(existsSync(join(root, pkg.bin["intent-witness"]))).toBe(true);
  });

  it("accepts only install/check Cursor command shapes", () => {
    const bin = join(root, "bin", "intent-witness.mjs");
    expect(execFileSync(process.execPath, [bin, "install", "cursor", "--help"], { encoding: "utf8" })).toMatch(/install cursor/i);
    expect(() => execFileSync(process.execPath, [bin, "install", "vscode"], { encoding: "utf8", stdio: "pipe" })).toThrow();
  });

  it("keeps vault, installed state, tests, and scratch artifacts out of the tarball", () => {
    const npmCli = process.env.npm_execpath;
    if (!npmCli) throw new Error("npm_execpath is required to inspect npm pack content");
    const packed = JSON.parse(execFileSync(process.execPath, [npmCli, "pack", "--dry-run", "--json"], { cwd: root, encoding: "utf8" }));
    const paths = packed[0].files.map((file: { path: string }) => file.path);
    expect(paths.some((path: string) => /intent-witness-vault|\.cursor|\.intent-witness|\.test\.|evals\//.test(path))).toBe(false);
  });
});
