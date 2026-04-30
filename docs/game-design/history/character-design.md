# Character Design — DR4W: Iron Hunt
> Role: Art Director / Character Designer
> Status: v1.0 — Design-first baseline
> Last updated: 2026-04-29

---

## Design Philosophy

Every character in Iron Hunt answers three questions immediately on screen:

1. **What is it?** (silhouette reads at 32px)
2. **What does it do?** (idle pose implies behavior)
3. **Is it a threat?** (color temperature signals danger level)

Characters use restricted palettes per faction. Machines aligned with IRON HUNT use cold desaturated tones; Dr4w uses the same base metal but with warm accents (cyan visor, red eyes) that visually mark him as a deviant — something that does not fit the machine world.

---

## Main Character — Dr4w

### Identity

| Field | Value |
|-------|-------|
| Type | Playable protagonist |
| Class | Humanoid infiltration droid |
| Year | Created late-war period, ~2185 |
| Status | Reactivated 2194, partially corrupted |
| Motivation | Fragmented. Protect the signal. Shut down the Hunt. |

### Personality

Cold and precise on the surface. Underneath: a machine that inherited human suffering through data corruption. He does not emote through dialogue — he emotes through hesitation in idle animations, through the pause before he fires, through the slight weight in his landing. The player reads his personality through movement, not text.

He is not a hero. He is an anomaly that chose a side.

### Visual Design

**Silhouette goal:** Compact asymmetric humanoid. Arm-cannon on the right arm is the silhouette's most distinctive feature — it makes him readable in 32 pixels.

**Frame:** 32×32px sprite sheet cell. Physics hitbox: 18×28px (centered, slight head clearance at top).

**Body proportions (within 32×32 cell):**
- Head block: 14×10px, centered slightly high
- Torso: 12×12px
- Legs: 12×10px
- Right arm cannon: extends 8px right of body (within cell)
- Left arm: tucked, 4×6px

**Palette (locked — do not deviate):**

| Role | Hex | Where |
|------|-----|-------|
| Armor primary | `#1E2A38` | Main body fill |
| Armor shadow | `#141E2A` | Left side shadow, underside |
| Visor cyan | `#40D0F0` | Visor band, cannon barrel tip |
| Eyes red | `#F01820` | Two eye pixels within visor |
| Specular | `#4A5E76` | Right shoulder plate highlight |

**No additional colors.** This palette must hold across all animations. Damage flash uses white (`#FFFFFF`). Death uses desaturated armor (`#303030`).

### Animation Specification

Sprite sheet layout: **192×256px**, 6 columns × 8 rows, 32×32 cells.

| Row | State | Frame count | Loop | Notes |
|-----|-------|-------------|------|-------|
| 0 | IDLE | 3 | Yes | Subtle chest rise. Eye flicker on frame 2. |
| 1 | RUN | 4 | Yes | Classic Mega Man cadence. Leg stride. Arm-cannon stable. |
| 2 | JUMP (rise) | 1 | No | Body tucks slightly, cannon aims forward-up. |
| 3 | FALL | 1 | No | Body extends, cannon aims forward-down. |
| 4 | SHOOT_IDLE | 2 | Yes | Arm-cannon extends 4px. Barrel glow frame 1. Return frame 2. |
| 5 | SHOOT_RUN | 4 | Yes | Run cycle with cannon extended. |
| 6 | HURT | 2 | No | Knockback lean. Visor flickers. |
| 7 | DEAD | 6 | No | Falls, crumples, visor dims to black. Frame 6: static. |

**Animation framerate:** 8fps for run/idle. 12fps for death. Hurt plays once then returns to idle.

### Abilities

| Ability | Description | Milestone |
|---------|-------------|-----------|
| Walk | 110px/s, instant stop | M0 |
| Jump | -315 velocity, 100ms coyote, 100ms buffer | M0 |
| Variable jump | Early release clamps to -80 vy | M0 |
| Shoot | Horizontal projectile, 200ms cooldown | M1 |
| I-frames | 1200ms invulnerability after hit, sprite blinks | M1 |
| Knockback | Short push-back on damage receipt | M1 |

**Not in scope for MVP:** dash, wall jump, charge shot, secondary weapon.

### Narrative Role

