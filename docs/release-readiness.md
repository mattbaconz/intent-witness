# Release readiness

This checklist distinguishes automated-green evidence from external release gates. Green local checks demonstrate repository contracts only; they do not establish legal, account, hosting, marketplace, or real Cursor behavior.

## Automated green

Run the non-interactive verification matrix from the repository root before a release candidate:

```bash
npm ci
npm test
npm run typecheck
npm run schema:check
npm run evals:validate
npm run docs:check
npm run package:check
node scripts/install-cursor.mjs --check
node scripts/install-cursor.mjs --check examples/demo-dashboard
```

Also clean-install and check the package in a temporary project, then run `npm ci` and `npm run build` from `examples/demo-dashboard`.

The automated audit verifies the canonical reviewer remains read-only, requests contain captured evidence, both repository-root and RelayOps installed copies match canonical source, fixture review artifacts validate, prompt injection remains untrusted evidence, RelayOps source matches the task baseline, and pack contents exclude project-private, generated, and local-state material.

RelayOps dogfood files in `evals/fixtures/relayops-dogfood/` are deterministic protocol fixtures. They are not proof of actual Cursor behavior or benchmark results.

## External gates — not completed by this repository

- [ ] Professional name clearance has been completed through the appropriate process.
- [ ] Real current-stable Cursor dogfood has been performed and independently documented.
- [ ] Public/private repo creation and intended visibility have been explicitly authorized and completed.
- [ ] Branch protection is configured on the intended remote default branch.
- [ ] npm publication is authorized and completed from the intended account.
- [ ] A GitHub release is authorized and created with the intended tag and notes.

Do not mark an external gate complete based on local test output, fixture artifacts, or this document.
