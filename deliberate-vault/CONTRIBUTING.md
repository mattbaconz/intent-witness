---
title: "Contributing to Deliberate"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, contributing, oss]
---

# Contributing to Deliberate

Deliberate welcomes contributions, especially **failure cases** that make the reviewer more honest.

Read [[AGENTS]] and [[CONTRIBUTION-MODEL]] before contributing reviewer behavior.

## Best first contributions

- Add an eval fixture where Deliberate gives a false positive.
- Add an eval fixture where Deliberate misses a deep IA/interaction issue.
- Improve an ADE adapter without changing core review philosophy.
- Improve structured-output validation.
- Add a reproducible benchmark case with clear licensing.
- Improve docs where an agent could misinterpret an invariant.

## Reviewer-rule PR requirements

A rule/guideline change should include:

1. the failure it addresses;
2. at least one triggering fixture;
3. at least one counterexample that must remain acceptable;
4. expected problem depth;
5. explanation of why the rule is not merely personal taste.

## Development principle

Prefer tests/fixtures that say:

> “This metric-card pattern is wrong **because the primary live workflow is hidden**.”

not:

> “Metric cards are ugly.”

## Research and competitor attribution

Do not copy prose, prompt content, or code from competitors merely because it is open source. Respect each project's license and notices. Competitive research should be summarized in original language and sources recorded in `research/SOURCES.md`.

## Documentation style

- Markdown first.
- Obsidian wiki-links for internal references.
- YAML frontmatter on durable docs.
- Clear source-of-truth ownership.
- Agent-readable headings and explicit invariants.
- Avoid unnecessary metaphors in technical specs.

## Pull request checklist

- [ ] Scope matches current phase.
- [ ] Tests/fixtures added where behavior changed.
- [ ] No universal aesthetic rule introduced without strong justification.
- [ ] No material finding can exist without evidence.
- [ ] Documentation updated.
- [ ] Decision log updated for architectural/product decisions.
- [ ] Open question recorded if intentionally unresolved.
- [ ] Benchmark claims are reproducible.
