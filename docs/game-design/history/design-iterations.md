# Design Iterations — DR4W: Iron Hunt
> Role: Art Director / Creative Lead
> Status: v1.0 — First pass review
> Last updated: 2026-04-29

---

## Purpose of This Document

Design never lands perfect on the first pass. This document tracks:
- Inconsistencies found between character design, world design, and existing code
- Refinements applied or proposed
- Open questions that require a decision
- What was changed and why

This is the living record of design quality control. Every session should add to it.

---

## Iteration 01 — Cross-Document Consistency Review

*Session 2026-04-29. Reviewer: Creative Lead.*

### Issue 01 — Stage count inconsistency

**Found in:** GDD.md says "3 fases + 1 boss final." CONTEXT.md, config.js, and the lore document all show 4 stages. The boss final (Crown Engine) is Stage 4, not a separate entity.

**Resolution:** **4 stages** is the correct count. Stage 4 is Crown Engine's chamber — it is a stage with a prologue corridor and a boss, not just a boss fight appended to Stage 3. GDD.md predates the full lore document. The lore document (enredo-completo.md) takes precedence.

**Action:** Design documents written in this session all use 4-stage structure. GDD.md update is tracked but not a blocker.

**Status:** Resolved.

---

### Issue 02 — Resolution mismatch between Godot prototype and Phaser project

**Found in:** GDD.md and direcao-de-arte.md both specify 320×180px resolution. The Phaser iron-hunt project uses 384×240px.

**Resolution:** **384×240px is the locked resolution for the Phaser project.** The 320×180 spec belongs to the Godot prototype (apps/dr4w-iron-hunt), which is being superseded. The Phaser project was intentionally specified at 384×240 (confirmed in CONTEXT.md and config.js) because:
- 384×240 scales cleanly to 1152×720 at 3× (which fills a 720p display better)
- 384 is divisible by 16 (24 tiles wide), giving more horizontal stage space than 320

**Action:** All world-design.md layout specs use 384×240 viewport. All character-design.md frame specs are unchanged (32×32 player, 16×16 tiles — both work in either resolution).

**Status:** Resolved. 384×240 is authoritative.

---

### Issue 03 — Player sprite size discrepancy

**Found in:** direcao-de-arte.md suggests "corpo jogavel em torno de 24×32 ou 24×40." Config.js and character-design.md both use 32×32 cell with 18×28 hitbox.

**Resolution:** **32×32 cell with 18×28 hitbox is locked.** The art direction document (direcao-de-arte.md) was written before the Phaser project constants were locked. The locked config.js values take precedence because:
- 32×32 is the standard Mega Man cell size
- 18×28 hitbox within a 32×32 cell gives head clearance and side clearance — consistent with Mega Man Classic proportions
- Changing this now would require rebuilding the placeholder sprite sheet

The "24×32 or 24×40" suggestion was pre-lock and should be considered superseded.

**Status:** Resolved. 32×32/18×28 is authoritative.

---

### Issue 04 — Missing enemy for Stage 2 ground section

**Found in:** World-design Stage 2 specifies vertical traversal with Signal Snipers and Relay Wisps. No ground-crawling enemy is specified for Stage 2, even though the stage has floor sections at the tower's base and on elevated ledges.

**Resolution:** Stage 2 is primarily aerial traversal. Ground enemies would contradict the stage identity (vertical ascent, wind, cables). The Stage 2 enemy set is intentionally aerial-only:
- Signal Snipers (anchored to structures, effectively stationary)
- Relay Wisps (aerial, summoned)
- Patrol Drones (reappear from Stage 1, used as bridge enemy)

The absence of ground crawlers reinforces the "you are climbing, not marching" feel of Stage 2. If a ledge needs an enemy, use a Patrol Drone or a Signal Sniper anchored above the ledge.

**Status:** Resolved. Stage 2 is aerial-enemy-only by design.

---

### Issue 05 — Patrol Drone size inconsistency

**Found in:** character-design.md specifies Patrol Drone at 16×16px. asset-audit.md specifies placeholder size as "32×240px PNG, 16×24 cells, 10 frames" which implies 16×24px per frame.

**Resolution:** **16×16px is correct.** The asset-audit.md placeholder size was an early estimate that predates the character-design document. The drone is a compact disc shape — 16×16px is the right frame, with the visual centered and the rotor sticking 2-3px above the 16px height (handled within the frame, not adding to hitbox).

**Action:** When generating the PatrolDrone placeholder sprite, use 16×16px frames. A 10-frame sheet would be 160×16px total.

**Status:** Resolved.

---

### Issue 06 — Boss 1 arena size

**Found in:** character-design.md specifies Scrap Hound arena as 384px wide (full screen width). World-design.md Stage 1 specifies world width of ~1600px with horizontal scrolling. These are compatible — the boss arena is a separate fixed-width room.

