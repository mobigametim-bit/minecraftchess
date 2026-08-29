# 10 — Promotion UX

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528196b898d83890a6326b?pvs=204

## Playable Slice 1 UX contract
When a White pawn reaches the promotion rank, the board pauses and opens a compact modal chooser for:
- Queen;
- Rook;
- Bishop;
- Knight.

The selected piece type is passed back to the chess domain as part of the legal move; the UI does not alter board state directly.

Temporary standard chess glyphs are used until Feature 06 connects the voxel/Minecraft visual set.
