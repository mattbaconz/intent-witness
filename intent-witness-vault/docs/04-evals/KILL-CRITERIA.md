---
title: "Kill Criteria"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, kill, criteria]
---

# Kill Criteria

## Why this document exists

Intent Witness is attractive enough to overbuild. This document exists to prevent sunk-cost mythology.

## Kill / radically reposition if any of these persist after serious iteration

### K1 — Strong-prompt parity
A high-quality manual design prompt reproduces ~80–90% of Intent Witness's benefit across representative tasks with much less complexity/friction.

### K2 — Competitor parity
Blind evaluators cannot meaningfully distinguish Intent Witness from Hallmark/Impeccable on product-specificity, IA, or shippability.

### K3 — Reviewer vagueness
Findings frequently collapse into generic advice such as “improve hierarchy,” “add whitespace,” or “make it feel premium.”

### K4 — House-aesthetic convergence
Outputs become recognizably “Intent Witness”: dark, dense, restrained, square, editorial, or any other repeated house style regardless of domain.

### K5 — False-positive frustration
Review frequently challenges correct conventions and users learn to ignore or disable it.

### K6 — Revision thrashing
The system oscillates (remove surfaces → add grouping → remove surfaces) and cannot converge within a small iteration budget.

### K7 — Cosmetic-only gains
Intent Witness makes screenshots prettier but does not catch IA/interaction/product-specificity problems better than baselines.

### K8 — Cost/latency mismatch
Quality gain is too small relative to additional model/tool/browser time and credits.

### K9 — Host fragility
The value depends on one ADE's transient feature rather than the portable review protocol.

### K10 — No repeat use
Users like the demo, star the repo, but do not use Intent Witness repeatedly on real projects.

## “Continue” evidence

Continue investing when:

- blind preference is materially higher;
- reviewers cite product-specific structural improvements;
- strong existing UIs often receive PASS rather than gratuitous changes;
- deep findings trigger successful deep revisions;
- results generalize across model families;
- users voluntarily keep design memory in repos;
- users ask for CI/team integration after experiencing local value.

## Go-big threshold

Do not build serious SaaS/CI infrastructure until there is evidence of:

1. repeat users;
2. reliable benchmark advantage;
3. real teams asking for shared/gated review;
4. a reason hosted infrastructure provides value beyond OSS.

## Decision rule

A failed version of the review prompt does not kill the thesis immediately. But repeated failure after disciplined protocol/eval iteration should kill or narrow the project.

Do not redefine the metric after losing.
