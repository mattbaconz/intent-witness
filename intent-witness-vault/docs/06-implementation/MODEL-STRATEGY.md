---
title: "Model Strategy for Building and Testing Intent Witness"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, implementation, models]
---

# Model Strategy for Building and Testing Intent Witness

> Volatile research/working strategy as of 2026-08-14. Model availability, Cursor pricing, and benchmark rankings change quickly. Verify current options before executing a long build.

## Principle

Use different models for different jobs and avoid optimizing the Intent Witness reviewer around one model family's habits.

## Development roles

### Architecture / product reasoning
Use a frontier reasoning model capable of challenging architecture and evaluation assumptions.

Working preference discussed during ideation: Grok 4.6 at high/xhigh reasoning for planning.

### Bulk implementation
Use a fast/efficient coding model once the plan and interfaces are explicit.

Working preference: Cursor Composer 2.5 for implementation-heavy work.

### Adversarial review of Intent Witness itself
Use a different frontier family (for example, a strong Claude/Opus-class model) to attack:

- reviewer bias;
- house aesthetic;
- false positives;
- vague findings;
- benchmark loopholes;
- architecture overreach.

### Visual/reference experiments
Use strong multimodal models and compare families; do not assume the best coder is the best visual reviewer.

## Dogfood the product thesis

Development can use:

```text
Planner model → proposes protocol
Adversarial model → attacks protocol
Implementation model → implements agreed spec
Eval models → test across families
```

This mirrors Intent Witness's separation of generation and critique.

## Benchmark model diversity

At minimum over time test:

- one xAI/Grok-family builder;
- one Anthropic/Claude-family builder;
- one OpenAI/Codex/GPT-family builder;
- one fast/cheaper agentic coding model;
- optionally Gemini-family multimodal builder/reviewer.

## Critical warning

If Intent Witness is developed and evaluated only on one builder model, it may simply become a patch set for that model's design priors.

## Same vs different reviewer model

Explicit experiment:

1. builder model self-review;
2. fresh subagent same model;
3. fresh subagent different model family.

This isolates whether value comes from context separation, model diversity, or both.
