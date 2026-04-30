# Iron Hunt — Session Context
Last updated: 2026-04-28

## What this project is
2D action platformer, 4 stages, Mega Man-style, browser-first. Dr4w is a humanoid
combat droid who wakes in 2194 after a human-machine war and fights to shut down
IRON HUNT — the automated extermination protocol still hunting survivors.

## Stack
Phaser.js 3.90.0 + Vite 6.4.2 + JavaScript (ESM, no TypeScript)
Node 24.x | npm 11.x

## Run locally
```
cd apps/iron-hunt && npm run dev → http://localhost:3000
```

## Build
```
npm run build          → dist/  (itch.io ZIP or static host)
npm run build:pages    → dist/  (GitHub Pages, base = /iron-hunt/)
```

## Project structure
```
src/
  scenes/     Boot → Preload → Menu → Game + HUD/Pause/GameOver/Win
  entities/   Player, Enemy, Projectile
  systems/    InputSystem, CameraSystem
  levels/     Stage1–Stage4 data objects
  config.js   ALL constants. Change here first.
public/assets/
  sprites/    player/, enemies/, bosses/
  tiles/      per-stage tilesets
  maps/       Tiled JSON exports
  audio/      music/, sfx/
docs/
  CONTEXT.md  ← this file
  MILESTONES.md
  asset-audit.md
  asset-map.md
```

## Locked constants — do not change without updating this file

| Constant | Value |
|----------|-------|
| Resolution | 384×240 internal / 1152×720 display (3× scale) |
| Tile size | 16×16px |
| Player frame | 32×32px |
| Player hitbox | 18×28px |
| gravityY | 900 |
| jumpVelocity | -315 |
| walkSpeed | 110 |
| coyoteTime | 100ms |
| jumpBuffer | 100ms |

## Player palette

| Role | Hex |
|------|-----|
| Armor primary | `#1E2A38` |
| Armor shadow | `#141E2A` |
| Visor cyan | `#40D0F0` |
| Eyes red | `#F01820` |
| Specular | `#4A5E76` |

## Boss lineup

| Stage | Boss | Frame size | Palette |
|-------|------|-----------|---------|
| 1 | Scrap Hound | 48×40px | rust-brown |
| 2 | Widow Relay | 64×64px | slate + cyan |
| 3 | Bastion Executor | 48×80px | cold gray + alert red |
| 4 | Crown Engine | 96×96px+ | pure black + reactor red |

## Stage palettes

| Stage | Theme | BG | Platform | Accent |
|-------|-------|----|----------|--------|
| 1 | Ferro Velho Solar | `#2A1200` | `#584038` | `#D07028` |
| 2 | Torre de Sinais Mortos | `#050810` | `#202838` | `#8030C0` |
| 3 | Núcleo de Purga | `#0A0C10` | `#2A3038` | `#C02018` |
| 4 | Crown Engine | `#040408` | `#141420` | `#FF1018` |

## Lore source
`research/dr4w-iron-hunt-prepro/enredo-completo.md`
Art references: `research/dr4w-iron-hunt-prepro/img/` + `apps/dr4w-iron-hunt/assets/concept/`

## Current milestone
**Pre-Milestone — Bootstrap complete.**
All 8 scenes run. Config locked. Placeholder sprites generated.

## What was done last session
- Initialized Phaser 3 + Vite project at `apps/iron-hunt/`
- 8 scene files: all stub, no errors
- config.js with all locked constants
- Art audit: no files ready to use directly; all placeholders need generation
- Generated: `player-placeholder.png` (192×256, 32×32 cells), `tileset-stage1-placeholder.png`
- Docs: this file, MILESTONES.md, asset-audit.md, asset-map.md

## What to do next
Milestone 0 — confirm game loop + keyboard input.
Paste this prompt:

> "Read iron-hunt/docs/CONTEXT.md and iron-hunt/docs/MILESTONES.md.
> The Pre-Milestone is done. Start Milestone 0.
> Execute TASK-001 only: create src/systems/InputSystem.js that reads
> arrow keys, WASD, and Space, and logs the action to console on keydown.
> Stop and show me the result before TASK-002."
