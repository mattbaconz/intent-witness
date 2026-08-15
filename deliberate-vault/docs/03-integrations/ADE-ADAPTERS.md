---
title: "ADE Adapter Strategy"
project: Deliberate
status: pre-implementation
updated: 2026-08-14
tags: [deliberate, integrations, ade]
---

# ADE Adapter Strategy

## Goal

Deliberate should work across agentic development environments without maintaining a different product philosophy for each host.

The canonical protocol is host-neutral. Adapters translate it into host capabilities.

## Capability matrix

The exact product capabilities are volatile; verify current host docs before implementation. This vault records the August 14, 2026 research snapshot in [[SNAPSHOT-2026-08-14]].

| Host | Skills | Subagents | Browser / UI inspection | Hooks/gates | MCP/tool extensibility | V0 priority |
|---|---|---|---|---|---|---|
| Cursor | Yes | Yes | Native browser | Yes | Yes | P0 |
| Claude Code | Yes | Yes | Tool/browser workflows vary by setup | Yes | Yes | P1 |
| Codex | Yes | Yes | Tool/MCP dependent | Customization/MCP | Yes | P1 |
| Kiro | Yes | Yes/custom agents | Host dependent | Yes | Yes | P2 |
| Antigravity | Yes | Agent/subagent workflows | Strong browser automation path | Host dependent | Yes | P2 |
| OpenCode | Skills | Primary/subagents | Tool/MCP dependent | Host dependent | Yes | P2 |
| Windsurf/Devin | Skills/custom agents | Yes | Host dependent | Yes | Yes | P2/P3 |

## Adapter contract

Each adapter should provide as many of these operations as the host supports:

```text
install_skill()
install_reviewer()
collect_context()
capture_ui()
invoke_reviewer()
return_result_to_builder()
request_rereview()
optional_gate_completion()
```

## Capability degradation

### Full-native mode

Host supports skill + subagent + browser + hooks.

```text
Builder → native reviewer → native browser/evidence → revise → hook can gate
```

### Native-review mode

Skill + subagent, but browser is external.

```text
Builder → reviewer → Playwright/MCP evidence → revise
```

### Universal-tool mode

No useful native subagent.

```text
Builder → Deliberate MCP/CLI reviewer → structured output → builder
```

### Skill-only mode

Last resort for early compatibility.

The same agent follows a review protocol, preferably spawning a fresh task/context if the host can. This has weaker independence and should be labeled accordingly in benchmarks.

## Installation philosophy

Long-term desired UX:

```bash
npx deliberate install
```

Then detect supported environments and install thin adapters. Never overwrite existing user rules blindly. Show a diff/dry-run mode before mutating project configs.

## Cross-host file layout

Potential package:

```text
packages/
  core/
  reviewer/
  engine/
  cli/
adapters/
  cursor/
  claude-code/
  codex/
  kiro/
  antigravity/
  opencode/
  windsurf/
skill/
  SKILL.md
```

## Testing adapters

Every adapter must run the same conformance fixtures:

- reviewer receives product intent;
- reviewer is non-editing where host allows;
- structured result returns to builder;
- material finding causes revision;
- pass does not trigger unnecessary rewrite;
- review does not loop indefinitely;
- user can opt out/override.
