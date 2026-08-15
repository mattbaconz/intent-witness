---
title: "Scope and Non-Goals"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, scope, non-goals]
---

# Scope and Non-Goals

## V0 scope

- Agent Skill defining the review workflow.
- One strong host integration (Cursor first).
- Independent reviewer subagent where supported.
- Structured product-intent input.
- Rendered-UI inspection using host browser capability when available.
- Evidence-based findings.
- Problem-depth classification.
- Revision constraints.
- Before/after comparison.
- Reproducible eval suite.

## V0.5 candidates

Only after V0 validation:

- local CLI;
- deterministic DOM/source measurements;
- Playwright capture helper;
- design memory initialization;
- anti-reference/reference extraction;
- optional hooks to require review.

## Explicit non-goals

### No universal style generator
Intent Witness should never produce “the Intent Witness aesthetic.”

### No Figma replacement
It can consume design context later, but it is not a canvas tool.

### No full usability lab
It can catch interaction risks but cannot substitute for real-user research.

### No AI-authorship detector
The goal is not to prove a human or AI authored a page.

### No static-only linter as the product
Deterministic checks can support review but cannot represent the full value.

### No SaaS requirement for V0
The OSS loop must be useful offline/local-first.

### No arbitrary pass/fail score
Do not invent universal numeric grading in V0.

## Scope expansion test

Before adding a feature, ask:

1. Does it improve independent design judgment?
2. Does it make findings more evidence-based?
3. Does it improve portability or reproducibility?
4. Does it improve evaluation against strong baselines?
5. Can it be deferred until after V0 validation?

If the answer is mostly “it would make the project look more complete,” defer it.
