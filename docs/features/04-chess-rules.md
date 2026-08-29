# 04 — Complete Chess Rules

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281ada40ce2baaf8fd330?pvs=204

## Playable Slice 1 domain scope
`chess.js` is the legality and terminal-state source of truth for:
- all standard piece movement;
- check and checkmate;
- stalemate;
- castling;
- en passant;
- promotion;
- threefold repetition;
- insufficient material;
- other library-recognized draw states.

Resignation is handled by game orchestration rather than by mutating the chess position.

## Architecture
Screens consume legal moves and terminal state; they do not reimplement chess rules.
