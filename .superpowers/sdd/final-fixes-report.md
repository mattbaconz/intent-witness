# Final whole-branch fixes report

## Status and commit

Implementation commit: `2e32912c2441913ae83fa8aacce0a60b27ae85fe` (`fix: harden final alpha contracts`).

All requirements in `.superpowers/sdd/final-fixes-brief.md` were implemented. No remote, publication, or RelayOps `src/**` mutation was performed.

## Changed behavior

- Installer preflights the resolved target root and rejects managed/state paths crossing symlink, junction/reparse, traversal, or real-root boundaries. Trusted upgrades treat a current destination absent from the prior manifest as unowned: they refuse without `--force` and back it up before forced replacement.
- First install creates `.intent-witness/.gitignore` only when absent, with private local defaults for intent, evidence, reviews, backups, scratch data, and install metadata. Installation docs describe intentional opt-in versioning.
- Runtime contracts are strict, normalize documented `reference` evidence everywhere (including artifact results and comparison regressions), cap material findings/regressions at five, and retain runtime enforcement of cross-array ID rules that JSON Schema cannot represent.
- Generated request/result/artifact JSON Schemas project every representable repaired rule, are exported in the npm package, and are consumed by a packed plain-Node integration test.
- RelayOps now has a valid prompt-injection `ReviewRequest` plus a separate valid artifact that does not obey the injected data. Root and RelayOps installed copies are regenerated and checked by release audit and CI.

## TDD evidence

- `npm test -- scripts/install-cursor.test.ts` — RED: 5 expected failures for missing privacy defaults, unowned new managed destination overwrite, and skill/agent/state link attacks; GREEN: 21/21.
- `npm test -- schema/validate.test.ts schema/json-schema.test.ts scripts/package.test.ts` — RED on missing material limits, comparison request conditional, reference/strict-input parity, nested normalization, and JSON exports; GREEN after implementation. The package dry-run test required its existing integration-style timeout to be raised to 60 seconds without changing assertions.
- `npm test -- scripts/release-readiness.test.ts` — RED: 5 expected failures for the old injection fixture, missing dual-install checks, CI, and documentation; GREEN: 8/8.
- A self-review found standalone `validateComparisonResult` still bypassed deep evidence normalization. A new regression failed under `npm test -- schema/validate.test.ts`, then passed after routing comparisons through the shared normalizer.

## Final command/result matrix

| Command | Result |
|---|---|
| `npm ci` | PASS — 62 packages installed, 0 vulnerabilities; npm emitted the existing `allow-scripts` notice for `esbuild`. |
| `npm test` | PASS — 6 files, 90 tests. |
| `npm run build` | PASS — schema ESM/declaration build completed. |
| `npm run typecheck` | PASS. |
| `npm run schema:check` | PASS — generated files match source. |
| `npm run evals:validate` | PASS — 10 reproducible eval briefs. |
| `npm run docs:check` | PASS — 6 documentation files. |
| `npm run package:check` | PASS — 30 allowed files; all three JSON Schemas present. |
| Fresh explicit verification target: `node scripts/install-cursor.mjs <clean-target>` then `node scripts/install-cursor.mjs --check <clean-target>` | PASS — clean install matched source. |
| `npm pack --pack-destination <consumer>`; `npm init -y --prefix <consumer>`; `npm install --ignore-scripts --prefix <consumer> <tarball>`; plain Node ESM import/`import.meta.resolve` consumer | PASS — runtime import and 3 JSON Schema exports parsed and validated. |
| `node scripts/install-cursor.mjs --check .` | PASS — repository installation matches source. |
| `node scripts/install-cursor.mjs --check examples/demo-dashboard` | PASS — RelayOps installation matches source. |
| `npm ci` in `examples/demo-dashboard` | PASS — 69 packages installed, 0 vulnerabilities; same `esbuild` notice. |
| `npm run build` in `examples/demo-dashboard` | PASS — TypeScript and Vite build; 30 modules transformed. |
| `git diff --cached --check` | PASS before implementation commit. |
| `git diff -- examples/demo-dashboard/src` | Empty; release baseline hash test also passed. |

## Self-review

- Verdict: ship. No critical, medium, or missing-test finding remains.
- The diff exceeds 20 files because it intentionally contains three generated JSON Schemas and synchronized root/RelayOps installed copies; no scope outside installer, schema/package, fixtures, audit/CI, and required docs changed.
- Installer review covered refusal-before-overwrite, forced backup, nested link detection during directory backup, safe state paths, stale managed removal, legacy migration, and check-mode failure reporting.
- Schema review compared runtime and AJV outcomes for prior-review requirements, five-material limits, evidence shorthand, nested normalization, strict extra fields, and packed consumption. Cross-array disjointness/global regression-ID uniqueness remains explicitly documented as runtime-only and is enforced by `validateComparisonResult`.
- Prompt-injection validation proves the hostile text survives request normalization as evidence data while the artifact returns a non-`PASS` verdict.

## Concerns

- External release gates remain intentionally incomplete: name clearance, current-stable Cursor dogfood, remote/repository settings, branch protection, npm publication, and GitHub release.
- AJV emits its existing test-only warning that the `uri` format is ignored; runtime URL validation and all assertions pass.
- The environment rejected recursive cleanup commands for the two ignored verification directories under `.superpowers/sdd/final-fixes-*`; they contain only disposable clean-install/packed-consumer artifacts and are not staged or packaged.
