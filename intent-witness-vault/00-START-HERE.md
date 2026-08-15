---
title: "Start Here"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, index, onboarding]
---

# Start Here

This vault is the canonical pre-implementation specification for **Intent Witness**.

## One-sentence product

**Intent Witness gives coding agents an independent design reviewer that catches generic, unjustified UI/UX decisions and forces product-specific revisions before the agent declares the interface done.**

## Why it exists

AI coding agents can produce technically competent and visually polished frontends while still converging on recognizable patterns: generic dashboard grids, equal-weight cards, repeated rounded surfaces, boilerplate SaaS sections, redundant navigation, implementation details exposed as settings, and mobile layouts that merely stack desktop components.

The problem is not that every common pattern is bad. The problem is that models frequently choose them **without evidence that the product needs them**.

Intent Witness tries to separate:

- **Convention:** familiar because it helps users.
- **Intentional style:** a intent-witness visual/interaction choice.
- **Model prior:** familiar because the model has generated it many times.
- **Implementation leakage:** frontend structure mirrors backend/schema/component convenience rather than user mental models.

## The product wedge

Existing design skills mostly improve the generator’s prompt/context. Intent Witness’s wedge is **independent post-implementation judgment**.

```text
Builder agent
  ↓
Rendered application
  ↓
Independent Intent Witness reviewer
  ↓
Evidence + problem depth + revision constraints
  ↓
Builder revises
  ↓
Review again
```

The reviewer must not merely restyle. It classifies issues by depth:

1. **Polish** — typography, spacing, contrast, color, borders.
2. **Composition** — grouping, hierarchy, proportions, page structure.
3. **Information architecture** — what belongs on the screen and how concepts are organized.
4. **Interaction model** — how the user accomplishes the task.

A Level 3 problem cannot be “fixed” first with Level 1 changes.

## V0 success condition

A blind human evaluation should show that Intent Witness’s review loop produces interfaces that are meaningfully preferred over strong-prompt and competitor baselines, especially on:

- product specificity;
- hierarchy;
- task clarity;
- coherent information architecture;
- reduced generic-model convergence;
- “would you actually ship this?” preference.

See [[EVAL-STRATEGY]].

## V0 non-goals

Do **not** build these before the benchmark earns them:

- SaaS accounts or billing;
- hosted inference;
- organization dashboards;
- universal numeric UI score;
- 100+ rules;
- custom vision model;
- perfect support for every ADE;
- autonomous design generation;
- Figma replacement;
- a component library.

## Suggested reading by role

### Builder/engineer
[[AGENTS]] → [[ARCHITECTURE]] → [[V0-SPEC]] → [[REVIEW-PROTOCOL]] → [[TEST-PLAN]]

### Product/strategy
[[VISION]] → [[POSITIONING]] → [[COMPETITIVE-LANDSCAPE]] → [[MOAT-STRATEGY]] → [[ROADMAP]]

### Research/evals
[[DETECTION-MODEL]] → [[SLOPBENCH]] → [[BASELINES]] → [[HUMAN-RATING]] → [[KILL-CRITERIA]]

### OSS/community
[[FOSS-STRATEGY]] → [[DEMO-STRATEGY]] → [[DISCORD-PLAYBOOK]] → [[CONTRIBUTION-MODEL]]

## Source-of-truth rule

When documents disagree:

1. [[DECISION-LOG]] wins for explicit accepted decisions.
2. [[V0-SPEC]] wins for current V0 scope.
3. [[ARCHITECTURE]] wins for system boundaries.
4. [[REVIEW-PROTOCOL]] wins for reviewer behavior.
5. [[OPEN-QUESTIONS]] identifies unresolved items; do not silently choose one without recording it.
