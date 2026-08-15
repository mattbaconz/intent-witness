#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_SRC = join(ROOT, "skill", "intent-witness");
const AGENT_SRC = join(ROOT, "adapters", "cursor", "intent-witness-reviewer.md");
const INTENT_TEMPLATE = join(ROOT, "templates", "intent.md");

function usage() {
  console.error("Usage: node scripts/install-cursor.mjs [--check] [targetDir]");
  process.exit(2);
}

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(path));
    else out.push(path);
  }
  return out;
}

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const from = join(src, entry.name);
    const to = join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else copyFileSync(from, to);
  }
}

function filesMatch(a, b) {
  if (!existsSync(a) || !existsSync(b)) return false;
  return readFileSync(a, "utf8") === readFileSync(b, "utf8");
}

function backupId() {
  return new Date().toISOString().replace(/[-:.]/g, "");
}

function backupLegacyCursorInstall(target) {
  const legacySkill = join(target, ".cursor", "skills", "deliberate");
  const legacyAgent = join(target, ".cursor", "agents", "deliberate-reviewer.md");
  if (!existsSync(legacySkill) && !existsSync(legacyAgent)) return;

  const backupRoot = join(target, ".intent-witness", "backups", backupId(), "legacy");
  if (existsSync(legacySkill)) {
    copyDir(legacySkill, join(backupRoot, "skills", "deliberate"));
    rmSync(legacySkill, { recursive: true, force: true });
  }
  if (existsSync(legacyAgent)) {
    const backupAgent = join(backupRoot, "agents", "deliberate-reviewer.md");
    mkdirSync(dirname(backupAgent), { recursive: true });
    copyFileSync(legacyAgent, backupAgent);
    rmSync(legacyAgent, { force: true });
  }
}

export function installCursor(targetDir) {
  const target = resolve(targetDir);
  const skillDest = join(target, ".cursor", "skills", "intent-witness");
  const agentDest = join(target, ".cursor", "agents", "intent-witness-reviewer.md");
  const intentDest = join(target, ".intent-witness", "intent.md");
  const reviewsDir = join(target, ".intent-witness", "reviews");
  const legacyIntent = join(target, ".deliberate", "intent.md");

  backupLegacyCursorInstall(target);
  if (existsSync(skillDest)) rmSync(skillDest, { recursive: true, force: true });
  copyDir(SKILL_SRC, skillDest);
  mkdirSync(dirname(agentDest), { recursive: true });
  copyFileSync(AGENT_SRC, agentDest);

  mkdirSync(reviewsDir, { recursive: true });
  if (!existsSync(intentDest)) {
    mkdirSync(dirname(intentDest), { recursive: true });
    copyFileSync(existsSync(legacyIntent) ? legacyIntent : INTENT_TEMPLATE, intentDest);
  }

  return { skillDest, agentDest, intentDest };
}

export function checkCursorInstall(targetDir) {
  const target = resolve(targetDir);
  const skillDest = join(target, ".cursor", "skills", "intent-witness");
  const mismatches = [];

  for (const file of walkFiles(SKILL_SRC)) {
    const rel = relative(SKILL_SRC, file);
    const dest = join(skillDest, rel);
    if (!filesMatch(file, dest)) mismatches.push(join(".cursor", "skills", "intent-witness", rel));
  }

  const agentDest = join(target, ".cursor", "agents", "intent-witness-reviewer.md");
  if (!filesMatch(AGENT_SRC, agentDest)) {
    mismatches.push(join(".cursor", "agents", "intent-witness-reviewer.md"));
  }

  if (existsSync(join(target, ".cursor", "skills", "deliberate"))) {
    mismatches.push(join(".cursor", "skills", "deliberate"));
  }
  if (existsSync(join(target, ".cursor", "agents", "deliberate-reviewer.md"))) {
    mismatches.push(join(".cursor", "agents", "deliberate-reviewer.md"));
  }

  return mismatches;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  let check = false;
  const positional = [];
  for (const arg of args) {
    if (arg === "--check") check = true;
    else if (arg === "--help" || arg === "-h") usage();
    else if (arg.startsWith("-")) usage();
    else positional.push(arg);
  }
  return { check, target: positional[0] ?? process.cwd() };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const { check, target } = parseArgs(process.argv);
  if (check) {
    const mismatches = checkCursorInstall(target);
    if (mismatches.length > 0) {
      console.error("Intent Witness Cursor install is out of date:");
      for (const file of mismatches) console.error(`  ${file}`);
      process.exit(1);
    }
    console.log(`Intent Witness Cursor install matches source (${target})`);
  } else {
    const result = installCursor(target);
    console.log(`Installed Intent Witness skill → ${result.skillDest}`);
    console.log(`Installed reviewer agent → ${result.agentDest}`);
    console.log(`Product intent → ${result.intentDest}`);
  }
}
