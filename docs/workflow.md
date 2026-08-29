# Development Workflow & Git/Notion Sync

Canonical Notion page: https://app.notion.com/p/3cb8c73f225281bab375ec8e05ab4e74?pvs=204

## Branch model
- `main`: only user-approved code.
- `develop`: current implementation and fixes.

## Feature lifecycle
1. Discuss/define UX and record the contract in Notion + GitHub docs.
2. Implement in `develop`.
3. Run local checks.
4. Group technical subfeatures into a playable/visually testable checkpoint when needed.
5. Present only the playable checkpoint to the user; code and technical-only intermediate states are not acceptance deliverables.
6. User tests the playable checkpoint manually.
7. Fix defects in `develop`.
8. User explicitly approves.
9. Merge the accepted `develop` state into `main`.
10. Update Notion status/changelog and GitHub docs.

## Synchronization rule
A feature is not complete when code and docs disagree. Any accepted change to UX, architecture, reward values, asset naming/prompts, status, or acceptance criteria must be updated in both systems in the same development cycle.

## Test policy
GitHub Actions are not used. Automated verification is local only.
