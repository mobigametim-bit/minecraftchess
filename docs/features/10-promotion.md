# 10 — Promotion UX

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528196b898d83890a6326b?pvs=204

## UX contract
When a pawn reaches the promotion rank, show a compact chooser for queen, rook, bishop, and knight using the current visual set.

## Architecture
Promotion is a chess-domain move requiring a UI choice; UI provides the selected piece type and the domain executes the move.

## Acceptance criteria
All four legal promotion choices work for the player and game state remains valid.
