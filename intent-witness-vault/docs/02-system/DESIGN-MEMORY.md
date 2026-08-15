---
title: "Design Memory"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, design, memory]
---

# Design Memory

## Purpose

Design memory makes Intent Witness project-specific and reduces the risk that the reviewer imposes its own style.

Suggested project directory:

```text
.intent-witness/
├── intent.md
├── design-language.md
├── decisions.md
├── anti-patterns.md
├── references.md
└── reviews/
```

V0 may use only `intent.md`; later versions can expand.

## `intent.md`

Contains durable product context:

- product/domain;
- target user;
- primary jobs;
- primary objects;
- critical states;
- desired product traits;
- constraints;
- routes/flows that matter most.

Use [[PRODUCT-INTENT.template]].

## `design-language.md`

Describes **principles and behaviors**, not merely tokens:

```text
Hierarchy carrier: typography + density
Surface model: containers only for interaction boundaries
Navigation: persistent and compact on desktop
Motion: communicates state transition, not decoration
Density: high for operational surfaces
Color: mostly semantic; restrained decorative use
```

Tokens can be included but should not dominate.

## `decisions.md`

Record explicit accepted choices and why:

```text
2026-08-20 — Keep KPI strip on overview
Reason: customer research shows operators scan health counts before opening active runs.
Implication: Intent Witness should not flag metric-first hierarchy on /overview without new evidence.
```

This is essential for preventing repeated reviewer arguments.

## `anti-patterns.md`

Project-specific recurring problems, not global dogma:

- “Avoid full-width marketing hero inside authenticated app shell.”
- “Do not expose internal retry timings as primary settings.”
- “Avoid using cards as the default grouping mechanism on operations screens.”

## `references.md`

Store extracted principles from positive and negative references. See [[REFERENCE-ANTI-REFERENCE]].

## Review memory

Review history should be append-only or versioned. Useful fields:

- route/scope;
- commit/change identifier;
- protocol version;
- findings;
- accepted/declined decisions;
- before/after evidence paths.

Do not feed entire review history into every prompt. Summarize durable decisions to avoid context bloat.

## Memory precedence

1. Explicit current user instruction.
2. Product intent.
3. Accepted decisions.
4. Existing design language.
5. References.
6. General Intent Witness heuristics.

## Anti-monoculture role

Design memory is not only consistency infrastructure. It is the mechanism by which different projects remain different while using the same reviewer.
