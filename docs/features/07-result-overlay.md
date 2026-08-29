# 07 — Result & Reward Overlay

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281eeafbcf872e4fa9e39?pvs=204

## Playable Slice 1 UX contract
A finished match keeps the final board visible and places a modal panel over it.

## States
Victory, defeat, draw, and resignation.

## Panel content
- Result title.
- Reason (mate, stalemate, draw reason, resignation).
- Emerald reward.
- Play again action with the same difficulty.
- Main menu action.

## Acceptance criteria
The result callback is guarded so a rendered terminal state cannot award the same game twice.
