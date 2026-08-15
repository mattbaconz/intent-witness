---
title: "FOSS Strategy"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, oss, foss]
---

# FOSS Strategy

## Why open source first

Deliberate's core value is easiest to adopt when:

- installation is low-friction;
- the review protocol is inspectable;
- users can change rules/intent;
- contributors can add fixtures/adapters;
- teams can verify what is being sent to models;
- the project can integrate across competing ADEs without platform lock-in.

The project should earn trust before monetization.

## What should be genuinely open

Recommended open core:

- Agent Skill;
- review protocol;
- reviewer prompts/config;
- schemas;
- local CLI/engine if built;
- core ADE adapters;
- benchmark briefs and selected artifacts;
- design-memory format;
- contribution/test tooling.

Do not deliberately cripple the local product to manufacture SaaS demand.

## License

Initial recommendation to evaluate: **Apache-2.0** for explicit patent language and broad commercial adoption, or MIT for maximum simplicity. Make a deliberate license decision before first public release and record it in [[DECISION-LOG]].

Do not copy competitor skill content. Ideas/patterns can inform research, but implementation text must be original and respect licenses/notices.

## Contributor flywheel

The ideal contribution loop:

```text
User finds reviewer failure
  ↓
submits fixture + expected behavior
  ↓
protocol/detector improves
  ↓
benchmark prevents regression
  ↓
more reliable reviewer
```

This is stronger than accepting random new “anti-slop rules.”

## High-value contribution types

- false-positive fixtures;
- false-negative fixtures;
- domain-specific eval cases;
- ADE adapters;
- browser/evidence helpers;
- schema/tooling improvements;
- accessibility integrations;
- human-rating data;
- documentation/translations later.

## Governance principle

Taste-related rule changes should require evidence. A maintainer disliking an aesthetic is not enough.

For substantial review-policy changes, ask:

- What failure case does this solve?
- Is there a fixture?
- What counterexample might regress?
- Does it create a house aesthetic?
- How will evals detect harm?

## Community identity

Deliberate should feel rigorous but playful enough to spread. Anti-slop language is useful culturally; documentation should still distinguish jokes from product claims.

## Success metrics

Early OSS metrics:

- unique installs/clones if measurable;
- repeat users;
- GitHub stars;
- external issues/PRs;
- number of contributed fixtures;
- number of real before/after examples;
- ADE adapter requests;
- benchmark participation.

Stars are useful but not sufficient.
