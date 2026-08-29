# Minecraftchess

HTML5 chess game with voxel/Minecraft-inspired pieces, a fast difficulty-selection flow, Chess.com-inspired interaction patterns, and persistent emerald rewards.

## Project status

Stage 0 is accepted in `main`. `develop` contains the next playable vertical slice: difficulty selection → full chess match against AI → result/reward overlay → rematch/menu.

## Branch policy

- `main` contains only user-approved playable/stable code.
- `develop` contains the current playable slice implementation and fixes.
- GitHub Actions are intentionally **not used** for automated tests.
- Verification is local before a playable checkpoint is handed off.

## Acceptance workflow

1. Define/synchronize UX contracts.
2. Implement in `develop`.
3. Run local checks.
4. Group technical subfeatures until the user has a meaningful playable checkpoint.
5. Present the playable checkpoint, not code/technical-only states.
6. Fix manual-test findings in `develop`.
7. Merge to `main` only after explicit user approval.
8. Synchronize final status in Notion and GitHub docs.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Local development

```bash
npm install
npm run dev
```

## Local verification

```bash
npm run verify
npm run verify:all
```

`npm run test:e2e` builds before Playwright, so it is safe to invoke on a clean checkout after dependencies/browser binaries are installed.

## Project documentation

- Notion hub: https://app.notion.com/p/3cb8c73f225281d2a518d6deeed2e923?pvs=204
- Architecture: `docs/architecture.md`
- Workflow and sync rules: `docs/workflow.md`
- Feature architecture: `docs/features/`
- Piece prompt registry: `docs/assets/piece-prompts.md`
- Notion/GitHub page map: `docs/notion-sync.md`
