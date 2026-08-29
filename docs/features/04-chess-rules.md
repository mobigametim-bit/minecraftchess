# 04 — Complete Chess Rules

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281ada40ce2baaf8fd330?pvs=204

## Domain scope
- Legal movement for all pieces.
- Check/checkmate.
- Stalemate.
- Castling.
- En passant.
- Promotion.
- Draw-state handling supported by the chess domain/library.
- Resignation handled by game orchestration.

## Architecture
The chess domain owns position state, move legality, and terminal-state detection. Screens only consume derived state/events.

## Acceptance criteria
Known rule scenarios are covered by local unit tests.
