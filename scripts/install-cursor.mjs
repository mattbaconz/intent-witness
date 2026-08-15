#!/usr/bin/env node
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const SKILL_SRC = join(ROOT, "skill", "intent-witness");
const AGENT_SRC = join(ROOT, "adapters", "cursor", "intent-witness-reviewer.md");
const INTENT_TEMPLATE = join(ROOT, "templates", "intent.md");
const ADAPTER_VERSION = "0.1";
const ADAPTER = "cursor";
const SKILL_MANAGED_ROOT = ".cursor/skills/intent-witness/";
const SKILL_MANAGED_PATH = ".cursor/skills/intent-witness";
const AGENT_MANAGED_PATH = ".cursor/agents/intent-witness-reviewer.md";
const STATE_PATH = ".intent-witness";
const MANIFEST_PATH = `${STATE_PATH}/install.json`;
const IGNORE_PATH = `${STATE_PATH}/.gitignore`;
const LOCAL_IGNORE_DEFAULTS = `evidence/
reviews/
backups/
scratch/
install.json
`;

function walkFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walkFiles(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}
function hash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}
function backupId() {
  return new Date().toISOString().replace(/[-:.]/g, "");
}
function safeReadJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return undefined;
  }
}
function sourceFiles() {
  return [
    ...walkFiles(SKILL_SRC).map((file) => [
      join(".cursor", "skills", "intent-witness", relative(SKILL_SRC, file)).replaceAll("\\", "/"),
      file,
    ]),
    [AGENT_MANAGED_PATH, AGENT_SRC],
  ];
}
function sourceManifest() {
  return Object.fromEntries(sourceFiles().map(([path, source]) => [path, hash(source)]));
}

function isWithin(root, candidate) {
  const pathFromRoot = relative(root, candidate);
  return pathFromRoot === "" || (pathFromRoot !== ".." && !pathFromRoot.startsWith(`..${sep}`) && !isAbsolute(pathFromRoot));
}

function resolveTargetRoot(targetDir) {
  const requested = resolve(targetDir);
  if (!existsSync(requested)) throw new Error(`Target project directory does not exist: ${requested}`);
  const target = realpathSync.native(requested);
  if (!lstatSync(target).isDirectory()) throw new Error(`Target project path is not a directory: ${target}`);
  return target;
}

