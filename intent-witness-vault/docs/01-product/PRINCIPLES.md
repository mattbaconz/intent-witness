---
title: "Product Principles"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, principles, product]
---

# Product Principles

## P1 — Intent over taste

Intent Witness evaluates whether decisions are intentional and product-specific, not whether they match the maintainer's aesthetic preference.

## P2 — Evidence over adjectives

“Generic,” “busy,” “clean,” and “premium” are not sufficient findings. Every critique must point to observable structure, behavior, priority, duplication, or mismatch.

## P3 — Depth before polish

Always identify whether the problem is polish, composition, IA, or interaction. Do not allow lower-depth fixes to masquerade as resolution.

## P4 — Independent review over self-certification

When possible, the reviewer should be a separate context/subagent and read-only. The builder owns implementation; the reviewer owns judgment.

## P5 — Product-specificity over novelty

The goal is not to make every interface weird. Familiar conventions are often useful. The goal is to make the interface fit the product.

## P6 — Principles from references, not cloning

References should teach density, hierarchy, interaction philosophy, visual carriers, and motion purpose—not hex values and copied layouts unless the user explicitly asks for replication.

## P7 — Compare deltas, avoid fake precision

Prefer “primary workflow moved into first-viewport dominance; redundant activity region removed” over “score improved 73 → 88.”

## P8 — Local-first, open core

The review protocol and useful local workflow should be open-source and independently usable.

## P9 — Portability by protocol

ADE adapters should be thin. Intent Witness’s core concepts and output schema must not depend on Cursor-specific APIs.

## P10 — Benchmarks before mythology

No marketing claim should rely solely on curated before/after screenshots. Maintain reproducible evals against strong baselines.

## P11 — Friction must earn trust

A design gate that blocks shipping must be extremely conservative. V0 defaults to review/advice, not blocking.

## P12 — Avoid anti-slop monoculture

If Intent Witness's outputs start converging on a recognizable “Intent Witness look,” treat that as a critical product bug.

## P13 — Reviewer uncertainty is allowed

The reviewer may say “low confidence; this looks conventional but plausibly justified.” It should not manufacture certainty.

## P14 — User intent can override reviewer preference

Explicit user constraints outrank Intent Witness’s recommendations unless they create correctness, accessibility, or safety issues.

## P15 — Measure repeat usage, not only virality

A viral anti-slop demo can produce stars without sustained utility. Repeat reviews and user-retained design memory matter more.
