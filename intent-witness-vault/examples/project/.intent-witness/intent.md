# Product Intent — Example

## Product

**Name:** RelayOps  
**Domain:** Agent orchestration / operations  
**Target users:** developers operating multiple coding/automation agents

## Primary job

Understand what agents are doing right now and intervene quickly when execution fails or stalls.

## Primary objects

- agent
- run
- task/step
- incident/failure

## Critical states

- actively running
- waiting/blocking
- failed
- needs human input
- completed

## Desired traits

- operational
- trustworthy
- dense but legible
- fast
- technical without looking like a generic observability dashboard

## Explicit avoid

- metric-card-first hierarchy when live execution is the user’s primary job
- decorative AI orb/prompt theater in authenticated operations UI
- duplicating run history as generic “Recent Activity”

## Constraints

- responsive web
- keyboard-friendly
- failures must be distinguishable without color alone