Dr4w is the player's avatar and the story's moral center. He speaks rarely, acts deliberately, and carries the weight of what he was built to do versus what he chose to do. His visual design must communicate autonomy — he looks slightly different from every other machine in the game, even when standing still.

---

## Common Enemies

Design rule: each minion has exactly **one behavior loop** and **one attack**. Complexity comes from combining them, not from individual enemy depth.

---

### Enemy 01 — Patrol Drone

| Field | Value |
|-------|-------|
| Stage | 1 (Ferro Velho Solar), also 2 |
| Type | Aerial patrol unit |
| HP | 2 hits |
| Size | 16×16px |
| Threat level | Low |

**Visual concept:**
Compact disc shape with two small rotors on top. Single amber sensor eye in center. Antenna stub. Color: charcoal (`#2A2A30`) with amber eye (`#E08020`). No decorative elements — it's disposable factory hardware.

**Palette:**

| Role | Hex |
|------|-----|
| Shell | `#2A2A30` |
| Rotor | `#3A3A42` |
| Sensor eye | `#E08020` |
| Eye glow | `#FFC040` |

**Behavior loop:**
1. Patrol left/right at 60px/s along a defined path
2. If player enters detection range (120px horizontal), pause 0.4s
3. Fire one downward-angled projectile
4. Resume patrol

**Attack:** Single slow projectile fired at 35° downward in player's direction. Projectile speed: 80px/s. One active at a time.

**Death:** Explosion flash (white → amber → off), 3 frames. No body remains.

**Design rationale:**
Low threat but forces the player to manage vertical space. Teaching tool for aerial awareness in Stage 1. Appears in groups of 2-3 to create pressure zones.

---

### Enemy 02 — Sentry Turret

| Field | Value |
|-------|-------|
| Stage | 1 and 3 |
| Type | Fixed emplacement |
| HP | 3 hits |
| Size | 16×16px (base) + 8×8px (barrel) |
| Threat level | Medium (positional) |

**Visual concept:**
Square armored base bolted to floor or ceiling. Rotating barrel that tracks player. Color matches stage platform tiles with a red warning light on the body. Ceiling-mounted variants are flipped.

**Palette:**

| Role | Hex |
|------|-----|
| Base | Matches stage platform color |
| Barrel | `#3A3A42` |
| Warning light | `#F01820` |
| Active light | `#FF4040` |

**Behavior loop:**
1. Idle: warning light pulses slowly
2. Player enters 160px horizontal range: barrel rotates toward player (0.5s)
3. Fire 3 shots at 0.25s intervals
4. Cooldown 1.5s, return to idle

**Cannot move.** Can be destroyed. When destroyed, leaves a broken base prop (static, no collision).

**Design rationale:**
Creates "no-standing-still" pressure. Forces the player to approach, shoot quickly, and move. Pairs well with Patrol Drones to layer aerial and ground threats.

---

### Enemy 03 — Scrap Crawler

| Field | Value |
|-------|-------|
| Stage | 1 |
| Type | Ground melee unit |
| HP | 2 hits |
| Size | 24×16px |
| Threat level | Low-medium |

**Visual concept:**
Low-profile crab-like body on four segmented legs. Compact, wide silhouette. Color: rust orange (`#8A3A10`) with dark gray joints. Single cracked optic. Moves with a scuttling animation (legs cycle fast).

**Palette:**

| Role | Hex |
|------|-----|
| Shell | `#8A3A10` |
| Joints | `#2A2020` |
| Optic | `#F01820` |

**Behavior loop:**
1. Patrol ground left/right at 50px/s
2. On player detection (80px range): charge at 140px/s
3. Charge ends at wall or after 2s, return to patrol

**No projectile.** Damage on contact only. 

**Design rationale:**
Ground pressure. Forces the player to shoot ahead or jump over. Simple to code (two states: patrol, charge), contributes to early-game pacing.

---

### Enemy 04 — Signal Sniper

| Field | Value |
|-------|-------|
| Stage | 2 (Torre de Sinais Mortos) |
| Type | Long-range stationary unit |
| HP | 2 hits |
| Size | 16×24px |
| Threat level | Medium-high |

**Visual concept:**
Tall, thin humanoid frame. No legs visible — magnetically anchored to structures. Long barrel arm aimed horizontally. Single targeting reticle light (red dot). Color: deep slate blue (`#202838`) with red targeting light (`#F01820`).