**Resolution:** No conflict. Stage 1 is 1600px wide with horizontal scrolling. At the end of the stage, the player enters a boss room that is exactly 384×192px (no scrolling, camera is locked during boss fight). This is identical to Mega Man Classic's boss room structure.

**Status:** Confirmed consistent. No action needed.

---

### Issue 07 — Widow Relay arena height

**Found in:** character-design.md specifies Widow Relay boss arena as 480px tall (2.5× screen height) with camera scrolling with boss position. This requires a vertically scrolling camera during the boss fight — an additional implementation requirement not noted in MILESTONES.md.

**Resolution:** Keep the vertical boss arena. The vertical scroll during boss fight is a distinct feature of Stage 2 that reinforces its identity. **Implementation note:** Boss camera in Stage 2 should follow the arena's center of action (Widow Relay's position), not the player, to ensure the boss is always visible. Player scrolls into view of boss.

**Action:** Add to MILESTONES.md under Milestone 2: "Boss camera — vertical arena scroll locks on boss position, player always visible."

**Status:** Design confirmed. Implementation note logged.

---

### Issue 08 — Crown Engine as "environmental boss" vs sprite boss

**Found in:** character-design.md describes Crown Engine as room-integrated (the room is the boss). This is a substantially different implementation than the other three bosses (which are single physics sprites). Crown Engine requires:
- Multiple independently animated components (cable arms, plates, core)
- Environmental attacks (floor tiles, ceiling panels)
- Phase-driven room state changes

**Resolution:** Crown Engine is deliberately more complex to implement — it is the final boss and should feel categorically different. However, for the Phaser prototype (Milestone 4), Crown Engine can be simplified:
- **MVP version:** Core sprite (96×96) + 2 cable arms (separate sprites) + floor hazard zones
- **Full version:** All components above + Phase C environmental integration

The MVP version is functionally complete but less cinematically spectacular. The full version is the design target.

**Action:** Milestone 4 scope definition should specify MVP vs full Crown Engine and plan accordingly.

**Status:** Design intent confirmed. Implementation has tiered scope.

---

## Refinements Applied

### Refinement 01 — Boss pedagogy system confirmed

Each boss now has an explicit "skill taught" assignment:
- Scrap Hound: tempo and rhythm reading
- Widow Relay: spatial awareness and repositioning
- Bastion Executor: patience and damage windows
- Crown Engine: synthesis of all previous skills

This assignment should influence the boss's attack design. Attacks should primarily test the assigned skill. A boss should not teach a skill before it's been introduced in the stage preceding it. Scrap Hound's attacks should feel like a test of "can you read timing" — which Stage 1 teaches through hazard timing. Widow Relay's spatial requirements should feel like a test of "can you track and reposition" — which Stage 2 teaches through vertical traversal.

### Refinement 02 — Enemy introduction curve

Enemies should be introduced in safe conditions before appearing in combat mix:

| Enemy | Safe introduction | Combat introduction |
|-------|-----------------|-------------------|
| Patrol Drone | Stage 1, entry zone, alone | Stage 1, mid-zone, paired |
| Sentry Turret | Stage 1, mid-zone, separated | Stage 1, late-zone, with drones |
| Scrap Crawler | Stage 1, mid-zone, one at a time | Stage 1, late-zone, two simultaneous |
| Signal Sniper | Stage 2, lower section, easy position | Stage 2, mid-section, awkward platform |
| Relay Wisp | Stage 2, lower section, 2 wisps | Stage 2, mid-section, 4 wisps in tight space |
| Purge Sentinel | Stage 3, Room 2, solo | Stage 3, Room 3, paired |

This follows Celeste's design principle: introduce each challenge in isolation, then combine.

### Refinement 03 — Color temperature as narrative device

Confirmed design decision: **cold color = hostile machine, warm color = human presence or Dr4w's anomaly.**

| Element | Color temp | Meaning |
|---------|-----------|---------|
| All enemies | Cold (blues, grays) | Machine faction, aligned with IRON HUNT |
| IRON HUNT protocol elements | Cold + dark | The system |
| Dr4w's visor | Warm cyan | Warmest thing in the enemy faction — the anomaly |
| Dr4w's eyes | Red | The only "warm" color in the enemy faction — marks him as different |
| Human traces (graffiti, fires) | Warm (oranges, yellows) | Humanity |
| Stage 1 accent | Warm orange | Stage has human traces |
| Stage 2 accent | Violet/cyan | Machine dominated, signal-oriented |
| Stage 3 accent | Alert red | Danger, core of the protocol |
| Stage 4 accent | Reactor red | The source, the center, the end |

This system means the player's eye will instinctively read Dr4w as "different from the machines" even without being told. His mixed palette (cold armor + warm accents) makes him visually legible as the protagonist.