function assertSafeProjectPath(target, candidate, label) {
  const absolute = resolve(candidate);
  if (!isWithin(target, absolute)) throw new Error(`Unsafe project path escapes target root: ${label}`);
  const pathFromRoot = relative(target, absolute);
  let current = target;
  for (const segment of pathFromRoot.split(sep).filter(Boolean)) {
    current = join(current, segment);
    let stats;
    try {
      stats = lstatSync(current);
    } catch (error) {
      if (error?.code === "ENOENT") break;
      throw error;
    }
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing symbolic link or reparse-point boundary at ${relative(target, current)}`);
    }
    const real = realpathSync.native(current);
    if (!isWithin(target, real)) throw new Error(`Unsafe project path escapes target root through ${relative(target, current)}`);
  }
  return absolute;
}

function targetPath(target, relativePath) {
  const normalized = relativePath.replaceAll("\\", "/");
  const segments = normalized.split("/");
  if (isAbsolute(relativePath) || normalized.startsWith("/") || segments.includes("..")) {
    throw new Error(`Unsafe project-relative path: ${relativePath}`);
  }
  return assertSafeProjectPath(target, join(target, ...segments), relativePath);
}

function projectExists(target, relativePath) {
  return existsSync(targetPath(target, relativePath));
}
function mkdirProject(target, relativePath) {
  mkdirSync(targetPath(target, relativePath), { recursive: true });
}
function writeProjectFile(target, relativePath, contents) {
  const destination = targetPath(target, relativePath);
  mkdirSync(targetPath(target, dirname(relativePath).replaceAll("\\", "/")), { recursive: true });
  writeFileSync(destination, contents);
}
function copySourceFile(target, source, relativePath) {
  const destination = targetPath(target, relativePath);
  mkdirSync(targetPath(target, dirname(relativePath).replaceAll("\\", "/")), { recursive: true });
  copyFileSync(source, destination);
}
function copyProjectFile(target, sourceRelativePath, destinationRelativePath) {
  const source = targetPath(target, sourceRelativePath);
  const destination = targetPath(target, destinationRelativePath);
  mkdirSync(targetPath(target, dirname(destinationRelativePath).replaceAll("\\", "/")), { recursive: true });
  copyFileSync(source, destination);
}
function removeProjectPath(target, relativePath, { recursive = false } = {}) {
  rmSync(targetPath(target, relativePath), { recursive, force: true });
}
function walkProjectFiles(target, relativeDirectory) {
  const directory = targetPath(target, relativeDirectory);
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const child = `${relativeDirectory}/${entry.name}`;
    targetPath(target, child);
    return entry.isDirectory() ? walkProjectFiles(target, child) : [child];
  });
}
function copyProjectDir(target, sourceRelativePath, destinationRelativePath) {
  for (const file of walkProjectFiles(target, sourceRelativePath)) {
    const suffix = relative(sourceRelativePath, file).replaceAll("\\", "/");
    copyProjectFile(target, file, `${destinationRelativePath}/${suffix}`);
  }
}
function backupRelativePath(relativePath) {
  return relativePath.replace(/^\.cursor\//, "");
}
function backupExistingPath(target, stamp, relativePath) {
  const source = targetPath(target, relativePath);
  const destination = `${STATE_PATH}/backups/${stamp}/${backupRelativePath(relativePath)}`;
  if (lstatSync(source).isDirectory()) copyProjectDir(target, relativePath, destination);
  else copyProjectFile(target, relativePath, destination);
}

function manifestErrors(manifest) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) return ["missing or invalid JSON"];
  const errors = [];
  if (manifest.packageName !== PACKAGE.name) errors.push(`packageName must be ${PACKAGE.name}`);
  if (typeof manifest.packageVersion !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(manifest.packageVersion)) errors.push("packageVersion must be a valid semver version");
  if (manifest.adapter !== ADAPTER) errors.push("adapter must be cursor");
  if (manifest.adapterVersion !== ADAPTER_VERSION) errors.push("adapterVersion must be 0.1");
  if (typeof manifest.installedAt !== "string" || Number.isNaN(Date.parse(manifest.installedAt)) || new Date(manifest.installedAt).toISOString() !== manifest.installedAt) errors.push("installedAt must be an ISO timestamp");
  if (!manifest.managedFiles || typeof manifest.managedFiles !== "object" || Array.isArray(manifest.managedFiles)) errors.push("managedFiles must be an object");
  else {
    const actualKeys = Object.keys(manifest.managedFiles);
    if (![`${SKILL_MANAGED_ROOT}SKILL.md`, AGENT_MANAGED_PATH].every((key) => actualKeys.includes(key))) errors.push("managedFiles must include the core skill and reviewer paths");
    for (const key of actualKeys) {
      const value = manifest.managedFiles[key];
      if (!(key === AGENT_MANAGED_PATH || (key.startsWith(SKILL_MANAGED_ROOT) && !key.includes("\\") && !key.split("/").includes("..")))) errors.push(`managedFiles.${key} is outside safe managed roots`);
      if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) errors.push(`managedFiles.${key} must be a SHA-256 hash`);
    }
  }
  return errors;
}
function validManifest(manifest) {
  return manifestErrors(manifest).length === 0;
}

function migrateLegacy(target) {
  const skill = ".cursor/skills/deliberate";
  const agent = ".cursor/agents/deliberate-reviewer.md";
  if (!projectExists(target, skill) && !projectExists(target, agent)) return;
  const stamp = backupId();
  if (projectExists(target, skill)) {
    copyProjectDir(target, skill, `${STATE_PATH}/backups/${stamp}/legacy/skills/deliberate`);
    removeProjectPath(target, skill, { recursive: true });
  }
  if (projectExists(target, agent)) {
    copyProjectFile(target, agent, `${STATE_PATH}/backups/${stamp}/legacy/agents/deliberate-reviewer.md`);
    removeProjectPath(target, agent);
  }
}

export function installCursor(targetDir, { force = false } = {}) {
  const target = resolveTargetRoot(targetDir);
  for (const path of [
    STATE_PATH,
    MANIFEST_PATH,
    IGNORE_PATH,
    `${STATE_PATH}/intent.md`,
    `${STATE_PATH}/reviews`,
    `${STATE_PATH}/evidence`,
    `${STATE_PATH}/backups`,
    SKILL_MANAGED_PATH,
    AGENT_MANAGED_PATH,
    ".cursor/skills/deliberate",
    ".cursor/agents/deliberate-reviewer.md",
    ".deliberate/intent.md",
  ]) targetPath(target, path);

  const previous = safeReadJson(targetPath(target, MANIFEST_PATH));
  const managed = validManifest(previous);
  if (managed) for (const path of Object.keys(previous.managedFiles)) targetPath(target, path);

  const skillConflict = projectExists(target, SKILL_MANAGED_PATH);
  const agentConflict = projectExists(target, AGENT_MANAGED_PATH);
  const conflict = skillConflict || agentConflict;
  if (conflict && !managed && !force) {
    throw new Error("Refusing unmanaged intent-witness Cursor paths; rerun with --force to back them up before replacement.");
  }

  const expected = sourceManifest();
  const newlyManagedConflicts = managed
    ? Object.keys(expected).filter((path) => !(path in previous.managedFiles) && projectExists(target, path))
    : [];
  if (newlyManagedConflicts.length > 0 && !force) {
    throw new Error(`Refusing current managed destination absent from the previous manifest (not owned): ${newlyManagedConflicts.join(", ")}. Rerun with --force to back it up before replacement.`);
  }

  if (skillConflict && !managed && force) walkProjectFiles(target, SKILL_MANAGED_PATH);
  if (projectExists(target, ".cursor/skills/deliberate")) walkProjectFiles(target, ".cursor/skills/deliberate");

  migrateLegacy(target);
  let stamp;
  const backupStamp = () => (stamp ??= backupId());
  if (conflict && !managed) {
    if (skillConflict) backupExistingPath(target, backupStamp(), SKILL_MANAGED_PATH);
    if (agentConflict) backupExistingPath(target, backupStamp(), AGENT_MANAGED_PATH);
    if (skillConflict) removeProjectPath(target, SKILL_MANAGED_PATH, { recursive: true });
    if (agentConflict) removeProjectPath(target, AGENT_MANAGED_PATH);
  }

  for (const path of newlyManagedConflicts) {
    const recursive = lstatSync(targetPath(target, path)).isDirectory();
    backupExistingPath(target, backupStamp(), path);
    removeProjectPath(target, path, { recursive });
  }

  if (managed) for (const [path, oldHash] of Object.entries(previous.managedFiles)) {
    if (!projectExists(target, path)) continue;
    const installed = targetPath(target, path);
    if (lstatSync(installed).isDirectory()) throw new Error(`Managed destination is not a file: ${path}`);
    if (hash(installed) !== oldHash) backupExistingPath(target, backupStamp(), path);
    if (!(path in expected)) removeProjectPath(target, path);
  }

  for (const [path, source] of sourceFiles()) copySourceFile(target, source, path);
  mkdirProject(target, `${STATE_PATH}/reviews`);
  mkdirProject(target, `${STATE_PATH}/evidence`);
  const intent = `${STATE_PATH}/intent.md`;
  if (!projectExists(target, intent)) {
    const legacyIntent = ".deliberate/intent.md";
    if (projectExists(target, legacyIntent)) copyProjectFile(target, legacyIntent, intent);
    else copySourceFile(target, INTENT_TEMPLATE, intent);
  }
  if (!projectExists(target, IGNORE_PATH)) writeProjectFile(target, IGNORE_PATH, LOCAL_IGNORE_DEFAULTS);
  writeProjectFile(target, MANIFEST_PATH, `${JSON.stringify({
    packageName: PACKAGE.name,
    packageVersion: PACKAGE.version,
    adapter: ADAPTER,
    adapterVersion: ADAPTER_VERSION,
    installedAt: new Date().toISOString(),
    managedFiles: expected,
  }, null, 2)}\n`);
  return {
    skillDest: targetPath(target, SKILL_MANAGED_PATH),
    agentDest: targetPath(target, AGENT_MANAGED_PATH),
    intentDest: targetPath(target, intent),
    manifestPath: targetPath(target, MANIFEST_PATH),
  };
}

function checkCursorInstallSafe(targetDir) {
  const target = resolveTargetRoot(targetDir);
  const manifest = safeReadJson(targetPath(target, MANIFEST_PATH));
  const mismatches = [];
  const manifestProblems = manifestErrors(manifest);
  if (manifestProblems.length) {
    mismatches.push(...manifestProblems.map((problem) => `${MANIFEST_PATH} (${problem})`));
    if (projectExists(target, ".cursor/skills/deliberate")) mismatches.push(join(".cursor", "skills", "deliberate"));
    if (projectExists(target, ".cursor/agents/deliberate-reviewer.md")) mismatches.push(join(".cursor", "agents", "deliberate-reviewer.md"));
    return mismatches;
  }
  if (manifest.packageVersion !== PACKAGE.version) mismatches.push(`${MANIFEST_PATH} (package version)`);
  const expected = sourceManifest();
  for (const [path, expectedHash] of Object.entries(expected)) {
    const installed = targetPath(target, path);
    if (manifest.managedFiles[path] !== expectedHash) mismatches.push(`${MANIFEST_PATH} (${path} hash)`);
    if (!existsSync(installed) || lstatSync(installed).isDirectory() || hash(installed) !== expectedHash) mismatches.push(path);
  }
  for (const path of Object.keys(manifest.managedFiles)) {
    targetPath(target, path);
    if (!(path in expected)) mismatches.push(`${MANIFEST_PATH} (stale ${path})`);
  }
  if (projectExists(target, ".cursor/skills/deliberate")) mismatches.push(join(".cursor", "skills", "deliberate"));
  if (projectExists(target, ".cursor/agents/deliberate-reviewer.md")) mismatches.push(join(".cursor", "agents", "deliberate-reviewer.md"));
  return [...new Set(mismatches)];
}

export function checkCursorInstall(targetDir) {
  try {
    return checkCursorInstallSafe(targetDir);
  } catch (error) {
    return [`unsafe install boundary (${error instanceof Error ? error.message : String(error)})`];
  }
}

function usage() {
  console.error("Usage: node scripts/install-cursor.mjs [--check] [--force] [project-dir]");
  process.exit(2);
}
function parseArgs(argv) {
  const positional = [];
  let check = false;
  let force = false;
  for (const arg of argv.slice(2)) {
    if (arg === "--check") check = true;
    else if (arg === "--force") force = true;
    else if (arg === "--help" || arg === "-h") usage();
    else if (arg.startsWith("-")) usage();
    else positional.push(arg);
  }
  if (positional.length > 1 || (check && force)) usage();
  return { check, force, target: positional[0] ?? process.cwd() };
}
const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const { check, force, target } = parseArgs(process.argv);
  if (check) {
    const mismatches = checkCursorInstall(target);
    if (mismatches.length) {
      console.error("Intent Witness Cursor install is out of date:");
      mismatches.forEach((path) => console.error(`  ${path}`));
      process.exit(1);
    }
    console.log(`Intent Witness Cursor install matches source (${resolve(target)})`);
  } else {
    const result = installCursor(target, { force });
    console.log(`Installed Intent Witness skill → ${result.skillDest}`);
    console.log(`Installed reviewer agent → ${result.agentDest}`);
  }
}
