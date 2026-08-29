# 01 — Main Menu & Difficulty Selection

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528100935bdbe97b9d1a46?pvs=204

## UX contract
- First screen is difficulty selection.
- Emerald balance is visible.
- Selecting a difficulty immediately starts a match.
- No confirmation dialog, login, profile flow, or mode-selection complexity in MVP.

## Data contract
Difficulty configuration owns its label, AI-strength configuration, and win reward. Draw/loss/resignation reward equals one fifth of the win reward.

## Acceptance criteria
- Every difficulty is selectable by mouse/touch.
- Emerald balance persists across reloads.
- Selection transitions directly to the game screen.
