# Asset Audit — Iron Hunt
> Agent 1 output. Read every image file before writing this.
> Date: 2026-04-28

---

## Path correction

The master prompt references `research/dr4w-iron-hunt-prepro/assets/concept/`.
**That path does not exist.** The concept art is at `apps/dr4w-iron-hunt/assets/concept/`.
All entries below use the actual paths found on disk.

---

## Files found

### research/dr4w-iron-hunt-prepro/img/ (10 files)

| File | Dimensions | Format | What it depicts |
|------|-----------|--------|-----------------|
| `dr4w_1_OFFICIAL.jpg` | 1024×1024 | JPEG/RGB | Canonical Dr4w design — armored mech warrior head, brand logo art |
| `dr4w_1.jpg` | 1024×1024 | JPEG/RGB | Duplicate of the above, slightly different contrast |
| `dr4w_1.webp` | 1024×1024 | WebP/RGB | Same mech warrior, WebP format |
| `dr4w_2.webp` | 1024×1024 | WebP/RGB | **Pixel art version** of the mech warrior — same character, pixel rendering style |
| `dr4w_3.webp` | 1024×1024 | WebP/RGB | Monochrome mech warrior variant — no cyan, heavy silver/charcoal |
| `dr4w_4.webp` | 1024×1024 | WebP/RGB | Skeleton/reaper character — green hood, skull, gold chains, pixel art |
| `dr4w_5.webp` | 1024×1024 | WebP/RGB | Same skeleton with dual arm-mounted cannons |
| `dr4w_6.webp` | 1024×1024 | WebP/RGB | Dragon creature with wings and blasters |
| `dr4w_7.webp` | 1024×1024 | WebP/RGB | Skeleton/reaper variant, different pose |
| `dr4w_8.webp` | 1024×1024 | WebP/RGB | Three-headed dragon, gold/bronze scales |

### apps/dr4w-iron-hunt/assets/concept/ (6 files)

| File | Dimensions | Format | What it depicts |
|------|-----------|--------|-----------------|
| `dr4w-sprite-sheet-concept.png` | 384×128 | PNG/RGBA | 4-frame walk cycle of Dr4w — constructive pixel art |
| `dr4w-portrait-concept.png` | 384×384 | PNG/RGBA | Full-body Dr4w portrait, front-facing |
| `boss-lineup-concept.png` | 960×480 | PNG/RGBA | Three boss placeholders: SCRAP / WIDOW / BASTION |
| `crown-engine-concept.png` | 640×384 | PNG/RGBA | Crown Engine final boss concept |
| `hud-mock-concept.png` | 1280×720 | PNG/RGBA | Full HUD layout — HP bars, labels, arena mock |
| `title-screen-concept.png` | 1280×720 | PNG/RGBA | Title screen composition |

---

## List A — Assets ready to use directly in the game

**NONE.**

None of the 16 files are usable as game sprite sheets or tilesets without adaptation. Reasons:

| File | Why not directly usable |
|------|------------------------|
| `dr4w_1_OFFICIAL.jpg` | 1024×1024 brand logo art. Not a sprite sheet. Not pixel game resolution. Reference only. |
| `dr4w_2.webp` | Pixel art style but 1024×1024 logo format. The playable character is ~100px tall in this image. Cannot be sliced into 32×32 game frames. |
| `dr4w-sprite-sheet-concept.png` | 384×128, 4 frames at ~96×128px each (not 32×32). Concept reference, not a game-ready asset. Palette and structure are correct; dimensions are not. |
| `boss-lineup-concept.png` | 960×480 mockup. Individual boss sprites are ~80×80px within it — wrong grid, wrong dimensions for game use. |
| `hud-mock-concept.png` | 1280×720 Godot-engine HUD screenshot. Must be rebuilt as Phaser scene code. |
| `title-screen-concept.png` | 1280×720 concept. Must be rebuilt as Phaser scene code. |
| All others | Reference only (unrelated character concepts, monochrome variants, creatures). |

---

## List B — Assets that need to be created

| Game element | Priority | What's needed | Canvas/code placeholder? |
|--------------|----------|---------------|--------------------------|
| Player sprite sheet | **BLOCKER** | 192×256px PNG, 32×32 cells, 8 rows × ~6 cols, locked palette | YES — generate with Python/PIL |
| Stage 1 enemy (PatrolDrone) | **M1** | 32×240px PNG, 16×24 cells, 10 frames, charcoal + amber eye | YES — generate with Python/PIL |
| Stage 1 tileset | **M1** | 128×128px PNG, 16×16 cells, rust/orange palette | YES — generate with Python/PIL |
| Scrap Hound boss | **M1** | 192×40px PNG, 48×40 cells, rust-brown palette | YES — generate with Python/PIL |
| Stage 1 map (Tiled JSON) | **M1** | `maps/stage1.json` — Tiled format, 384×240 / 16px grid | Manually in Tiled or generated |
| SFX files | **M1** | 5–7 OGG files (shoot, hurt, land, boss_hit, victory) | Via jsfxr online generator |
| Stage 2 tileset | M2+ | 128×128px PNG, deep blue/violet palette | YES — code |
| Widow Relay boss | M2+ | 64×64 frames, slate + cyan palette | YES — code |
| Stage 3 tileset | M2+ | 128×128px PNG, cold gray + alert red | YES — code |
| Bastion Executor boss | M2+ | 48×80 frames, cold gray palette | YES — code |
| Stage 4 tileset | M2+ | 128×128px PNG, pure black + reactor red | YES — code |
| Crown Engine boss | M2+ | 96×96+ frames, black + red reactor | YES — code |
| Music tracks | M2+ | OGG per stage (intro, boss, stage, gameover) | Via BeepBox or similar |

---

## Reference usage (what the existing art informs)

| Art file | How to use it |
|----------|---------------|
| `dr4w_1_OFFICIAL.jpg` | Color reference for armor tones. The palette was extracted in the design session. |
| `dr4w_2.webp` | Pixel art visual target — the face/helmet structure visible at this scale informs how to draw the 32×32 version. |
| `dr4w-sprite-sheet-concept.png` | Animation structure: 4-frame walk cycle with visible leg stride. Use as frame-by-frame reference when drawing. |
| `dr4w-portrait-concept.png` | Body proportions — cyan head block, navy body, cyan shoulder pads. Directly defines the 32×32 layout. |
| `boss-lineup-concept.png` | Boss silhouettes: SCRAP (wide quadruped), WIDOW (T-body + X cables), BASTION (tall humanoid + red arm). |
| `hud-mock-concept.png` | HUD layout: vertical HP bars in corners, cyan player / coral boss, pixel font labels. Informs HUDScene. |
| `title-screen-concept.png` | Title screen composition and color blocking. Informs MenuScene. |

---

## Immediate actions for Agent 2

1. Generate player placeholder sprite sheet (BLOCKER) via Python script
2. Copy nothing — no files are ready to use as-is
3. Store all generated placeholders at `public/assets/sprites/` with `-placeholder` suffix

## Design notes

- All placeholder colors must use the locked palette: `#1E2A38` / `#40D0F0` / `#F01820`
- Placeholder files use `-placeholder` suffix so they are easy to find and replace
- The concept art directory should be symlinked or documented in asset-map.md so it
  is accessible during art production without copying
