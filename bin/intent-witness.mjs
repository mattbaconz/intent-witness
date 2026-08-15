#!/usr/bin/env node
import { checkCursorInstall, installCursor } from "../scripts/install-cursor.mjs";

function usage(exitCode = 0) {
  const output = "Usage:\n  intent-witness install cursor [project-dir] [--force]\n  intent-witness check cursor [project-dir]";
  (exitCode === 0 ? console.log : console.error)(output);
  process.exit(exitCode);
}

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) usage();
const [command, adapter, ...rest] = args;
if (!command || !adapter || adapter !== "cursor" || !["install", "check"].includes(command)) usage(2);
const force = rest.includes("--force");
const paths = rest.filter((item) => item !== "--force");
if (paths.length > 1 || (command === "check" && force)) usage(2);
const target = paths[0] ?? process.cwd();
if (command === "install") {
  const result = installCursor(target, { force });
  console.log(`Installed Intent Witness skill → ${result.skillDest}`);
  console.log(`Installed reviewer agent → ${result.agentDest}`);
} else {
  const mismatches = checkCursorInstall(target);
  if (mismatches.length) {
    console.error("Intent Witness Cursor install is out of date:");
    mismatches.forEach((path) => console.error(`  ${path}`));
    process.exit(1);
  }
  console.log("Intent Witness Cursor install matches source");
}
