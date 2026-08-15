import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = [join(root, "README.md"), join(root, "CONTRIBUTING.md"), join(root, "SECURITY.md"), ...readdirSync(join(root, "docs")).filter((name) => name.endsWith(".md")).map((name) => join(root, "docs", name))];
const missing = [];
for (const file of docs) for (const match of readFileSync(file, "utf8").matchAll(/\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)/g)) {
  const target = match[1];
  if (!/^(https?:|mailto:)/.test(target) && !existsSync(resolve(dirname(file), target))) missing.push(`${file}: ${target}`);
}
if (missing.length) { console.error(`Broken local documentation links:\n${missing.join("\n")}`); process.exit(1); }
console.log(`Checked ${docs.length} documentation files.`);
