# Architecture & Technical Conventions

Canonical Notion page: https://app.notion.com/p/3cb8c73f2252815e9977cde807d4fb13?pvs=204

## Stack
- Vite
- React
- TypeScript
- HTML5/CSS
- `chess.js` for chess-state/rules integration
- AI isolated from UI; Web Worker when search/engine computation is introduced
- `localStorage` behind a storage service for MVP persistence

## Module boundaries
- `src/app/` — application state and composition
- `src/screens/` — complete screens
- `src/components/` — reusable UI
- `src/chess/` — board domain, rules, game orchestration, AI adapters
- `src/economy/` — rewards/wallet
- `src/storage/` — persistence abstraction
- `src/styles/` — design tokens/global styles
- `tests/` — local browser-level checks

## Rules
1. UI does not calculate chess legality.
2. Economy does not depend on React components.
3. Persistence is accessed through an adapter/service.
4. Feature UX must be approved before feature implementation.
5. No proprietary Chess.com assets or branding are copied.
6. Visual-piece mappings are data-driven and replaceable.