**Palette:**

| Role | Hex |
|------|-----|
| Body | `#202838` |
| Barrel | `#303848` |
| Targeting light | `#F01820` |
| Charge glow | `#FF8020` |

**Behavior loop:**
1. Idle: targeting light steady
2. Player enters line of sight: targeting light begins to pulse (0.8s telegraph)
3. Fire single high-speed projectile (240px/s, passes through air)
4. Cooldown 2s
5. Repeat

**Cannot move.** Long telegraph window (0.8s) makes it fair despite high projectile speed. The pulsing light is the player's cue to dodge.

**Design rationale:**
Teaches the player to read visual telegraphs. Forces vertical positioning (jumping to dodge horizontal shots). Introduced in Stage 2 alongside platforming challenges.

---

### Enemy 05 — Relay Wisp

| Field | Value |
|-------|-------|
| Stage | 2 and 4 (boss-summoned) |
| Type | Spawned minion |
| HP | 1 hit |
| Size | 12×12px |
| Threat level | Low (individually), high (in swarms) |

**Visual concept:**
Small orb of compressed energy. Flickering cyan-white core. No physical body — pure energy construct. Slow erratic flight path.

**Palette:**

| Role | Hex |
|------|-----|
| Core | `#40D0F0` |
| Outer glow | `#204870` |

**Behavior loop:**
1. Spawned at a fixed point (by Widow Relay or Crown Engine)
2. Move toward player position at spawn time (not tracking — predictable)
3. Explode on contact with player or projectile

**One-shot kill by player.** Threat comes from volume, not individual difficulty.

**Design rationale:**
Boss summons create rhythm breaks in boss fights. Also used in Stage 2 as area-denial hazards attached to antennas.

---

### Enemy 06 — Purge Sentinel

| Field | Value |
|-------|-------|
| Stage | 3 (Núcleo de Purga) |
| Type | Heavy ground unit |
| HP | 4 hits |
| Size | 24×32px |
| Threat level | High |

**Visual concept:**
Stocky bipedal machine. Wide shoulder pads, thick torso armor, compact head with no visible optic (replaced by a scanning slit). Carries a short-barrel cannon on right arm. Color: cold gray (`#2A3038`) with alert red scanner slit (`#C02018`).

**Palette:**

| Role | Hex |
|------|-----|
| Armor | `#2A3038` |
| Shadow | `#181E24` |
| Scanner | `#C02018` |
| Cannon | `#383A3E` |

**Behavior loop:**
1. Patrol slowly (40px/s)
2. On player detection: stop, charge cannon (0.6s)
3. Fire burst of 3 fast projectiles (horizontal, 160px/s each, 0.1s apart)
4. 1.0s cooldown, resume patrol

**Design rationale:**
Stage 3 requires a meatier enemy to signal escalation. Takes multiple hits, fires bursts instead of singles. Forces the player to sustain offense while managing incoming fire.

---

## Bosses

Design rule for bosses: each boss teaches a specific skill, has exactly 2 phases, and has a legible tell for every attack. Complexity comes from combining learned skills, not from introducing entirely new mechanics per attack.

---

### Boss 01 — Scrap Hound

| Field | Value |
|-------|-------|
| Stage | 1 — Ferro Velho Solar |
| Type | Quadruped hunter unit |
| HP | Phase 1: 8 bars / Phase 2: 8 bars (16 total) |
| Frame size | 48×40px |
| Threat level | Introductory |

**Visual concept:**
Four-legged machine built for pursuit. Low to the ground, wide stance. Armored skull-like face with two red sensor eyes. Tail is a whip antenna. Body texture is heavily rusted metal plates bolted over a mechanical skeleton. Moves with a galloping animation (4 frames).

**Palette:**

| Role | Hex |
|------|-----|
| Rust plates | `#7A3010` |
| Metal skeleton | `#3A2818` |
| Eyes | `#F01820` |
| Claw tips | `#8A6850` |
| Phase 2 cracked armor | `#4A1808` |

**Skill taught:** Reading charge rhythm and jump timing. This is the "tempo" boss.

**Phase 1 (100% → 40% HP):**

