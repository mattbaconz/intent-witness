---
title: "Contribution Model"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, contributions, oss]
---

# Contribution Model

## Contribution philosophy

The project improves fastest when contributors submit **failures and evidence**, not aesthetic opinions.

## Preferred issue templates

### Reviewer false positive

Required:

- product intent;
- screenshot/fixture;
- Intent Witness finding;
- why the convention is justified;
- expected reviewer behavior.

### Reviewer false negative

Required:

- UI evidence;
- missed issue;
- user/product impact;
- expected finding depth.

### ADE integration bug

- host/version;
- adapter version;
- steps;
- expected vs actual;
- logs/artifacts with sensitive info removed.

### New eval case

- domain;
- brief;
- why it challenges current reviewer;
- licensing/permission for included assets.

## PR acceptance principles

A new reviewer rule should normally include:

- at least one positive fixture where it catches a problem;
- at least one counterexample where it should not trigger;
- documentation of rationale;
- no universal aesthetic claim unless tied to correctness/accessibility.

## Maintainer review

Ask:

1. Is this actually product-design reasoning or taste preference?
2. Does it create a false-positive class?
3. Does it belong in deterministic evidence or contextual reviewer guidance?
4. Is the rule durable across trends?
5. Does it need to become project-specific rather than global?

## Community review board later

If the project grows, consider a small group of designers/frontend/product people with different aesthetic backgrounds to review major protocol changes. This is a governance tool against maintainer taste monoculture.
