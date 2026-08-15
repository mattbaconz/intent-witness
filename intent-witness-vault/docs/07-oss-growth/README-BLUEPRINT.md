---
title: "Public README Blueprint"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, oss, readme]
---

# Public README Blueprint

This is a structure guide for the eventual GitHub README, not finished launch copy.

## 1. Hero

**Intent Witness**<br>
*Stop letting coding agents design on autopilot.*

One sentence: independent design reviewer for Cursor/Claude/Codex/etc.

Immediately show the strongest before/after.

## 2. Mechanism GIF

```text
Build → Render → Intent Witness: REVISE → Structural revision → PASS
```

Overlay “same model / same brief.”

## 3. Why not just a prompt?

Explain independent reviewer, actual rendered evidence, depth-aware revision, design memory, benchmarks.

## 4. Install

Make this extremely short.

Long-term:

```bash
npx intent-witness install
```

V0 may have host-specific manual install.

## 5. Usage

```text
Build the dashboard. Use Intent Witness.
```

Show one review result.

## 6. What it catches

Use concrete examples:

- primary workflow buried under generic KPIs;
- redundant routes;
- raw backend settings exposed;
- mobile priority inversion;
- equal visual treatment for semantically different states.

Avoid generic anti-pattern list.

## 7. What it does NOT do

Cards/gradients/etc. are not automatically bad. No universal beauty score. Does not replace designers.

## 8. Benchmark

Show methodology and link full evals. Compare strong prompt and competitors fairly.

## 9. Supported environments

Only claim tested integrations. Separate “native,” “experimental,” and “skill-only.”

## 10. Architecture

Tiny diagram and link docs.

## 11. Contributing

Ask first for false positives/false negatives and ugly/hard real UI cases.

## 12. License

Clear.

## README smell test

If the README spends more space on futuristic SaaS features than the working review loop, rewrite it.
