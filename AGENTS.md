# AGENTS.md — Minecraftchess

## Product
Minecraftchess is a small HTML5 chess game. Keep the UX intentionally simple: difficulty selection → match → result/reward overlay.

## Required development workflow
- `main` is approved/stable only.
- `develop` is the active development branch.
- Define and synchronize feature UX before implementation.
- Technical subfeatures may be grouped into a playable vertical slice when separate review would produce non-playable checkpoints.
- Present only playable/visually testable checkpoints to the user for acceptance; do not surface code or technical-only intermediate states unless explicitly requested.
- User performs manual acceptance testing before a playable slice is merged to `main`.

## GitHub Actions policy
Do not add or use GitHub Actions for automated testing or CI in this repository. Do not create `.github/workflows/*` for tests/builds. Run checks locally.

## Documentation synchronization
Notion and GitHub documentation must stay synchronized. Changes to architecture, UX contracts, rewards, asset filenames/prompts, status, or acceptance criteria must be reflected in both Notion and the corresponding repository document.

## Architecture boundaries
- `src/app/`: app composition/state.
- `src/screens/`: complete screens.
- `src/components/`: reusable presentation components.
- `src/chess/`: chess domain, rules integration, game orchestration, AI adapters.
- `src/economy/`: emerald wallet and reward rules.
- `src/storage/`: persistence abstraction.
- `src/styles/`: global styles/design tokens.
- `tests/`: local Playwright tests.

UI components must not become the source of truth for chess legality, economy calculations, or persistence.

## Quality gate before handoff
Run locally where dependencies/browser binaries are available:
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
- relevant Playwright smoke/regression tests

## Visual/IP boundary
Use familiar online-chess UX patterns as inspiration, but do not copy Chess.com proprietary assets/branding. Keep visual piece integration data-driven so branded/inspired voxel assets can be replaced without changing chess gameplay code.
