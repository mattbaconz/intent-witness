---
title: "Evaluation Strategy"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, benchmark]
---

# Evaluation Strategy

## Purpose

Intent Witness must earn its existence empirically. A curated before/after screenshot is marketing evidence, not product validation.

The core evaluation question:

> **Does an independent Intent Witness review loop produce interfaces humans prefer over strong generation baselines, at acceptable cost and with useful/reliable critiques?**

## Experimental unit

An eval case contains:

- a product brief;
- existing repo or greenfield scaffold;
- target screen/flow;
- explicit product/user intent;
- constraints;
- seed state/data;
- evaluation rubric;
- optional references/anti-references;
- deterministic test requirements.

Use [[EVAL-CASE.template]].

## Required baseline conditions

At minimum, each representative task should compare:

### A — Default frontier agent
Normal well-written task prompt, no special design skill.

### B — Strong handcrafted prompt
Same agent with a genuinely excellent design prompt that includes product intent and anti-generic guidance.

### C — Existing strong design skill
Hallmark and/or Impeccable, using their intended workflow rather than a crippled configuration.

### D — Intent Witness
Same builder with Intent Witness review loop.

### Optional E — Design skill + Intent Witness
Tests whether Intent Witness is complementary rather than strictly substitutive.

## Control variables

Record:

- model/version;
- reasoning level;
- ADE/version;
- initial repo commit;
- task text;
- time/date;
- tool/browser capabilities;
- max iterations;
- token/credit cost when available;
- whether reviewer uses same or different model.

## Human evaluation

Blind evaluators should not know which condition produced which UI.

Rate separately:

- primary-job clarity;
- product specificity;
- information architecture;
- visual hierarchy;
- interaction clarity;
- responsive prioritization;
- coherence/consistency;
- visual appeal (subjective but still useful);
- likelihood to ship;
- perceived generic/template quality.

See [[HUMAN-RATING]].

## Reviewer-quality evaluation

Intent Witness itself must be judged on critique quality, not only final UI.

Score findings on:

- specificity;
- evidence grounding;
- correctness;
- depth classification;
- actionability;
- false-positive rate;
- whether proposed revision matches actual problem depth;
- whether reviewer invents requirements;
- whether review converges.

## Counterfactual tests

Include cases where:

- common dashboard cards are **correct and justified**;
- a gradient/hero/pill-heavy interface is intentionally on-brand and functional;
- a strange/asymmetric interface harms usability;
- references point toward an overused style but product demands something else;
- the existing design is already strong and should receive PASS;
- a visually beautiful UI has bad IA;
- an ugly UI has good IA (review should classify appropriately, not demand total rebuild).

These prevent anti-slop dogma.

## Statistical caution

V0 does not need academic-scale significance, but avoid cherry-picking. Publish all benchmark briefs and representative outputs. If using ratings, report sample size and uncertainty rather than only headline percentages.

## Success threshold

See [[KILL-CRITERIA]] for minimum criteria. Strong success should be visible in both:

1. blind preference; and
2. qualitative reviewer comments about product-specific structure—not merely prettier styling.
