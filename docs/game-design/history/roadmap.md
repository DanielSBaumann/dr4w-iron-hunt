# Design & Development Roadmap — DR4W: Iron Hunt
> Role: Creative Lead / Project Lead
> Status: v1.0
> Last updated: 2026-04-29

---

## Why Design-First

Every hour spent coding a system that is later redesigned is wasted. Game design decisions create code architecture requirements:

- **Character abilities define what systems need to exist:** If Dr4w can dash, we need a dash state, a dash hitbox, a dash cooldown. If he cannot, we don't build any of that.
- **Boss mechanics define what the combat system must support:** Bastion Executor's shield deflection requires projectile reflection logic. Widow Relay's wall anchoring requires multi-surface physics. Knowing this before coding prevents retrofitting.
- **Stage design defines the camera, world, and hazard systems:** A vertical stage (Stage 2) requires a different camera setup than a horizontal one. A boss arena that never scrolls requires camera locking logic. Knowing this upfront means we build it right the first time.
- **Enemy behavior defines the AI interface:** Knowing all 6 enemy types before coding EnemyBase lets us design the state machine to fit all of them without refactoring.

The alternative — discover design requirements through coding — is how projects drift from a simple action platformer into "we need to add one more system" spirals.

**Design-first does not mean no coding.** It means the structure of the code mirrors a completed design rather than a speculative one.

---

## Phase 0 — Design Foundation (CURRENT)

**Goal:** Complete enough design definition that all subsequent coding is implementing known things, not discovering unknown ones.

### What needs to be defined

- [x] Character roster (main, minions, bosses) — `character-design.md`
- [x] World and stage themes — `world-design.md`
- [x] Inspiration extraction — `inspiration-analysis.md`
- [x] Cross-document consistency review — `design-iterations.md`
- [x] Design roadmap — this document

### What needs validation (before moving to Phase 1)

- [ ] **Boss pattern review:** Walk through each boss pattern mentally. Can a skilled player learn it? Is the tell window long enough? Do the phases escalate correctly? — *Requires: 1 session of design review*
- [ ] **Stage pacing review:** Does each stage's enemy distribution create the right difficulty curve? No dead zones, no impossible density spikes? — *Requires: rough playthrough on paper*
- [ ] **Palette validation:** Do the 4 stage palettes + player palette all coexist clearly? Can the player read Dr4w against every stage background? — *Requires: palette test render (can be done with placeholder sprites)*

### What is optional (defer to post-MVP)

- Precise tile layout per stage (can be designed as levels are built)
- Secondary NPC design (post-credits scene, radio voice — not gameplay-critical)
- Title screen composition final art (placeholder is sufficient for MVP)
- Sound design specifics (exact SFX descriptions — general direction is enough)

### Validation method

Run through the checklist above in a **design review session**: read each boss pattern aloud and simulate a fight mentally. This takes 45-60 minutes and catches issues that a document review misses.

---

## Phase 1 — Asset Foundation

**Goal:** Generate minimum viable placeholder sprites for all characters and environments. All sprites use locked palettes. None are final art.

### What needs to be created (ordered by blocking dependency)

