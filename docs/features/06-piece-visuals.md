# 06 — Minecraft/Voxel Chess Piece Visuals

Canonical Notion page: https://app.notion.com/p/3cb8c73f22528168b908d12c98fef4c6?pvs=204

## Scope
Replace temporary chess visuals with a consistent voxel character set.

## Player-side concept
Villager pawn, horse-rider knight, cleric-villager bishop, iron-golem rook, Alex-like queen role, Steve-like king role.

## Enemy-side concept
Zombie pawn, skeleton-horseman knight, witch bishop, ravager rook, evoker queen role, wither-skeleton monarch king role.

## Technical source standard
- 1024×1024 PNG RGBA.
- Transparent background.
- Consistent tactical 3/4 camera, scale, lighting, and silhouette readability.
- Runtime may use optimized derivatives while preserving source assets.

## IP boundary
The mapping must remain data-driven so all branded/inspired content can be replaced without gameplay-code changes.

See `docs/assets/piece-prompts.md` for the prompt registry.
