---
title: "Human Rating Protocol"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, eval, humans]
---

# Human Rating Protocol

## Goal

Collect useful human judgment without pretending design is perfectly objective.

## Blind setup

- Randomize condition labels.
- Do not tell raters which tool/model produced an output.
- Prefer side-by-side comparison for paired tasks.
- Include the product brief so raters judge fit, not only beauty.

## Rating dimensions

Use 1–5 ordinal ratings with anchors.

### Primary-job clarity
1: difficult to tell what the screen is for
3: understandable but competing priorities
5: primary job is immediately obvious

### Product specificity
1: could belong to many unrelated SaaS products
3: some domain-specific structure
5: hierarchy/interaction strongly reflects this product

### Information architecture
1: concepts are redundant/confusing/implementation-driven
3: mostly coherent with some overlap
5: clear mental model and grouping

### Visual hierarchy
1: priority unclear or misleading
3: acceptable
5: weight/placement strongly support user priorities

### Interaction clarity
1: important actions/states hard to find or distinguish
3: usable
5: obvious, efficient, well differentiated

### Responsive quality
1: mechanically stacked/broken priorities
3: works
5: deliberately reprioritized for viewport/context

### Visual appeal
Subjective aesthetic preference; keep separate from structural scores.

### Ship preference
Question: “If functionality were equal, which version would you ship?”

## Free-text prompt

Ask:

> “What is the biggest reason for your preference?”

This often reveals whether Intent Witness improved actual product structure or merely styling.

## Rater diversity

Over time include:

- frontend developers;
- product designers;
- product managers/founders;
- less design-specialized users.

Report subgroup differences rather than averaging away disagreement.

## Reviewer-finding validation

For a sample of Intent Witness findings, ask expert raters:

- Is the observation factually correct?
- Is the mismatch relevant?
- Is the depth classification correct?
- Is the revision constraint appropriate?
- Would you act on it?

## Avoid

- showing GitHub stars/brand names;
- telling raters a version is “AI slop”;
- rewarding novelty independent of usability;
- evaluating screenshots without product context;
- using only the project author's taste as ground truth.
