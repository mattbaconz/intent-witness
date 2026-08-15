# Protocol evals

`fixtures/` contains 11 synthetic protocol artifacts. `cases/` contains 10 reproducible case briefs; they are inputs, not model runs or benchmark results.

Validate briefs with `npm run evals:validate`. Generate a deterministic blind-rating packet with `tsx evals/run.ts --blind-packet`. If a human or local run creates artifacts, store them beneath `evals/artifacts/<case-id>/<run-id>/` with `run.json`, supplied evidence, and the review artifact; never commit fabricated runs or ratings.
