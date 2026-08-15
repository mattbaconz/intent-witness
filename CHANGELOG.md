# Changelog

## Unreleased

[added]
- Deterministic RelayOps local dogfood protocol fixtures and a release-readiness checklist that separates automated evidence from external gates.

[changed]
- Review requests now require at least one captured evidence item before validation.
- Generated JSON Schemas now match runtime rules for comparison requests, material-finding limits, strict evidence inputs, and documented evidence-reference normalization.
- Canonical request, result, artifact, template, and reviewer output fields now use camelCase; runtime snake_case normalization remains backward-compatible input only.
- Durable `intent.md` is versionable by default while local evidence, reviews, backups, scratch data, and install metadata remain ignored.

[fixed]
- Hardened installer ownership and path containment across managed files, local state, backups, symlinks, and junctions.
- Published and exported all three generated JSON Schemas, and audited both canonical installed copies.
- Projected non-whitespace structural constraints into JSON Schema and removed accidental npm-init package metadata.

## 0.1.0-alpha.1

[added]
- Publishable Cursor alpha package, review contracts, deterministic schemas, and protocol eval inputs.

[changed]
- Installer now records managed-file hashes and preserves user-owned review state.

[fixed]
- Managed upgrades back up local modifications before replacement.
