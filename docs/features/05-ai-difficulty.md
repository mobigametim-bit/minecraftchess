# 05 — AI & Difficulty

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528172b37feda5211ca6a3?pvs=204

## Playable Slice 1 architecture
- AI runs in a Web Worker so search cannot block the React render thread.
- AI uses material evaluation plus alpha-beta search.
- Difficulty changes search depth and how often the AI deliberately selects a lower-ranked candidate.
- If the worker fails, the game falls back to a legal random move instead of becoming stuck.

## Difficulty behavior
- Новичок: random legal play.
- Легко: shallow evaluation with substantial variation.
- Средне: two-ply-style configured search with some variation.
- Сложно: same bounded depth but very low variation.
- Эксперт: deepest current local search and no deliberate variation.

## UX
A short bounded thinking delay makes the computer response readable and avoids an unnaturally instantaneous feel.
