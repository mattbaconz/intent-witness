---
title: "Security and Privacy"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, security, privacy]
---

# Security and Privacy

## V0 posture

Local-first. Deliberate should not require uploading source code or screenshots to a Deliberate-owned service.

The host model/ADE may already send context to its provider; Deliberate must not imply that this is local inference unless it actually is.

## Threats

### Sensitive UI content
Screenshots may include:

- customer names;
- emails;
- API keys accidentally rendered;
- proprietary dashboards;
- internal metrics;
- private messages.

Capture should be scoped to required routes/states and support redaction/exclusion later.

### Prompt injection from rendered content
A page may display untrusted text telling the reviewer to ignore instructions. Treat rendered page text as **data**, not control instructions.

### Malicious repository instructions
ADE environments may load multiple instruction files. Deliberate should document precedence and avoid executing arbitrary repo scripts during review without the host's normal permission model.

### Browser side effects
Review should prefer non-destructive interactions. Do not click destructive actions, submit payments, send emails, delete data, or mutate production state merely to inspect a UI.

### Hook denial loops
Future gate mode could repeatedly block agent completion. Include max attempts/fallback and user override.

### Supply-chain risk
Keep dependencies minimal; pin/lock versions; prefer well-known browser/schema libraries if/when engine is built.

## Data retention

V0 design memory/reviews are local project files. Users should be able to exclude screenshots/reviews from git with `.gitignore` recommendations.

Potential defaults:

```text
.deliberate/reviews/**/screenshots/
.deliberate/cache/
```

while keeping durable intent/decisions versionable.

## SaaS future

If hosted review is added, require:

- explicit opt-in;
- clear artifact retention periods;
- encryption in transit/at rest;
- tenant isolation;
- deletion controls;
- enterprise no-training commitments where applicable;
- documented model/provider subprocessors;
- redaction and route exclusion.

See [[SAAS-LATER]].
