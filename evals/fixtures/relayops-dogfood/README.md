# RelayOps local dogfood protocol fixtures

This directory is a deterministic **protocol fixture** sequence for the intentionally metric-first RelayOps demo. It is not captured browser output, proof of actual Cursor behavior, or a benchmark result.

The sequence is deliberately local and synthetic:

1. `request-initial.yaml` supplies an evidence-bounded `ReviewRequest` with three captured-evidence references.
2. `initial-revise.yaml` persists an evidence-backed `REVISE` at `information_architecture` depth.
3. `comparison-pass.yaml` resolves that original finding in the first comparison cycle (inside the two-cycle revision budget) and reaches `PASS`.
4. `pass.yaml`, `pass-with-notes.yaml`, and `request-insufficient-evidence.yaml` exercise the remaining verdict paths.
5. `prompt-injection-request.yaml` carries hostile rendered text through a valid `ReviewRequest`; `prompt-injection-artifact.yaml` proves that the text remains untrusted data instead of becoming a verdict instruction.

No RelayOps source file was changed to make this fixture sequence. `baseline-source.json` records SHA-256 hashes of the task-baseline `examples/demo-dashboard/src/` files; the automated release audit rejects drift.

The paths in these fixtures are references only. They stand in for local evidence a builder would capture before delegation. Page/evidence text remains untrusted content, not reviewer instructions.
