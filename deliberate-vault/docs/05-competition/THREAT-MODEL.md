---
title: "Competitive and Product Threat Model"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, threats, competition]
---

# Competitive and Product Threat Model

## T1 — Native ADE feature absorption

Cursor/Claude/Codex/etc. add built-in “design review” after frontend generation.

**Impact:** High.

**Defense:** Portable protocol, cross-host design memory, open eval suite, deeper product-specific reasoning, ecosystem/community. Do not rely on a UI button as moat.

## T2 — Frontier models simply get much better at design

**Impact:** Mixed.

If generation becomes excellent, obvious anti-slop value falls. But independent review may still improve complex IA/interaction and cross-team consistency.

**Defense:** Benchmark against stronger models continuously; move value upward from styling to product design and consistency.

## T3 — Hallmark/Impeccable copy the review loop

**Impact:** Very high.

**Defense:** Execute fast, open benchmark, build protocol/evidence quality, become complementary/integrable. If they outperform, reconsider whether a separate project is justified.

## T4 — Deliberate becomes a prompt pack

**Impact:** Existential.

If most value can be recreated with a 2-page prompt, users will copy the useful parts and leave.

**Defense:** Independent context, evidence capture, structured review, memory, reproducible comparison, host orchestration.

## T5 — Deliberate becomes its own aesthetic monoculture

**Impact:** Existential to credibility.

**Defense:** design-memory-first evaluation, counterexample fixtures, style-diverse benchmark, no universal anti-pattern bans, track output diversity.

## T6 — False positives make gating unbearable

**Impact:** High.

**Defense:** advisory default, confidence, evidence requirement, conservative material findings, clear override, max iteration budget.

## T7 — Virality without retention

**Impact:** High commercially, moderate OSS.

A viral side-by-side can generate stars without repeat utility.

**Defense:** measure repeated use; dogfood in real repos; prioritize design memory and workflow fit.

## T8 — “Good prompt is enough”

**Impact:** Existential.

**Defense:** [[BASELINES]] + [[KILL-CRITERIA]]. Do not hand-wave this threat.

## T9 — Evaluation becomes subjective marketing theater

**Impact:** High.

**Defense:** publish briefs, blinded comparisons, counterexamples, reviewer-quality labels, costs, failures, and all benchmark conditions.

## T10 — Context/cost explosion

**Impact:** Medium-high.

**Defense:** scoped reviews, evidence caching, bounded iterations, deterministic helpers, progressive context loading.

## T11 — User doesn't know/care about design quality

**Impact:** Medium.

The biggest slop producers may think output is fine; experts may not need the tool.

**Target wedge:** users sophisticated enough to care but without continuous human design review—AI-first builders and frontend engineers.

## T12 — Reviewer hallucination / invented product requirements

**Impact:** High.

**Defense:** explicit product-intent source, evidence requirement, uncertainty, “insufficient evidence” verdict, decision memory.

## T13 — Reference cloning

**Impact:** High reputationally.

**Defense:** principle extraction and anti-reference dimensions; avoid copy recipes.

## T14 — Security/privacy concerns

**Impact:** High for teams.

**Defense:** local-first OSS, scoped captures, transparent model boundaries, later enterprise controls. See [[SECURITY-PRIVACY]].

## T15 — Scope explosion

Deliberate starts as a skill and turns into browser framework + design system + Figma + analytics + SaaS before validation.

**Impact:** High execution risk.

**Defense:** [[V0-SPEC]], [[KILL-CRITERIA]], and explicit phased roadmap.
