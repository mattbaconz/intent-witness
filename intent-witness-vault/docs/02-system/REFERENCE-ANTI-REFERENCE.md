---
title: "References and Anti-References"
project: Intent Witness
status: pre-implementation
updated: 2026-08-14
tags: [intent-witness, references, design]
---

# References and Anti-References

## Goal

Use references to extract **why** a design works for the user, not to clone it.

## Positive reference workflow

For each reference, extract:

- information density;
- hierarchy carrier (type, spatial grouping, color, imagery, motion);
- navigation philosophy;
- interaction philosophy;
- surface/container model;
- motion purpose;
- content rhythm;
- emphasis strategy;
- what is intentionally omitted;
- product-context caveats.

Bad extraction:

```text
Use #111 background, 8px radii, Geist, gray borders like Linear.
```

Better:

```text
Preference: high operational density, subdued decorative color, hierarchy driven by typography and state rather than many enclosed surfaces.
```

## Anti-reference workflow

Ask what the user dislikes and translate it into dimensions:

```text
Dislikes screenshot A because:
- all modules have equal visual weight;
- every concept is boxed;
- oversized hero reduces information density;
- decorative gradient is the most salient element;
- navigation labels overlap semantically.
```

Do not turn this into “never use cards/gradients.”

## Conflict handling

If references conflict:

- identify the conflicting principle;
- tie preference to product context;
- ask/derive which context applies;
- store the resolved decision.

## Reference contamination risk

Popular references (Linear, Stripe, Vercel, Raycast, Arc, etc.) can themselves cause convergence. Intent Witness should deliberately avoid mapping references to recipes such as “developer tool → dark Linear-style UI.”

## Benchmark requirement

Include eval cases where users provide overused popular references. Intent Witness should extract principles while still producing domain-specific structures.
