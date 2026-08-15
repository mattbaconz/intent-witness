---
title: "SaaS Later"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, business, saas]
---

# SaaS Later

## Position

Do not build SaaS before the OSS review loop proves repeat value.

The SaaS should exist only for capabilities that are meaningfully better hosted/shared than local.

## Plausible future paid value

### Team design memory

Shared product intent, design-language policies, decisions, route ownership, and organization-specific review settings.

### PR/CI review history

- baseline/current evidence;
- review results by commit;
- acknowledged exceptions;
- trend/regression history;
- artifact retention.

### Managed reviewer routing

Use high-quality multimodal/reasoning models without every team configuring model providers. Could include cost controls and model fallback.

### Organization policy

Examples:

- accessibility standards;
- required responsive states;
- design-system constraints;
- review severity thresholds;
- protected critical flows.

### Figma/design-system synchronization

Potentially consume approved design tokens/components/intent and compare implementation. This is valuable only if it remains about decision review rather than becoming a generic Figma sync product.

### Private evals

Teams can maintain domain-specific benchmark cases and reviewer regression tests.

## SaaS positioning

The paid pitch should evolve from consumer “anti-slop” language toward:

> **Automated product-design review for every frontend PR, against your team’s actual design language.**

That is easier to justify as team spend.

## What remains open/free

Recommended:

- local review protocol;
- local reviewer configs;
- design-memory format;
- basic CLI/engine;
- core adapters;
- public eval framework.

Hosted collaboration/history/managed compute can be paid without crippling OSS.

## Trigger to build SaaS

Require at least three signals:

1. repeat OSS usage;
2. teams explicitly asking for shared/CI functionality;
3. benchmark advantage survives strong baselines;
4. hosted artifact/model/history provides obvious value;
5. willingness-to-pay interviews or paid pilots.

## What not to do

- add auth/billing because OSS repo got stars;
- build a dashboard nobody asked for;
- move core review behind API;
- store screenshots by default without explicit policy;
- sell universal “design quality scores” to management.
