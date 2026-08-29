# 00 — Stage 0: Project Foundation

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281beacabfdb55cdbe60d?pvs=204

## Goal
Create the technical foundation before implementing player-facing features.

## Scope
- `develop` branch from approved `main`.
- Vite + React + TypeScript.
- Baseline app-state shell: `MAIN_MENU`, `GAME`, `RESULT`.
- ESLint, TypeScript checks, Vitest, Playwright local-only testing.
- Production build configuration.
- Base project folders and boundaries.
- README and AGENTS project rules.
- Explicitly no GitHub Actions for automated tests.
- Documentation mirror under `docs/`.

## Status
**Accepted and merged to `main` on 2026-08-29.**

Approved merge commit: `6c5f95a6d50d28a939e2383c9b047ec3e957f5af`.

The development branch was fast-forwarded to the accepted merge commit before Playable Slice 1 started.
