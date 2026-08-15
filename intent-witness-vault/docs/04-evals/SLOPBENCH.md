---
title: "SlopBench"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, slopbench]
---

# SlopBench

## Working definition

SlopBench is the proposed open benchmark/corpus for evaluating generic-convergence detection and product-specific UI review.

The name is intentionally informal and can change before public release.

## Why a corpus is useful

Static anti-pattern rules age quickly. A corpus can capture dimensions of design behavior and help test whether Intent Witness:

- catches known model-default patterns;
- avoids false positives on justified conventions;
- generalizes across product categories and model families;
- improves over time without collapsing into one aesthetic.

## Corpus categories

Potential labels:

- `generic-saas-marketing`
- `performative-ai-marketing`
- `generic-dashboard`
- `devtool-operations`
- `fintech`
- `ecommerce`
- `productivity`
- `mobile-settings`
- `onboarding`
- `analytics`
- `strong-intentional-design`
- `experimental-but-usable`
- `experimental-and-harmful`
- `legacy-functional-ui`

## Dimension labels

Avoid single good/bad labels. Annotate dimensions such as:

- `template_similarity`
- `product_specificity`
- `hierarchy_quality`
- `functional_density`
- `performative_load`
- `interaction_clarity`
- `semantic_visual_alignment`
- `responsive_priority_quality`
- `design_language_consistency`

Use ordinal human labels initially (`low/medium/high`) rather than fake decimals.

## Sources

Potential sources must respect licenses/terms:

- Intent Witness-generated benchmark outputs;
- purpose-built synthetic fixtures;
- permissively licensed open-source apps;
- user-contributed screenshots with explicit permission;
- public examples analyzed only when legally/ethically appropriate.

[[PERFORMATIVE-UI-CORPUS]] can inform taxonomy but do not copy competitor/library assets into the repo without license review.

## Paired outputs

The most valuable dataset may be paired:

```text
same brief + same model
before Intent Witness
vs
Intent Witness-reviewed revision
```

Store:

- code commit hashes;
- screenshots;
- review findings;
- revision changes;
- human ratings.

## Benchmark tasks

Minimum V0 set should include 10–20 cases spanning:

1. developer operations dashboard;
2. finance analytics;
3. consumer mobile onboarding;
4. settings/preferences;
5. project management;
6. marketplace listing/details;
7. AI product where “AI tropes” are tempting;
8. non-AI SaaS marketing page;
9. unusual domain (e.g., lab/industrial workflow);
10. existing strong UI that should pass.

## Versioning

Benchmark version must be immutable after publication. New cases create a new version.

Example:

```text
slopbench-v0.1
slopbench-v0.2
```

Never quietly replace failed cases.
