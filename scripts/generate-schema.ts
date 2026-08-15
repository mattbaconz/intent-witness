import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";
import { reviewArtifactSchema, reviewRequestSchema, reviewResultSchema } from "../schema/zod.ts";

const root = resolve(import.meta.dirname, "..");
const schemas: Record<string, object> = {
  "review-result.schema.json": z.toJSONSchema(reviewResultSchema),
  "review-request.schema.json": z.toJSONSchema(reviewRequestSchema),
  "review-artifact.schema.json": z.toJSONSchema(reviewArtifactSchema),
};
const check = process.argv.includes("--check");
const drifted: string[] = [];
for (const [name, schema] of Object.entries(schemas)) {
  const path = resolve(root, "schema", name);
  const output = `${JSON.stringify(schema, null, 2)}\n`;
  if (check) {
    if (!existsSync(path) || readFileSync(path, "utf8") !== output) drifted.push(`schema/${name}`);
  } else writeFileSync(path, output);
}
if (drifted.length) {
  console.error(`Schema drift detected: ${drifted.join(", ")}`);
  process.exit(1);
}
