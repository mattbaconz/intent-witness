---
title: "Problem and Thesis"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, product, thesis]
---

# Problem and Thesis

## Problem statement

AI coding agents often produce frontends that are:

- technically correct;
- visually polished enough to pass casual inspection;
- composed from modern component primitives;
- yet weak in product specificity, hierarchy, information architecture, or interaction design.

This is commonly described as “AI slop,” but that label is too broad to implement directly.

## Operational definition

For Intent Witness, **AI slop** means one or more of the following:

1. **Unjustified convergence** — common design structures appear without a product-specific reason.
2. **Semantic flattening** — different concepts receive nearly identical visual treatment or priority.
3. **Implementation leakage** — code/data/backend structure leaks directly into UI organization.
4. **Performative design** — high-salience visual elements communicate category/status (“AI startup”) more than product capability.
5. **Shallow responsiveness** — desktop components are stacked rather than reprioritized for smaller contexts.
6. **Generic product copy/IA** — labels and routes such as Dashboard/Insights/Analytics/Activity proliferate without distinct user jobs.
7. **Cosmetic compensation** — visual polish hides a deeper IA or interaction problem.
8. **Reference mimicry** — aesthetic tokens are copied while the underlying rationale is ignored.

## Key distinction: common ≠ bad

A sidebar, card, table, modal, centered hero, gradient, or KPI block may be exactly right.

Intent Witness must ask:

- Does this convention reduce cognitive load?
- Does it map to the user's mental model?
- Does it make priority/urgency legible?
- Does it simplify the primary job?
- Is it consistent with the project's existing design language?

A pattern only becomes suspicious when the answers are weak and the pattern appears to be a model default.

## Core hypothesis

> **A separate, fresh-context design reviewer that inspects the rendered product and evaluates decisions against product intent will produce better UI/UX than allowing the builder agent to generate and self-certify in one context.**

This hypothesis is falsifiable. See [[KILL-CRITERIA]].

## Secondary hypotheses

1. Review quality improves when the reviewer receives structured product intent rather than only screenshots.
2. Review quality improves when findings must include evidence and problem depth.
3. For deep problems, forcing structurally distinct alternatives beats iterative cosmetic tweaking.
4. Before/after comparison is more useful and trustworthy than an absolute quality score.
5. Project-specific design memory reduces both model-default slop and “anti-slop monoculture.”
6. The same review protocol can improve outputs across multiple builder models/ADEs.

## Primary enemy

The primary enemy is not ugly CSS. It is **plausible completion**: a builder reaches a frontend that looks acceptable enough, declares success, and stops reasoning about whether the product structure itself is correct.

## Why now

The skill ecosystem and agentic coding environments increasingly support:

- reusable agent skills;
- subagents/independent contexts;
- browser automation and screenshots;
- hooks/gates;
- MCP/tool integrations.

That makes an independent design-review protocol deployable without building a complete IDE or model stack.