### Refinement 04 — Bastion Executor shield timing

The shield deflection mechanic (player projectiles bounce off when shield is raised) requires careful timing design to avoid frustration:

- Shield is raised **only during shield charge attack**
- Shield lowers immediately when charge ends
- Shield charge has a 0.5s tell (raising the arm) — during which the shield is NOT yet active
- This means: if player fires quickly at the tell, the shot may connect before shield activates

This creates a micro-game: anticipate the shield raise → either fire before it's up, or wait for it to lower. Both strategies are valid. Neither feels unfair.

---

## Open Questions

These require a decision before the corresponding milestone begins.

### OQ-01 — Checkpoint system per stage

**Question:** Should stages have a midpoint checkpoint, or should checkpoints only reset at the boss gate (die to boss → respawn at boss gate, not at mid-stage)?

**Options:**
- A: Midpoint checkpoint per stage + boss gate checkpoint
- B: Boss gate checkpoint only (no mid-stage saves)
- C: No checkpoint — die anywhere → restart whole stage

**Recommendation:** Option A for Stage 1 (new player friendly), Option B for Stages 2-4 (stages are shorter once known). But this needs player testing to validate. Default to A for all stages in MVP, tune down to B if playtesting shows it's too forgiving.

**Decision needed by:** Milestone 1

---

### OQ-02 — Intro sequence scope

**Question:** The lore document specifies a full intro sequence with pixelated images of ruins, drones, and fires, followed by the radio transmission and Dr4w waking up. How cinematic should this be?

**Options:**
- A: Text only (black screen, white text, sound effects) — fastest to implement
- B: Text + single static background image per beat — moderate effort
- C: Text + animated pixel art scenes — significant art effort

**Recommendation:** Option A for MVP, upgrade to B post-launch with real art assets. The text-only approach was used by early Mega Man games and works when the writing is tight.

**Decision needed by:** Before Milestone 7 (ship)

---

### OQ-03 — Bastion Executor Phase 2 purge beam

**Question:** The "purge beam" attack (1.2s charge, then sweeps horizontally) is the most complex attack in the pre-final-boss roster. Is it too much for the game's difficulty target?

**Options:**
- A: Keep as designed (1.2s charge → horizontal sweep) — highest difficulty moment
- B: Reduce to a straight beam (no sweep) — easier to dodge, easier to implement
- C: Remove from Phase 2 (replace with faster burst + ground slam) — no new mechanic in Phase 2

**Recommendation:** Keep Option A as the design target. Difficulty is the point — this is the final test before Crown Engine. However, playtest with Option B initially and see if it feels too easy. Upgrade to A if it does.

**Decision needed by:** Milestone 3

---

### OQ-04 — Crown Engine Phase C duration

**Question:** Phase C is designed to be 30-45 seconds — the cinematic finale. Too short? Too long? How do we tune this before building it?

**Recommendation:** Crown Engine's HP in Phase C (8 bars) combined with a sustained rate of fire should land around 30s. If playtesting shows it's too short and feels anticlimactic, add 4 more bars. If it drags, reduce. The art direction is: Phase C should feel *barely survivable* — a sprint to the finish, not a slog. Player should feel they barely made it, win or lose.

**Decision needed by:** Milestone 4

---

## Inconsistencies Cleared (Log)

| # | Issue | Resolution | Date |
|---|-------|-----------|------|
| 01 | Stage count (3 vs 4) | 4 stages confirmed | 2026-04-29 |
| 02 | Resolution (320×180 vs 384×240) | 384×240 confirmed | 2026-04-29 |
| 03 | Player sprite size | 32×32 cell / 18×28 hitbox confirmed | 2026-04-29 |
| 04 | Stage 2 missing ground enemy | Aerial-only design confirmed | 2026-04-29 |
| 05 | Patrol Drone size | 16×16px confirmed | 2026-04-29 |
| 06 | Boss arena vs world scroll | Boss rooms are separate fixed-width | 2026-04-29 |
| 07 | Widow Relay vertical arena scroll | Camera follows boss, implementation noted | 2026-04-29 |
| 08 | Crown Engine as environmental boss | Tiered scope (MVP vs full) confirmed | 2026-04-29 |

---

## Prompt History — Session 001

**Date:** 2026-04-29
**Prompt intent:** Cross-document consistency review, identify design conflicts, apply refinements, log open questions.
**Issues found:** 8
**Issues resolved:** 8
**Refinements applied:** 4
**Open questions logged:** 4
**Key decisions:**
- 4-stage structure confirmed
- 384×240 Phaser resolution confirmed as authoritative
- Boss pedagogy system assigned
- Enemy introduction curve mapped
- Color temperature system formalized
- Bastion Executor shield timing detailed
