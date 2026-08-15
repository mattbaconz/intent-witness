---
title: "Structured Output Schemas"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, schemas, system]
---

# Structured Output Schemas

These are conceptual V0 schemas. Implementation may use JSON Schema, Zod, Pydantic, TypeScript, or equivalent.

## ProductIntent

```ts
interface ProductIntent {
  productName?: string;
  domain: string;
  targetUsers: string[];
  primaryJob: string;
  secondaryJobs?: string[];
  primaryObjects: string[];
  criticalStates?: string[];
  desiredTraits?: string[];
  constraints?: string[];
  explicitAvoid?: string[];
}
```

## Evidence

```ts
type Evidence =
  | { kind: 'screenshot'; path: string; region?: string; note?: string }
  | { kind: 'dom'; selector?: string; fact: string }
  | { kind: 'source'; file: string; line?: number; fact: string }
  | { kind: 'interaction'; route: string; steps: string[]; fact: string }
  | { kind: 'responsive'; viewport: string; fact: string }
  | { kind: 'design-memory'; source: string; fact: string };
```

## ProblemDepth

```ts
type ProblemDepth =
  | 'polish'
  | 'composition'
  | 'information_architecture'
  | 'interaction';
```

## ReviewFinding

```ts
interface ReviewFinding {
  id: string;
  title: string;
  observation: string;
  productMismatch: string;
  evidence: Evidence[];
  depth: ProblemDepth;
  severity: 'non_blocking' | 'material';
  confidence: 'low' | 'medium' | 'high';
  revisionConstraint?: string;
}
```

## ReviewResult

```ts
interface ReviewResult {
  protocolVersion: string;
  schemaVersion: string;
  verdict: 'PASS' | 'PASS_WITH_NOTES' | 'REVISE' | 'INSUFFICIENT_EVIDENCE';
  summary: string;
  deepestProblem?: ProblemDepth;
  findings: ReviewFinding[];
  alternativesRequired: boolean;
  alternativeConstraints?: string[];
  overallConfidence: 'low' | 'medium' | 'high';
}
```

## ComparisonResult

```ts
interface ComparisonResult {
  priorReviewId: string;
  resolvedFindingIds: string[];
  unresolvedFindingIds: string[];
  regressions: ReviewFinding[];
  improvements: string[];
  verdict: 'PASS' | 'PASS_WITH_NOTES' | 'REVISE';
  nextAction: string;
}
```

## Validation rules

- Material findings require at least one evidence item.
- `REVISE` requires at least one material finding.
- `alternativesRequired=true` should normally correspond to deepest depth `information_architecture` or `interaction`.
- Reviewer may not return more than a small bounded number of material findings (recommended 3–5) without grouping; excessive finding count reduces actionability.
- If evidence is insufficient, use `INSUFFICIENT_EVIDENCE` rather than fabricating findings.