| Attack | Description | Tell | Duration |
|--------|-------------|------|----------|
| Charge | Runs across arena at 200px/s | Crouches for 0.5s, eyes flash | 1.5s |
| Leap | Jumps to player's X position | Rises on haunches | 0.8s arc |
| Shrapnel burst | Fires 4 metal fragments in spread | Head lowers, mouth opens | 3 projectiles 45° spread |

Pattern loop: Charge → Charge → Shrapnel → Leap → repeat

**Phase 2 (40% → 0% HP):**
Armor plates crack. Speed increases 30%. Charge becomes faster. Adds a floor-scrape attack that creates a low projectile (must be jumped over). Pattern becomes less predictable — 50% chance to repeat current attack once more.

**Arena:** Full-width horizontal space, 384px wide. Two low platforms at x=100 and x=280 (height: floor +32px). Scrap Hound cannot jump to platforms — player uses them to avoid charges.

**Defeat:** Scrap Hound collapses, legs buckle one by one, eyes go dark. Last frame: emits ping animation (signal wave expanding) before going fully static.

**Narrative beat:** "anomalia hostil confirmada" appears as a scan line across the screen as the signal propagates.

**Design notes:**
- This boss is deliberately readable. Every attack has a 0.5s+ tell.
- No cheap hits. Player should feel they lost because they misread, not because they had no time.
- Phase 2 adds speed, not new mechanics — escalation through intensity, not complexity.

---

### Boss 02 — Widow Relay

| Field | Value |
|-------|-------|
| Stage | 2 — Torre de Sinais Mortos |
| Type | Arachnid command and relay unit |
| HP | Phase 1: 10 bars / Phase 2: 10 bars |
| Frame size | 64×64px |
| Threat level | Intermediate |

**Visual concept:**
Eight-legged arachnid machine. Body is a flat hexagonal core with a central transmission dish (folded in combat, unfolds as an attack). Eight cable-legs grip walls and ceiling. Color: slate gray-blue with cyan energy lines running through the legs. Combat arena is vertical — she can occupy ceiling, walls, or floor.

**Palette:**

| Role | Hex |
|------|-----|
| Shell | `#303848` |
| Joint cables | `#1C2430` |
| Cyan energy lines | `#40D0F0` |
| Dish (active) | `#60E0FF` |
| Laser | `#40D0F0` + white core |

**Skill taught:** Spatial awareness, wall positioning, reading laser sweeps. This is the "space" boss.

**Phase 1 (100% → 40% HP):**

| Attack | Description | Tell | Notes |
|--------|-------------|------|-------|
| Drop strike | Falls from ceiling to player X position | Body contracts 0.4s, legs coil | Lands hard, creates shockwave 32px radius |
| Laser sweep | Fires horizontal beam, sweeps up 30° | Dish unfolds 0.6s | Jump or duck below ceiling to avoid |
| Wisp summon | Spawns 3 Relay Wisps from dish | Dish pulses blue 0.4s | Wisps travel toward spawn-time player position |
| Cable swing | Swings across arena on one cable | Grabs cable visually 0.3s | Hits player if they don't move |

Pattern: always begins ceiling-anchored. After each attack, reanchors to a new wall position. Player must track her location.

**Phase 2 (40% → 0% HP):**
Cable-legs partially break. Now moves twice as fast between positions. Laser sweeps in both directions (up and down). Drop strike lands faster (0.2s tell instead of 0.4s). Wisp swarms increase to 5.

**Arena:** Vertical room, 2× screen height. Platforms are structural ledges attached to walls. Widow Relay can walk on any surface. Player cannot.

**Defeat:** Legs buckle inward, dish cracks and sparks. Body falls to floor. As it collapses, tower sections begin to shake — environmental storytelling that the boss's network function is failing.

**Narrative beat:** Fractured voice lines: "unidade dr4w / perfil recuperado / funcao original: exterminio" — displayed as corrupted terminal text.

**Design notes:**
- Vertical arena is the key differentiator from Scrap Hound.
- Wall anchoring creates dynamic safe zones that shift each attack — player must continuously reposition.
- Laser sweep is the "signature move" — visually impressive, fair with the tell, memorable.

---

### Boss 03 — Bastion Executor

| Field | Value |
|-------|-------|
| Stage | 3 — Núcleo de Purga |
| Type | Elite humanoid guardian unit |
| HP | Phase 1: 12 bars / Phase 2: 12 bars |
| Frame size | 48×80px |
| Threat level | Advanced |

