import { z } from "zod";

export const evalCaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  prompt: z.string().min(1),
  productIntent: z.string().min(1),
  expectedProtocolFocus: z.array(z.string().min(1)).min(1),
});
export const evalRunMetadataSchema = z.object({
  protocolVersion: z.literal("0.1"),
  schemaVersion: z.literal("0.1"),
  caseId: z.string().min(1),
  runId: z.string().min(1),
  createdAt: z.string().datetime(),
  artifactDir: z.string().min(1),
});
export type EvalCase = z.infer<typeof evalCaseSchema>;
export type EvalRunMetadata = z.infer<typeof evalRunMetadataSchema>;
