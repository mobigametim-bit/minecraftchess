# 08 — Emerald Economy & Persistence

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528186846ff16ec25a2e7c?pvs=204

## Reward rule
- Win: full configured difficulty reward.
- Draw/loss/resignation: exactly one fifth of the configured win reward.

## Playable Slice 1 values
`5/1`, `10/2`, `20/4`, `40/8`, `80/16` from Новичок through Эксперт.

## Architecture
- `economy/` owns reward calculation.
- `storage/` owns persistence.
- MVP storage uses namespaced `localStorage` behind the storage module.
- React displays balances but does not calculate reward policy.

## Safety
The App-level finish lock prevents repeated reward application from duplicate terminal notifications or re-renders.
