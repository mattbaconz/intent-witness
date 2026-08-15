#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const SKILL_SRC = join(ROOT, "skill", "intent-witness");
const AGENT_SRC = join(ROOT, "adapters", "cursor", "intent-witness-reviewer.md");
const INTENT_TEMPLATE = join(ROOT, "templates", "intent.md");
const ADAPTER_VERSION = "0.1";

function walkFiles(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walkFiles(join(dir, entry.name)) : [join(dir, entry.name)]); }
function hash(path) { return createHash("sha256").update(readFileSync(path)).digest("hex"); }
function backupId() { return new Date().toISOString().replace(/[-:.]/g, ""); }
function copyFile(source, destination) { mkdirSync(dirname(destination), { recursive: true }); copyFileSync(source, destination); }
function copyDir(source, destination) { for (const file of walkFiles(source)) copyFile(file, join(destination, relative(source, file))); }
function safeReadJson(path) { try { return JSON.parse(readFileSync(path, "utf8")); } catch { return undefined; } }
function sourceFiles() { return [...walkFiles(SKILL_SRC).map((file) => [join(".cursor", "skills", "intent-witness", relative(SKILL_SRC, file)).replaceAll("\\", "/"), file]), [".cursor/agents/intent-witness-reviewer.md", AGENT_SRC]]; }
function sourceManifest() { return Object.fromEntries(sourceFiles().map(([path, source]) => [path, hash(source)])); }
function targetPath(target, relativePath) { return join(target, ...relativePath.split("/")); }
function backupRelativePath(relativePath) { return relativePath.replace(/^\.cursor\//, ""); }
function copyExisting(target, stamp, relativePath) { const source = targetPath(target, relativePath); if (existsSync(source)) copyFile(source, join(target, ".intent-witness", "backups", stamp, ...backupRelativePath(relativePath).split("/"))); }
function copyExistingDir(target, stamp, relativePath) { const source = targetPath(target, relativePath); if (existsSync(source)) copyDir(source, join(target, ".intent-witness", "backups", stamp, ...backupRelativePath(relativePath).split("/"))); }
function validManifest(manifest) { return Boolean(manifest && manifest.adapterVersion === ADAPTER_VERSION && manifest.managedFiles && typeof manifest.managedFiles === "object"); }

function migrateLegacy(target) {
  const skill = join(target, ".cursor", "skills", "deliberate"); const agent = join(target, ".cursor", "agents", "deliberate-reviewer.md");
  if (!existsSync(skill) && !existsSync(agent)) return;
  const stamp = backupId();
  if (existsSync(skill)) { copyDir(skill, join(target, ".intent-witness", "backups", stamp, "legacy", "skills", "deliberate")); rmSync(skill, { recursive: true, force: true }); }
  if (existsSync(agent)) { copyFile(agent, join(target, ".intent-witness", "backups", stamp, "legacy", "agents", "deliberate-reviewer.md")); rmSync(agent, { force: true }); }
}

export function installCursor(targetDir, { force = false } = {}) {
  const target = resolve(targetDir); const state = join(target, ".intent-witness"); const manifestPath = join(state, "install.json");
  const previous = safeReadJson(manifestPath); const managed = validManifest(previous);
  const skill = join(target, ".cursor", "skills", "intent-witness"); const agent = join(target, ".cursor", "agents", "intent-witness-reviewer.md");
  const conflict = existsSync(skill) || existsSync(agent);
  if (conflict && !managed && !force) throw new Error("Refusing unmanaged intent-witness Cursor paths; rerun with --force to back them up before replacement.");
  migrateLegacy(target);
  let stamp; const backupStamp = () => (stamp ??= backupId());
  if (conflict && !managed) {
    if (existsSync(skill)) copyExistingDir(target, backupStamp(), ".cursor/skills/intent-witness");
    if (existsSync(agent)) copyExisting(target, backupStamp(), ".cursor/agents/intent-witness-reviewer.md");
    rmSync(skill, { recursive: true, force: true }); rmSync(agent, { force: true });
  }
  if (managed) for (const [path, oldHash] of Object.entries(previous.managedFiles)) { const installed = targetPath(target, path); if (existsSync(installed) && hash(installed) !== oldHash) copyExisting(target, backupStamp(), path); }
  for (const [path, source] of sourceFiles()) copyFile(source, targetPath(target, path));
  mkdirSync(join(state, "reviews"), { recursive: true }); mkdirSync(join(state, "evidence"), { recursive: true });
  const intent = join(state, "intent.md");
  if (!existsSync(intent)) copyFile(existsSync(join(target, ".deliberate", "intent.md")) ? join(target, ".deliberate", "intent.md") : INTENT_TEMPLATE, intent);
  writeFileSync(manifestPath, `${JSON.stringify({ packageVersion: PACKAGE.version, adapterVersion: ADAPTER_VERSION, installedAt: new Date().toISOString(), managedFiles: sourceManifest() }, null, 2)}\n`);
  return { skillDest: skill, agentDest: agent, intentDest: intent, manifestPath };
}

export function checkCursorInstall(targetDir) {
  const target = resolve(targetDir); const manifest = safeReadJson(join(target, ".intent-witness", "install.json")); const mismatches = [];
  if (!validManifest(manifest)) {
    mismatches.push(".intent-witness/install.json (missing or invalid manifest)");
    if (existsSync(join(target, ".cursor", "skills", "deliberate"))) mismatches.push(join(".cursor", "skills", "deliberate"));
    if (existsSync(join(target, ".cursor", "agents", "deliberate-reviewer.md"))) mismatches.push(join(".cursor", "agents", "deliberate-reviewer.md"));
    return mismatches;
  }
  if (manifest.packageVersion !== PACKAGE.version) mismatches.push(".intent-witness/install.json (package version)");
  if (manifest.adapterVersion !== ADAPTER_VERSION) mismatches.push(".intent-witness/install.json (adapter version)");
  const expected = sourceManifest();
  for (const [path, expectedHash] of Object.entries(expected)) { const installed = targetPath(target, path); if (manifest.managedFiles[path] !== expectedHash) mismatches.push(`.intent-witness/install.json (${path} hash)`); if (!existsSync(installed) || hash(installed) !== expectedHash) mismatches.push(path); }
  for (const path of Object.keys(manifest.managedFiles)) if (!(path in expected)) mismatches.push(`.intent-witness/install.json (stale ${path})`);
  if (existsSync(join(target, ".cursor", "skills", "deliberate"))) mismatches.push(join(".cursor", "skills", "deliberate"));
  if (existsSync(join(target, ".cursor", "agents", "deliberate-reviewer.md"))) mismatches.push(join(".cursor", "agents", "deliberate-reviewer.md"));
  return [...new Set(mismatches)];
}

function usage() { console.error("Usage: node scripts/install-cursor.mjs [--check] [--force] [project-dir]"); process.exit(2); }
function parseArgs(argv) { const positional = []; let check = false; let force = false; for (const arg of argv.slice(2)) { if (arg === "--check") check = true; else if (arg === "--force") force = true; else if (arg === "--help" || arg === "-h") usage(); else if (arg.startsWith("-")) usage(); else positional.push(arg); } if (positional.length > 1 || (check && force)) usage(); return { check, force, target: positional[0] ?? process.cwd() }; }
const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) { const { check, force, target } = parseArgs(process.argv); if (check) { const mismatches = checkCursorInstall(target); if (mismatches.length) { console.error("Intent Witness Cursor install is out of date:"); mismatches.forEach((path) => console.error(`  ${path}`)); process.exit(1); } console.log(`Intent Witness Cursor install matches source (${resolve(target)})`); } else { const result = installCursor(target, { force }); console.log(`Installed Intent Witness skill → ${result.skillDest}`); console.log(`Installed reviewer agent → ${result.agentDest}`); } }
