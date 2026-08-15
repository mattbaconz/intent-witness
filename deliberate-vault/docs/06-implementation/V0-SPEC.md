---
title: "V0 Specification"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, implementation, v0]
---

# V0 Specification

## V0 objective

Prove or disprove the core product hypothesis with the smallest credible implementation.

V0 is **not** a complete Deliberate platform. It is an experimentally useful review protocol packaged for one ADE, with enough eval infrastructure to compare against strong baselines.

## Required deliverables

### 1. Universal Deliberate skill

A portable `SKILL.md` containing:

- trigger conditions;
- context requirements;
- review invocation workflow;
- depth-aware revision rules;
- comparison/re-review rules;
- stopping rule;
- references loaded progressively, not all inline.

### 2. Cursor adapter

Because Cursor currently offers strong skill/subagent/browser/hook primitives.

Must include:

- project skill installation;
- `deliberate-reviewer` custom subagent;
- instructions for using browser evidence;
- structured review result;
- no default blocking hook.

### 3. Reviewer protocol references

At minimum:

- product-intent reasoning;
- convergence vs convention;
- IA/interaction review;
- visual hierarchy;
- responsive priority;
- reviewer anti-patterns;
- output schema.

### 4. Example design memory

Use `.deliberate/intent.md` template. Full automated memory generation can wait.

### 5. Eval harness

Can begin as scripts + markdown fixtures rather than a polished app.

Must support:

- repeatable briefs;
- condition metadata;
- output artifact directory;
- blind rating packet generation or easy manual export;
- record review results and iteration count.

### 6. Benchmark cases

At least 10, preferably 15–20 before public claims.

## V0 user flow

```text
1. Install Deliberate in repo.
2. Create/confirm .deliberate/intent.md.
3. Ask Cursor to build/redesign UI “using Deliberate.”
4. Builder implements and renders.
5. Builder delegates read-only review.
6. Reviewer inspects desktop + narrow viewport where applicable.
7. Reviewer returns structured verdict.
8. Builder revises material findings.
9. Reviewer compares revision.
10. Builder reports final status + unresolved notes.
```

## V0 review output example

```yaml
verdict: REVISE
deepest_problem: information_architecture
overall_confidence: high
findings:
  - title: Primary workflow is visually subordinate
    observation: Four aggregate KPI cards dominate the first viewport...
    product_mismatch: The user’s primary job is monitoring active execution...
    depth: information_architecture
    severity: material
    confidence: high
    revision_constraint: Do not solve by merely shrinking/restyling KPI cards.
alternatives_required: true
alternative_constraints:
  - One direction must organize around active execution.
  - One direction cannot use a conventional dashboard grid.
```

## Explicit V0 exclusions

- custom hosted reviewer;
- cloud account;
- payments;
- organization support;
- universal SlopScore;
- Figma integration;
- full local browser engine;
- every ADE adapter;
- automated benchmark website;
- marketing site beyond minimal OSS documentation.

## Quality bar

V0 should feel *small but rigorous*. A 2,000-line repo with excellent review/evals is better than a 30,000-line pseudo-platform.

## Exit criteria

Proceed to V0.5 only if:

- core loop works reliably in Cursor;
- critiques are concrete/evidence-based;
- at least early evals show improvement over strong prompt;
- no obvious house aesthetic appears;
- users can understand installation in minutes.

Otherwise iterate protocol or stop.
