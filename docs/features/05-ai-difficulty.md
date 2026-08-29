# 05 — AI & Difficulty

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528172b37feda5211ca6a3?pvs=204

## Goal
Provide visibly different difficulty levels without changing chess rules.

## Architecture
- UI communicates with an `AIController`.
- Computation runs outside the render path; use a Web Worker when engine/search is integrated.
- Difficulty is configuration rather than duplicated implementations.

## UX
AI should use a short bounded response delay where useful so moves do not feel unnaturally instantaneous.

## Acceptance criteria
- Every configured difficulty can finish a full game.
- UI remains responsive during AI calculation.
- Difficulty behavior is configurable and testable.