| Asset | Blocks | Priority | Generator |
|-------|--------|----------|-----------|
| Player sprite sheet (192×256px) | All gameplay | CRITICAL | Python/PIL (already done — M0) |
| Stage 1 tileset (128×128px) | Stage 1 | HIGH | Python/PIL |
| PatrolDrone sprite (160×16px, 10 frames) | Stage 1 | HIGH | Python/PIL |
| Scrap Crawler sprite (240×16px, 10 frames) | Stage 1 | HIGH | Python/PIL |
| Sentry Turret sprite (single frame, 24×24px) | Stage 1 | HIGH | Python/PIL |
| Scrap Hound sprite (192×40px, 48×40 frames) | Milestone 1 boss | HIGH | Python/PIL |
| Stage 2 tileset (128×128px) | Stage 2 | MEDIUM | Python/PIL |
| Signal Sniper sprite (16×24px, 8 frames) | Stage 2 | MEDIUM | Python/PIL |
| Relay Wisp sprite (12×12px, 4 frames) | Stage 2 | MEDIUM | Python/PIL |
| Widow Relay sprite (64×64px, 8 frames) | Milestone 2 boss | MEDIUM | Python/PIL |
| Stage 3 tileset (128×128px) | Stage 3 | LOW | Python/PIL |
| Purge Sentinel sprite (24×32px, 8 frames) | Stage 3 | LOW | Python/PIL |
| Bastion Executor sprite (48×80px, 10 frames) | Milestone 3 boss | LOW | Python/PIL |
| Stage 4 tileset (128×128px) | Stage 4 | LOW | Python/PIL |
| Crown Engine sprite (96×96px core + arms) | Milestone 4 boss | LOW | Python/PIL |

**All generated with locked palettes. All `-placeholder` suffix. All replaceable without code changes.**

### What needs validation

- Each placeholder must be visually distinguishable from others at game resolution
- Player sprite must be readable against Stage 1 background (darkest background is Stage 4)
- Boss sprites must fill their arena presence without obscuring the whole screen

---

## Phase 2 — Stage Construction (Milestones 1-4)

**Goal:** Build each stage in Tiled, import into Phaser, implement enemies, implement boss. One stage per milestone.

### Stage 1 (Milestone 1)

**Sequence:**
1. Build `maps/stage1.json` in Tiled using Stage 1 tileset
2. Implement PatrolDrone behavior (patrol + detect + shoot)
3. Implement Sentry Turret behavior (detect + aim + burst)
4. Implement Scrap Crawler behavior (patrol + charge)
5. Implement Scrap Hound boss (Phase 1 + Phase 2 patterns)
6. Wire BossGate → boss fight → Stage 2 unlock
7. Implement Stage 1 SFX (5 sounds minimum)

**Design dependencies before coding begins:**
- Stage 1 enemy positions finalized (see world-design.md enemy distribution)
- Scrap Hound pattern sequence confirmed (see character-design.md)
- OQ-01 answered (checkpoint placement)

**Exit criteria:** Can complete Stage 1 start-to-finish: enter → fight enemies → reach boss → defeat Scrap Hound → stage clear screen.

### Stage 2 (Milestone 2)

**Sequence:**
1. Implement vertical scroll stage structure (camera system update)
2. Build `maps/stage2.json` (vertical layout)
3. Implement Signal Sniper + Relay Wisp behaviors
4. Implement Widow Relay boss (multi-surface movement + attacks)
5. Wire stage 2 progression

**Design dependencies before coding begins:**
- Vertical camera system design confirmed (OQ-07 from design-iterations.md about boss camera)
- Widow Relay arena platform layout finalized

### Stage 3 (Milestone 3)

**Sequence:**
1. Implement room transition system (doors between rooms)
2. Build 5-room Stage 3 layout
3. Implement Purge Sentinel behavior
4. Implement laser grid hazard system
5. Implement Bastion Executor boss (shield deflection + Phase 2)

**Design dependencies before coding begins:**
- OQ-03 resolved (purge beam decision)
- Room transition animation defined

### Stage 4 (Milestone 4)

**Sequence:**
1. Build Crown Engine chamber
2. Implement Crown Engine Phase A (rotating plates + gap targeting)
3. Implement Crown Engine Phase B (exposed core + aggressive patterns)
4. Implement Crown Engine Phase C (environmental attacks)
5. Implement victory sequence

**Design dependencies before coding begins:**
- OQ-04 resolved (Phase C duration)
- Victory sequence text finalized
- MVP vs full Crown Engine scope confirmed

---

## Phase 3 — Art Pass (Milestone 5)

**Goal:** Replace all `-placeholder` assets with final pixel art.

### Execution order for a single artist

