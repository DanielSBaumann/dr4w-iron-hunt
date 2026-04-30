# Asset Map — Iron Hunt
> All files moved or generated for the project.

## Generated placeholders

| Source | Destination | Notes |
|--------|-------------|-------|
| Python/PIL script | `public/assets/sprites/player/player-placeholder.png` | 192×256px, 32×32 cells, 8 rows, locked palette |
| Python/PIL script | `public/assets/tiles/tileset-stage1-placeholder.png` | 128×128px, 16×16 cells, Stage 1 rust palette |

## Copied from research (concept art — reference only)

No files were copied into the project. All concept art remains at its original location:
- `research/dr4w-iron-hunt-prepro/img/` — brand identity references
- `apps/dr4w-iron-hunt/assets/concept/` — gameplay concept art

These are NOT in `public/assets/` because they are reference material, not game assets.
They are used by the sprite artist when drawing final pixel art.

## Naming convention

| Pattern | Meaning |
|---------|---------|
| `*-placeholder.png` | Generated in code — will be replaced by real art |
| `player.png` | Final art — replaces player-placeholder.png in Milestone 5 |
| `boss-*.png` | Boss sprite sheet |
| `tileset-stage*.png` | Per-stage tileset |
| `map-stage*.json` | Tiled export — stage layout |

## Still needed (see asset-audit.md for priority)

- `sprites/enemies/patrol-drone-placeholder.png` (M1)
- `sprites/bosses/scrap-hound-placeholder.png` (M1)
- `maps/stage1.json` (Tiled export, M3)
- `audio/sfx/*.ogg` (5–7 files, M1)
- `audio/music/*.ogg` (per stage, M2+)
