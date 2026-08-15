---
title: "Evaluation Baselines"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, baselines]
---

# Evaluation Baselines

## Why strong baselines matter

The easiest way to make Intent Witness look amazing is to compare against a weak prompt. That would prove almost nothing.

## Baseline A — Normal competent prompt

Example characteristics:

- clearly describes functionality;
- asks for polished production UI;
- includes framework/technical constraints;
- does not intentionally sabotage design context.

## Baseline B — Excellent manual design prompt

This is the most important adversary.

It should include:

- product/user job;
- desired traits;
- instruction to avoid generic dashboard/marketing defaults;
- instruction to design around domain objects;
- responsive priority guidance;
- request for intentional hierarchy;
- reference principles if available.

If Intent Witness cannot beat this reliably, its orchestration complexity may not be justified.

## Baseline C — Hallmark

Use current official Hallmark workflow. Hallmark positions itself as an anti-AI-slop design skill for Claude Code, Cursor, and Codex and includes modes for greenfield creation, audits/redesigns, and studying references.

Do not compare against only one Hallmark mode if another is intended for the task.

## Baseline D — Impeccable

Use current official Impeccable workflow, including relevant critique/audit/refinement commands and persistent design context where appropriate.

Important distinction: Impeccable's code-level audit is not the same as design critique. Use the appropriate path.

## Baseline E — Anthropic frontend-design

Useful for generation-focused comparison because it explicitly pushes distinctive, intentional frontend aesthetics.

## Optional baseline — UI/UX Pro Max

Useful for breadth/design-system tasks. It has a large database of styles, palettes, fonts, UX guidance, product types, and multiple platform integrations.

## Combination baseline

Test:

```text
Strong generation skill + Intent Witness reviewer
```

If this beats either alone, Intent Witness's best positioning may be complementary infrastructure rather than “replace design skills.”

## Model diversity

Do not optimize only for one builder. Include at least 3 model families over time.

Key question:

> Does Intent Witness fix *general agent design behavior*, or only the habits of the model used during development?