1. Dr4w sprite sheet (blocking everything visually)
2. Stage 1 tileset (most played stage)
3. Scrap Hound boss (first boss = most viewed)
4. PatrolDrone, Sentry Turret, Scrap Crawler (Stage 1 enemies)
5. Stage 2 tileset
6. Widow Relay boss
7. Stage 2 enemies
8. Stage 3 tileset + enemies
9. Bastion Executor
10. Stage 4 tileset
11. Crown Engine

**Art production rules (from direcao-de-arte.md):**
- Legibility above detail
- Reutilize tiles aggressively
- Palette controlled per stage (no colors outside the stage palette for stage-specific elements)
- Silhouettes must be strong at thumbnail size
- Max 5 colors per character

### Validation

Before any final art goes into the game:
- [ ] Silhouette test: does it read at 16×16px?
- [ ] Palette test: does it use only the locked palette colors?
- [ ] Animation test: does each frame differ meaningfully from the last?
- [ ] Background test: does it read clearly against its stage's background?

---

## Phase 4 — Polish (Milestone 6)

**Goal:** Game feels good to play, not just works.

### Priority list

1. Screen shake on hit, boss death (highest ROI for feel)
2. Muzzle flash VFX (2-frame particle, confirms shots)
3. Hit spark VFX (enemy confirms hit receipt)
4. Boss death VFX (memorable)
5. Scene fade transitions (masks load times as intentional)
6. Pause menu completeness (controls reference)
7. Accessibility options (invert controls, if time permits)

### What gets polish last (or not at all in MVP)

- Intro sequence upgrade to Option B (text + background)
- Title screen final art
- Credits screen
- Online leaderboard
- Music tracks (BeepBox or final music — post-MVP)

---

## Phase 5 — Ship (Milestone 7)

### Pre-ship checklist

**Functionality:**
- [ ] Complete Stage 1 → 4 without crash
- [ ] Game Over → respawn < 1.5s
- [ ] All boss patterns work correctly
- [ ] Save system: intro_seen, stages_unlocked, last_stage_selected
- [ ] No physics tunneling (player cannot fall through floor)
- [ ] No softlock states (player cannot get trapped)

**Performance (web target):**
- [ ] Stable 60fps on Chrome/Firefox on mid-range hardware
- [ ] Initial load < 8 seconds on average connection
- [ ] No memory leaks (sustained play 20+ minutes)

**Build:**
- [ ] `npm run build` produces clean dist/
- [ ] `npm run build:pages` deploys to GitHub Pages correctly
- [ ] itch.io ZIP tested in browser

**Content:**
- [ ] All 4 stages have final art (or acceptable placeholder for demo)
- [ ] All SFX present (no silent hits or deaths)
- [ ] Music: minimum 1 track per stage + boss theme

---

## Design Completion Definition

Design is complete enough to resume gameplay development when:

1. All characters have defined: visual spec, palette, behavior loop, attack set, HP — **Done**
2. All stages have defined: palette, layout structure, enemy distribution, hazards — **Done**
3. Cross-document inconsistencies are resolved — **Done**
4. Open questions are either answered or deferred with clear ownership — **Done (4 OQs logged)**
5. Boss patterns have been mentally simulated and validated — **Pending (design review session)**
6. Stage pacing has been reviewed against difficulty curve — **Pending (paper review)**

**Current status:** 4/6 complete. Ready to generate placeholder sprites (Phase 1) while completing the two pending reviews.

---

## Prompt History — Session 001

**Date:** 2026-04-29
**Prompt intent:** Create design-first roadmap with clear phases, validation criteria, and ship checklist.
**Key decisions:**
- Design-first rationale documented (code structure mirrors completed design, not speculative design)
- 5-phase structure: Foundation → Asset → Stage Construction → Art → Ship
- Asset priority order by blocking dependency
- Design "complete enough to code" defined as 6 criteria (4/6 currently met)
- Two pending reviews identified before Phase 1 can close: boss pattern simulation + stage pacing
