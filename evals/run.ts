import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evalCaseSchema } from "./schema.ts";

const root = resolve(import.meta.dirname);
const cases = readdirSync(resolve(root, "cases")).filter((name) => name.endsWith(".json")).sort().map((name) => evalCaseSchema.parse(JSON.parse(readFileSync(resolve(root, "cases", name), "utf8"))));
if (cases.length !== 10) throw new Error(`Expected exactly 10 reproducible eval case briefs; found ${cases.length}.`);
if (process.argv.includes("--blind-packet")) {
  console.log(JSON.stringify({ generatedAt: "deterministic", cases: cases.map(({ id, title, expectedProtocolFocus }) => ({ id, title, rubric: expectedProtocolFocus })) }, null, 2));
} else if (!process.argv.includes("--validate")) {
  console.error("Usage: tsx evals/run.ts --validate | --blind-packet"); process.exit(2);
} else console.log(`Validated ${cases.length} reproducible eval case briefs.`);
