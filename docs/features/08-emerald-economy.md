# 08 — Emerald Economy & Persistence

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528186846ff16ec25a2e7c?pvs=204

## Reward rule
- Win: full configured difficulty reward.
- Draw/loss/resignation: one fifth of the configured win reward.

## Architecture
`economy/` owns reward calculation and wallet operations. `storage/` persists wallet state. UI only displays derived values/results.

## Safety
A completed game must not be rewardable twice through re-rendering, overlay reopening, refresh flows, or navigation.

## Acceptance criteria
- Balance persists after reload.
- Exactly one reward transaction is created per game.
- Menu balance updates after returning from a match.
