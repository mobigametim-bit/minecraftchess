# 00 — Stage 0: Project Foundation

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281beacabfdb55cdbe60d?pvs=204

## Goal
Create the technical foundation before implementing player-facing features.

## Scope
- Create `develop` from approved `main`.
- Vite + React + TypeScript.
- Baseline app-state shell: `MAIN_MENU`, `GAME`, `RESULT`.
- ESLint, TypeScript checks, Vitest, Playwright local-only testing.
- Production build configuration.
- Base project folders and boundaries.
- README and AGENTS project rules.
- Explicitly no GitHub Actions for automated tests.
- Documentation mirror under `docs/`.

## Acceptance criteria
- `npm install` succeeds in a network-enabled development environment.
- `npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build` succeed locally.
- The application opens with the Stage 0 shell.
- No player-facing feature UX beyond placeholders is treated as approved implementation.
- Notion and GitHub documentation agree.
