# 02 — Chess Board & Input

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281a89a0ada756922d193?pvs=204

## UX contract
- Standard 8×8 board.
- Player controls white in MVP.
- Click/tap a piece to select it.
- Legal destinations are highlighted.
- Click/tap a legal destination to move.
- Selected square and last move are visually distinct.
- Input is locked while AI is making its move.

## Architecture
The board is a view of game state. Legal move calculation comes from the chess domain layer.

## Acceptance criteria
- Illegal moves cannot be performed.
- Captures and normal moves update state consistently.
- Mouse and touch interaction both work.
