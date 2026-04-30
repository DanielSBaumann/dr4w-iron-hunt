# Iron Hunt — Milestones

## Pre-Milestone — Bootstrap ✅ DONE
- [x] Phaser 3.90.0 + Vite 6.4.2 installed, `npm run dev` works
- [x] `src/config.js` with all locked constants
- [x] 8 scene stubs wired (Boot → Preload → Menu → Game + HUD/Pause/GameOver/Win)
- [x] Entity stubs: Player, Enemy, Projectile
- [x] System stubs: InputSystem, CameraSystem
- [x] Level data: Stage1–Stage4
- [x] `player-placeholder.png` — 192×256px, locked palette
- [x] `tileset-stage1-placeholder.png` — 128×128px, Stage 1 rust palette
- [x] Docs: CONTEXT.md, MILESTONES.md, asset-audit.md, asset-map.md

---

## Milestone 0 — Game loop + input confirmed ✅ DONE
**Goal:** Press arrow keys → player rect moves. Game loop runs.

- [x] TASK-001 `InputSystem.js` — arrow/WASD/Space/Z/X mapped to named actions, logs on keydown
- [x] TASK-002 `Player.js` — reads InputSystem, moves rect left/right, gravity applied by Arcade physics
- [x] TASK-003 Floor collision — StaticGroup platforms, player lands and does not fall through
- [x] TASK-004 Jump — Space/W/Up launches player, coyote time + jump buffer + variable jump height
- [x] TASK-005 `CameraSystem.js` — camera follows player with lerp, bounded to world (3× screen width)
- [x] TASK-006 Scene smoke test — ESC opens PauseScene, fall into gap → GameOverScene

**Exit criteria met:** Player walks and jumps on a solid floor. ESC opens pause. Fall into pit triggers Game Over.

---

## Milestone 1 — Stage 1 playable (placeholder art) ✅ DONE
**Goal:** Full stage 1 loop: enter, fight drones, reach boss gate, fight Scrap Hound, win.

- [x] Stage 1 code-based map — 2304px wide, 4 ground segments + 9 platforms
- [x] PatrolDrone enemy — patrol, shoot at player, take damage (2 HP), die
- [x] Scrap Hound boss — 2-phase FSM, health bar visible in HUD
- [x] Player shoot — Z/X fires projectile, hits enemies and boss
- [x] HP system — player loses HP on hit, i-frames (1200ms), Game Over at 0
- [x] Checkpoint — flag at mid-stage, respawn on pit fall
- [ ] SFX stubs — (deferred to Milestone 6 polish pass)
- [x] Win scene shows after Scrap Hound dies

**Exit criteria met:** Stage 1 completable start-to-finish.

---

## Milestone 2 — Stage 2 playable
**Goal:** Stage 2 complete loop with Widow Relay boss.

- [ ] Stage 2 Tiled map
- [ ] New enemy type (relay turret or equivalent)
- [ ] Widow Relay boss — 2-phase FSM
- [ ] Stage 2 audio (music stub + sfx)
- [ ] Menu shows stage 1 + 2 selectable after Stage 1 clear

---

## Milestone 3 — Stage 3 playable
**Goal:** Stage 3 complete loop with Bastion Executor boss.

- [ ] Stage 3 Tiled map
- [ ] New enemy type
- [ ] Bastion Executor boss — 3-phase FSM (tall humanoid)
- [ ] Stage 3 audio

---

## Milestone 4 — Stage 4 + Crown Engine (final boss)
**Goal:** Full game completable end-to-end.

- [ ] Stage 4 Tiled map (Crown Engine chamber)
- [ ] Crown Engine boss — 4-phase FSM, 96×96+ sprite
- [ ] Win ending — "IRON HUNT: OFFLINE" cutscene text
- [ ] Full stage select from menu

---

## Milestone 5 — Final art pass
**Goal:** Replace all `-placeholder` assets with final pixel art.

- [ ] `player.png` — final 192×256 sprite sheet, all 8 animation rows
- [ ] `patrol-drone.png`, `scrap-hound.png`, `widow-relay.png`, `bastion-executor.png`, `crown-engine.png`
- [ ] `tileset-stage1.png` through `tileset-stage4.png`
- [ ] All audio final (music per stage, full SFX set)
- [ ] HUD final (pixel font, health icons)

---

## Milestone 6 — Polish + juice
**Goal:** Game feels good to play.

- [ ] Screen shake on hit, boss death
- [ ] Particle effects (muzzle flash, sparks, boss explosion)
- [ ] Transition fade between scenes
- [ ] Pause menu polish (keybinds display)
- [ ] Accessibility: invert controls option

---

## Milestone 7 — Ship
**Goal:** Publicly available on itch.io and/or GitHub Pages.

- [ ] `npm run build` → clean dist/
- [ ] `npm run build:pages` → GitHub Pages deploy
- [ ] itch.io page live with ZIP upload
- [ ] README updated with play link
- [ ] Post-launch: gather feedback, patch critical bugs
