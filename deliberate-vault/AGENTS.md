---
title: "Agent Operating Guide"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, agents, implementation]
---

# AGENTS.md — Deliberate

This file is written for coding agents. Read it before implementing or modifying Deliberate.

## Mission

Build **Deliberate**, an open-source, ADE-agnostic design-judgment layer that makes AI-generated interfaces more intentional by separating implementation from independent review.

Do not reduce the project to an anti-pattern prompt pack.

## Mandatory reading order

Before making architectural changes, read:

1. [[VISION]]
2. [[PRINCIPLES]]
3. [[V0-SPEC]]
4. [[ARCHITECTURE]]
5. [[REVIEW-PROTOCOL]]
6. [[DETECTION-MODEL]]
7. [[KILL-CRITERIA]]
8. [[DECISION-LOG]]
9. [[OPEN-QUESTIONS]]

For an ADE adapter, also read [[ADE-ADAPTERS]] and the specific integration document.

For eval changes, read all of `docs/04-evals/`.

## Core invariants

Never violate these without updating [[DECISION-LOG]]:

### 1. No universal aesthetic
Deliberate must not encode “good UI = dark, dense, square, minimal, Linear-like.” It evaluates whether decisions are justified by product intent and internal design language.

### 2. Evidence before verdict
A reviewer finding must point to observable evidence: hierarchy, duplication, task priority, structure, interaction path, responsive behavior, or deterministic measurement. Vague taste statements are invalid.

### 3. Convention is not slop
A common pattern may be correct. The reviewer should challenge *unjustified* convergence, not novelty-test every interface.

### 4. Depth-aware revision
If the detected issue is information architecture or interaction, do not permit a cosmetic-only revision brief.

### 5. Independent review
When the host supports subagents, prefer a fresh-context, read-only reviewer. The builder should not self-certify its own interface.

### 6. Compare revisions
Prefer before/after evidence and delta claims over absolute “87/100” quality scores.

### 7. Local-first V0
V0 should use host capabilities and local files/browser where possible. No cloud dependency is required for core value.

### 8. Benchmark against strong baselines
Never claim Deliberate works based only on beating a vague/default prompt. See [[BASELINES]].

## Implementation priorities

V0 priority order:

1. Universal Agent Skill / review workflow.
2. Cursor adapter and reviewer subagent.
3. Structured review result schema.
4. Small eval harness + reproducible briefs.
5. Browser/evidence integration using existing host capabilities.
6. Only then: deterministic helper scripts / local engine.

Do not build SaaS or broad multi-ADE automation before V0 passes evaluation.

## Expected repository behavior

A clean implementation should make these concepts explicit in code/types:

- `ProductIntent`
- `DesignLanguage`
- `ReviewRequest`
- `ReviewFinding`
- `ProblemDepth`
- `ReviewVerdict`
- `RevisionConstraint`
- `ComparisonResult`
- `Evidence`

See [[STRUCTURED-OUTPUT-SCHEMAS]].

## Review-finding quality bar

Bad:

```text
Improve visual hierarchy and spacing.
```

Good:

```text
The active run is the primary user object, but four aggregate KPI cards occupy the strongest first-viewport hierarchy. This pushes the live execution state below secondary summary data. Problem depth: composition/IA. Do not solve by removing borders; reorganize the page around active execution.
```

Every reviewer prompt and test fixture should reward the second behavior and penalize the first.

## Change discipline

When implementing:

- Keep V0 small enough to evaluate quickly.
- Prefer plain structured files over frameworks.
- Avoid dependencies unless they materially improve review evidence or portability.
- Keep ADE-specific code in adapters.
- Keep product/review logic host-agnostic.
- Add fixtures for every bug in reviewer behavior.
- Record architecture decisions in [[DECISION-LOG]].
- Record unresolved tradeoffs in [[OPEN-QUESTIONS]].

## Tests to require

At minimum:

- schema parsing/validation;
- reviewer output contains evidence;
- reviewer distinguishes problem depth;
- no cosmetic fix for IA fixture;
- common-but-justified convention fixture does **not** fail;
- deliberately performative/slop fixture does fail;
- responsive-priority inversion fixture;
- redundant navigation/information fixture;
- design-language consistency fixture;
- anti-reference extraction fixture if implemented.

## Anti-goals for agents

Do not:

- invent a `SlopScore` unless a specific eval proves it is calibrated and useful;
- hard-code “Inter is bad,” “cards are bad,” “gradients are bad” as universal truths;
- make Deliberate generate a default design system;
- copy competitor wording or proprietary content;
- claim objective design quality;
- build marketing infrastructure before the core loop works;
- hide uncertainty in precise-looking metrics.

## Definition of done for V0

V0 is not “done” when it compiles. It is done when:

1. install/usage is documented;
2. one target ADE can run the builder → independent reviewer → revision loop;
3. review output follows the schema;
4. at least 10 benchmark briefs can run reproducibly;
5. blind human comparison is possible;
6. strong-prompt and competitor baselines are included;
7. the project can be killed if it fails [[KILL-CRITERIA]].