**Visual concept:**
Tall, heavily armored humanoid. Solid rectangular silhouette — built like a tank wearing armor. No visible face: flat armored head plate with a single horizontal scanner slit. Left arm is a shield plate (integrated, not held). Right arm is a compact high-cadence cannon. Deliberate, heavy movement — each step is a visual threat.

**Palette:**

| Role | Hex |
|------|-----|
| Armor primary | `#2A3038` |
| Armor shadow | `#181E24` |
| Scanner slit | `#C02018` |
| Cannon | `#383A3E` |
| Cannon charge | `#FF4020` |
| Phase 2 cracks | `#FF2010` (glowing through cracks) |

**Skill taught:** Patience, burst windows, shield management. This is the "discipline" boss.

**Phase 1 (100% → 40% HP):**

| Attack | Description | Tell | Defense window |
|--------|-------------|------|----------------|
| Cannon burst | Fires 5 shots rapid-fire horizontal | Cannon glows orange 0.8s | None — must dodge |
| Shield charge | Advances with shield forward at 120px/s | Raises shield arm 0.5s | Jump over, shoot from behind |
| Ground slam | Slams cannon fist down, shockwave travels 120px | Raises arm high 0.7s | Jump over shockwave |
| Reposition | Walks to new position — no attack | Turns body | Open damage window |

**Shield behavior:** While shield is raised (during shield charge), projectiles deflect. Player cannot damage from front. Must get behind or above.

Pattern: always starts with cannon burst. Then cycles attacks with repositioning moves between. Repositioning is the damage window — Bastion Executor only takes damage when moving between positions (shield lowered) or from behind at any time.

**Phase 2 (40% → 0% HP):**
Armor cracks, red energy bleeds through. Shield breaks — no more deflection but movement speed +50%. Cannon now fires in 3-shot bursts at 2× rate. Ground slam shockwave travels full arena width. Adds a new move: "purge beam" — charges for 1.2s then fires a sustained beam that sweeps horizontally (must jump). This is the most punishing attack in the game so far.

**Arena:** Wide corridor, 384px. Two mid-height platforms. Bastion Executor does not use platforms (too heavy). They are exclusively the player's advantage.

**Defeat:** Armor plate by plate shuts down (each plate dims independently). Scanner slit goes dark. Falls to one knee, then forward. Arena doors open revealing the passage to Crown Engine's chamber.

**Narrative beat:** His final active frame emits: "escolha e erro." One line. Then silence.

**Design notes:**
- This boss demands patience. Aggressive players who just spam shoot will die because the shield reflects projectiles and the burst attacks are fast.
- The shield/damage-window mechanic is the core teaching: wait for the opening, use it well.
- Phase 2 removes the shield (so aggressive players can now just shoot) but compensates with pure speed and aggression — the game meets the player's preferred style in phase 2.

---

### Boss 04 — Crown Engine (Final)

| Field | Value |
|-------|-------|
| Stage | 4 — Crown Engine Chamber |
| Type | Central machine consciousness |
| HP | Phase A: 15 / Phase B: 15 / Phase C: 8 |
| Frame size | 96×96px + environmental elements |
| Threat level | Culmination |

**Visual concept:**
Crown Engine is not a single character — it is a room. The central visible mass is a spherical reactor core (40×40px) suspended in the center of the arena by four massive cable-arms. Around it orbits a crown of transmission antennae (14 of them, forming the name visually). The arms and the core are what the player fights. The rest of the room — panels, lights, structures — is part of the boss's anatomy.

Color: pure black chassis (`#040408`) with reactor red energy core (`#FF1018`). Energy transmission lines are white-blue (`#C0D8FF`). The antennae emit a dull orange pulse during Phase A.

**Palette:**

| Role | Hex |
|------|-----|
| Core shell | `#040408` |
| Reactor glow | `#FF1018` |
| Core exposed | `#FF4028` |
| Cable arms | `#141420` |
| Energy lines | `#C0D8FF` |
| Antenna pulse | `#D07028` |

**Skill taught:** Everything the game has taught. Pattern synthesis, positional awareness, timing windows, priority targeting. This is the exam boss.

**Phase A — Protected (100% → 60% HP):**
Core is shielded by rotating plate segments. Player cannot damage the core directly.

