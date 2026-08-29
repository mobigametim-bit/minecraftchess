# Minecraftchess

HTML5 chess game with voxel/Minecraft-inspired pieces, a fast difficulty-selection flow, Chess.com-inspired interaction patterns, and persistent emerald rewards.

## Project status

Stage 0: technical foundation.

## Branch policy

- `main` contains only user-approved code.
- `develop` contains the current feature implementation and fixes.
- GitHub Actions are intentionally **not used** for automated tests.
- Verification is run locally before a feature is handed off for manual acceptance testing.

## Feature workflow

1. Discuss feature UX.
2. Approve UX.
3. Synchronize the approved contract in Notion and `docs/`.
4. Implement in `develop`.
5. Run local checks.
6. User tests the feature manually.
7. Fix issues in `develop`.
8. After explicit approval, merge accepted code into `main`.
9. Synchronize final status/changelog in Notion and GitHub docs.

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Local development

```bash
npm install
npm run dev
```

## Local verification

Core quality gate:

```bash
npm run verify
```

Full quality gate including Playwright browser smoke tests:

```bash
npm run verify:all
```

`npm run test:e2e` is also safe to invoke directly on a clean checkout: it builds the app before starting Playwright.

The first Playwright run may require installing the Chromium browser package locally with Playwright's standard browser-install command.

## Project documentation

- Notion hub: https://app.notion.com/p/3cb8c73f225281d2a518d6deeed2e923?pvs=204
- Architecture: `docs/architecture.md`
- Workflow and sync rules: `docs/workflow.md`
- Feature architecture: `docs/features/`
- Piece prompt registry: `docs/assets/piece-prompts.md`
- Notion/GitHub page map: `docs/notion-sync.md`
