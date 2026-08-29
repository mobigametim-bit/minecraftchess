# Development Workflow & Git/Notion Sync

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281bab375ec8e05ab4e74?pvs=204

## Branch model
- `main`: only user-approved code.
- `develop`: current implementation and fixes.

## Feature lifecycle
1. Discuss UX.
2. Record approved UX in Notion and GitHub docs.
3. Implement in `develop`.
4. Run local checks.
5. User tests manually.
6. Fix defects.
7. User explicitly approves.
8. Merge accepted `develop` state into `main`.
9. Update Notion status/changelog and GitHub docs.

## Synchronization rule
A feature is not complete when code and docs disagree. Any accepted change to UX, architecture, reward values, asset naming/prompts, or acceptance criteria must be updated in both systems in the same development cycle.

## Test policy
GitHub Actions are not used. Automated verification is local only.