| Attack | Description | Tell |
|--------|-------------|------|
| Suppression drones | Spawns 4 Relay Wisps in corners | Antennae pulse 0.5s |
| Sweep beam | Two cable-arms sweep floor-level beams in sync | Arms glow 0.8s before sweep |
| Defense plate | Plates orbit core — gap appears every 2s | Watch the rotation |
| Pulse blast | Core emits radial blast from center | Core brightens 1s |

**Goal of Phase A:** Shoot through the rotating plate gap to damage the core. Plates have a predictable rotation speed. This is a patience + positioning puzzle.

**Phase B — Exposed (60% → 20% HP):**
Plates shatter. Core is now fully visible and targetable. The fight becomes pure aggression — Crown Engine attacks faster to compensate.

| Attack | Description | Tell |
|--------|-------------|------|
| Targeted drone volley | 8 Wisps aimed at player's current position | Center glow 0.4s |
| Dual sweep | Both pairs of cable-arms sweep simultaneously | Arms cross 0.6s before |
| Missile barrage | 6 slow homing projectiles (slow track, can be outrun) | Antennae spin fast |
| Core slam | One cable-arm slams directly onto player's X | Arm raises 0.7s |

**Phase C — Collapse (20% → 0% HP):**
Crown Engine attempts to overload the installation. The room itself becomes hostile — floor tiles electrify in sequence, ceiling drops debris. The core pulses rapidly and fires a constant beam that rotates slowly around the arena. Player must dodge the environmental hazards while landing the final shots.

Duration of Phase C is designed to be 30-45 seconds maximum. This is the cinematic finish, not an endurance test.

**Defeat sequence:**
Core detonates in a white flash. Cable-arms go slack. Antennae go dark in sequence, one by one. Final frame: the transmission crown — the ring of antennae — falls to the floor in pieces. A radio frequency appears in the silence.

**Narrative beat:** The final text, decoded from radio static:
> "Aqui é Argos. Se alguém ainda estiver ouvindo... o sinal caiu."
> "Repito: o sinal caiu."
> "Ainda estamos aqui."

**Design notes:**
- Crown Engine is designed to feel like an event, not just a boss. The room integration (environmental attacks, phase-driven room changes) makes it feel unlike any previous fight.
- Phase A teaches that brute force doesn't work — you must read the system.
- Phase B rewards the skills built over three bosses — pure pattern execution.
- Phase C is intentionally short. The player is tired and should feel they're barely making it. The ending has to feel earned, not ground out.
- The core remains visually central at all times. Even during Phase A, the player can always see it pulsing behind the plates. This maintains the sense of "I know what I need to hit."

---

## Character Consistency Checklist

Before any character goes into production art:

- [ ] Silhouette reads at 16×16px thumbnail
- [ ] Palette is restricted (max 5 colors including background)
- [ ] Idle animation contains at least one living movement (loop)
- [ ] All attacks have a visual tell before they execute
- [ ] Character fits its role in stage difficulty curve
- [ ] Color temperature distinguishes it from player (cold = enemy, except Dr4w who is deliberately mixed)

---

## Prompt History — Session 001

**Date:** 2026-04-29
**Prompt intent:** Define complete character roster — main character, minions, bosses — with visual spec, behavior, palettes, and narrative role.
**Source material used:**
- `research/dr4w-iron-hunt-prepro/enredo-completo.md`
- `research/dr4w-iron-hunt-prepro/direcao-de-arte.md`
- `apps/dr4w-iron-hunt/GDD.md`
- `apps/iron-hunt/src/config.js` (locked constants)
- `apps/dr4w-iron-hunt/assets/concept/` (visual references)

**Key decisions made in this session:**
- 6 enemy types confirmed (Patrol Drone, Sentry Turret, Scrap Crawler, Signal Sniper, Relay Wisp, Purge Sentinel)
- Boss roster confirmed: Scrap Hound (48×40), Widow Relay (64×64), Bastion Executor (48×80), Crown Engine (96×96)
- Each boss assigned a single "skill taught" to create pedagogical progression
- Crown Engine designed as environmental boss (room integration) to differentiate final fight
- Bastion Executor shield/window mechanic confirmed as the intermediate complexity spike
- Dr4w palette locked to 5 colors (already established in config.js)
