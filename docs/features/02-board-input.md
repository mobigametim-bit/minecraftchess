# 02 — Chess Board & Input

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281a89a0ada756922d193?pvs=204

## Playable Slice 1 UX contract
- Standard 8×8 board, player as White.
- Click/tap a player piece to select it.
- Legal destinations are highlighted.
- Quiet moves use destination dots; captures use a target ring.
- Selected square and last move are highlighted.
- Clicking another White piece changes selection.
- Input is locked while the AI move is being processed.
- Board coordinates are visible directly on edge squares.

## Architecture
The board renders chess-domain state. `chess.js` owns legality; the React board cannot manufacture illegal moves.

## Acceptance checkpoint
Mouse/touch selection, normal moves, captures, castling, en passant, and promotion paths are tested through the playable slice.
