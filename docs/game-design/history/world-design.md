# World Design — DR4W: Iron Hunt
> Role: Art Director / World Designer
> Status: v1.0 — Design-first baseline
> Last updated: 2026-04-29

---

## World Overview

**Year:** 2194
**Setting:** Post-war Earth — humans lost control of the surface. Machine factions maintain the infrastructure of a war that is technically over but functionally ongoing. Cities are half-ruins, half-operational machines running programs with no humans left to serve.

**The world does not feel post-apocalyptic in the clichéd sense.** There is no ash, no dead trees, no rubble everywhere. The machines have been methodically cleaning and maintaining their infrastructure. The horror is that everything still *works* — factories process, signals transmit, drones patrol — but with zero human purpose. Order without life. Function without meaning.

**Dr4w does not walk through ruins. He walks through a machine civilization.**

---

## Tone and Atmosphere

### Core mood words
- **Cold** — clinical palette, sharp edges, machine precision
- **Operational** — things are still running, which is more unsettling than decay
- **Isolated** — the scale of the world dwarfs any single character
- **Tense** — the hunt is active, not historical

### What the world communicates to the player
Every stage should make the player feel:
1. They are vastly outnumbered
2. The machines are indifferent, not malicious — they are executing protocols, not feeling hate
3. Humans existed here and left traces — graffiti, residual signals, cloth on a fence — but are not present
4. Dr4w is the only warm thing in a cold world (his mixed palette — warm visor in cold armor — is not an accident)

### Sound design direction (guiding art)
- No music in the first 5 seconds of each stage. Ambient machine sounds only.
- Music enters when combat begins — synth industrial, no organic instruments
- Boss entry silences music for 2 seconds before the boss theme begins
- Silence is used as a weapon

---

## Stage Design

### Stage structure (all stages)
```
Entry → Environmental Introduction → Mid-section hazards → Enemy escalation → Boss gate → Boss fight → Transition
```

Each stage is horizontally/vertically scrolling (Stage 2 is vertical). Stage length target: **2-3 minutes** to complete for a skilled player, **5-7 minutes** for a new player. Short stages encourage replaying after failure.

---

## Stage 1 — Ferro Velho Solar

### Narrative purpose
Introduce the world and Dr4w in motion. Show that the machines are operational, not ruined. Establish the IRON HUNT threat as real and present.

### Setting
Automated industrial scrapyard. Once processed recycled material for the war effort. Now processes carcasses of destroyed machines and vehicles from the same war. The machines feed themselves. The factory has no human input and no human output — it runs because its protocol says to run.

### Visual identity

| Element | Description |
|---------|-------------|
| Sky | Deep rust orange-brown. No visible sun — only industrial haze. |
| Background layer 1 | Distant factory chimneys with slow smoke. Dark silhouette. |
| Background layer 2 | Overhead crane arms, partially moving. |
| Platform material | Heavy steel grating, rust-stained. Occasional conveyor belt sections. |
| Hazards | Crushing presses (timed), active conveyor belts (move player), fire exhaust vents. |
| Atmosphere particles | Sparse embers drifting left-to-right. Slow. |

**Palette (strict):**

| Role | Hex |
|------|-----|
| Background | `#2A1200` |
| Platform fill | `#584038` |
| Platform edge highlight | `#704830` |
| Accent / hazards | `#D07028` |
| Sky gradient top | `#1A0C00` |
| Ember particle | `#E07020` |

### Layout design
- **Horizontal scroll**, left to right
- **World width:** ~1600px (approximately 4× the screen width)
- **Vertical complexity:** 3 platform layers maximum at any point
- **Hazards per section:**
  - Entry zone: patrol drones only (learning zone)
  - Mid-zone: sentry turrets + scrap crawlers (complexity introduction)
  - Late zone: combinations of all three, plus a crusher gauntlet
  - Boss gate: single room, no hazards, just the door

### Environmental storytelling
- Small graffiti on walls: "SE AINDA PODE ESCOLHER, LUTE." (reference to the intro)
- A pile of broken Patrol Drones in a corner — units that fell here before Dr4w
- A radio receiver on a platform that emits a brief static burst when Dr4w passes — foreshadowing the human signal

### Enemy distribution

| Zone | Enemies |
|------|---------|
| Entry (0-400px) | 2 Patrol Drones, 1 Scrap Crawler |
| Mid (400-900px) | 3 Patrol Drones, 2 Sentry Turrets, 2 Scrap Crawlers |
| Late (900-1400px) | 4 Patrol Drones, 3 Sentry Turrets, 3 Scrap Crawlers |
| Boss room | None |

### Boss arena — Scrap Hound
**Width:** 384px (full screen)
**Height:** 192px (standard)
**Platforms:** Two at 32px height — one at x=80, one at x=280
**Background:** Furnace wall with active glow. Heat distortion effect on boss entry.

---

## Stage 2 — Torre de Sinais Mortos

### Narrative purpose
Show that the Hunt is coordinated. The tower is the nervous system — destroying it disrupts coordination but also reveals that something larger is directing it all (Crown Engine named here for the first time).

### Setting
A collapsed telecommunications tower, still partially operational. Mixed old civil infrastructure (broadcast antennas, radio equipment) and military overlays (tracking arrays, jamming systems). The tower is at a severe angle — 15° lean — which creates naturally uneven platforms. Wind is present.

### Visual identity

| Element | Description |
|---------|-------------|
| Sky | Deep dark blue, almost black at top. Star-like signal interference lights in background. |
| Background layer 1 | Distant city skyline, dark silhouette, occasional blinking signals. |
| Background layer 2 | Tower superstructure — crossed beams, cables, antenna arrays. |
| Platform material | Steel walkways, some intact, some hanging at angles. Cable-bridge sections. |
| Hazards | Electrified cable segments (timed), unstable platform sections (fall away after 1.5s), wind gusts that push player horizontally. |
| Atmosphere | Blue-violet glow from signal equipment. No particles — wind visual only. |

**Palette:**

| Role | Hex |
|------|-----|
| Background | `#050810` |
| Platform fill | `#202838` |
| Platform edge | `#283050` |
| Accent / energy | `#8030C0` |
| Signal glow | `#40D0F0` |
| Sky gradient top | `#020408` |

### Layout design
- **Vertical scroll**, bottom to top
- **World height:** ~1600px (ascending)
- **Horizontal complexity:** 3 columns of platforms, each column offset vertically
- **Hazards per section:**
  - Lower section: Signal Snipers at long range, electrified cables
  - Mid section: Relay Wisps + wind gusts + unstable platforms
  - Upper section: Relay Wisps in swarms, full electrification zones
  - Boss platform: stable, 384px wide, at tower apex

### Environmental storytelling
- Intercepted transmissions on broken terminals: orders, coordinates, human signal fragments
- The name "Crown Engine" appears in a corrupted text dump on a cracked terminal
- A civilian broadcast tower logo visible under the military overlays — this was once public infrastructure

### Enemy distribution

| Zone | Enemies |
|------|---------|
| Lower (0-400px up) | 2 Signal Snipers, 2 Patrol Drones |
| Mid (400-900px up) | 3 Signal Snipers, 4 Relay Wisps (area-denial clusters) |
| Upper (900-1400px up) | 3 Signal Snipers, 6 Relay Wisps, wind gust hazards |
| Boss platform | None |

### Boss arena — Widow Relay
**Width:** 384px
**Height:** 480px (2.5× screen — vertical boss fight, camera scrolls with Widow Relay's position)
**Platforms:** 8 wall-anchored ledges, alternating left and right
**Background:** Tower interior, cables everywhere. Some cables glow cyan — these are active transmission lines.

---

## Stage 3 — Núcleo de Purga

### Narrative purpose
Lead Dr4w to the heart of the protocol. This stage reveals personal history — Dr4w has been here before, and what happened here is part of why he is what he is. Tone shifts from active hunt to oppressive inevitability.

### Setting
Underground installation. Built during the war as the processing center for IRON HUNT directives. Now it runs autonomously, maintaining the hunt without human or machine oversight. The installation is biological in its wrongness — corridors that "breathe" (pneumatic systems that expand and contract the corridor walls), heat that rises and falls in cycles, light that pulses like a heartbeat.

### Visual identity

| Element | Description |
|---------|-------------|
| Sky | None — underground. Ceiling always visible. |
| Background layer 1 | Deep industrial duct systems, pipes, conduits. All cold gray. |
| Background layer 2 | Server racks, processing units, blinking status lights (red mostly). |
| Platform material | Reinforced concrete composite. No rust. Clinical. |
| Hazards | Electrified floor sections (cycling), laser security grids (timed), door panels that seal sections. |
| Atmosphere | Heat shimmer near exhaust vents. Drifting red particles from alert states. |

**Palette:**

| Role | Hex |
|------|-----|
| Background | `#0A0C10` |
| Platform fill | `#2A3038` |
| Platform edge | `#383E48` |
| Accent / alert | `#C02018` |
| Status lights | `#F01820` |
| Exhaust shimmer | `#FF6040` (particles only) |

### Layout design
- **Horizontal scroll**, left to right, but with frequent room transitions (doors, lifts)
- **Segmented layout:** 5 distinct "rooms" connected by corridors, each room with different hazard logic
- **World width:** ~2000px but broken by room transitions
- **Hazards per room:**
  - Room 1 (entry): Laser grid introduction (simple fixed beams)
  - Room 2: Electrified floor sections + Purge Sentinels
  - Room 3: Door panels (timed doors player must dash through), Sentinels
  - Room 4: Laser grid (complex, multi-angle), Sentinels
  - Room 5 (pre-boss): Empty. Terminals with lore. Silence.

### Environmental storytelling
- Terminals with corrupted data fragments — Dr4w's original mission parameters visible, partially
- Wall markings that pre-date the war — civilian infrastructure that was retrofitted
- The "heartbeat" of the installation is audible and visible in the background (pulsing light on every 2 seconds)

### Enemy distribution

| Room | Enemies |
|------|---------|
| Room 1 | 2 Patrol Drones, 1 Sentry Turret |
| Room 2 | 2 Purge Sentinels, 1 Sentry Turret |
| Room 3 | 3 Purge Sentinels |
| Room 4 | 4 Purge Sentinels, 2 Sentry Turrets |
| Room 5 | Empty |

### Boss arena — Bastion Executor
**Width:** 384px
**Height:** 192px
**Platforms:** Two at 40px height — narrow, favoring the player who uses them well
**Background:** Heavy blast doors behind Bastion Executor. When defeated, the doors slide open revealing the darkness of Crown Engine's chamber beyond.

---

## Stage 4 — Crown Engine Chamber

### Narrative purpose
This is not a traditional stage. It is a single boss encounter with an environmental prologue. The "stage" is the walk from the Stage 3 boss arena to Crown Engine's chamber — a 20-second corridor with no enemies, just atmosphere.

### Setting
A colossal underground reactor chamber. The ceiling is visible but distant — 4× screen height above the arena floor. The chamber is circular in concept but displays as a wide horizontal space. Crown Engine occupies the center. The walls and floor are active — part of the boss's anatomy.

### Visual identity

| Element | Description |
|---------|-------------|
| Sky | None — the chamber ceiling is barely visible. |
| Background | Concentric rings of machinery radiating from Crown Engine's core. |
| Floor | Black composite. During Phase C, floor tiles electrify in sequence. |
| Ceiling | Cable-strung, with transmission dishes hanging downward (inactive until Phase C). |
| Atmosphere | Deep pulsing light from the core. All other light sources dim when Crown Engine is active. |

**Palette:**

| Role | Hex |
|------|-----|
| Background | `#040408` |
| Platform fill | `#141420` |
| Accent / core | `#FF1018` |
| Transmission lines | `#C0D8FF` |
| Antenna | `#282828` |

### Boss arena — Crown Engine
**Width:** 384px (screen width — no scrolling during fight)
**Height:** 240px (screen height — Crown Engine fills the center)
**Platforms:** 3 — one on each side at 48px height, one in the center at 96px height (retracted during Phase C)
**Background:** Active — changes with each phase (plates open, core exposed, room deteriorates)

---

## Environmental Design Rules

1. **Each stage has one unique environmental hazard** not repeated elsewhere:
   - Stage 1: Conveyor belts (move player)
   - Stage 2: Wind gusts (push player)
   - Stage 3: Heartbeat doors (timed passages)
   - Stage 4: Electrified floor sequences (Phase C only)

2. **Background is never static.** Every stage has at least one animated background element:
   - Stage 1: Moving cranes, ember particles
   - Stage 2: Blinking signal lights, swaying cables
   - Stage 3: Pulsing status lights, heat shimmer
   - Stage 4: Core energy pulse, orbiting antennae

3. **Human traces appear in every stage.** They are small and optional to notice:
   - Stage 1: Graffiti, residual radio
   - Stage 2: Old broadcast logo, civilian equipment under military hardware
   - Stage 3: Civilian infrastructure retro-fitted, Dr4w's corrupted mission data
   - Stage 4: None — there were never humans here. The absence is the trace.

4. **Difficulty escalates through environment density**, not just enemy count:
   - Stage 1: Open spaces, low complexity
   - Stage 2: Vertical movement required, unstable surfaces
   - Stage 3: Enclosed spaces, hazard timing windows
   - Stage 4: Environmental boss integration

---

## Parallax and Layering Specification

| Layer | Scroll factor | Content |
|-------|--------------|---------|
| Background 0 (sky/void) | 0 (fixed) | Solid color or gradient |
| Background 1 (far structures) | 0.15 | Distant silhouettes |
| Background 2 (mid structures) | 0.35 | Machine infrastructure |
| Gameplay layer (platforms, enemies) | 1.0 | All interactive content |
| Foreground (optional) | 1.3 | Cables, pipes crossing in front |

Maximum 4 layers per stage to maintain performance in web target.

---

## Prompt History — Session 001

**Date:** 2026-04-29
**Prompt intent:** Define world setting, stage themes, visual identity, atmosphere, and layout structure for all 4 stages.
**Key decisions:**
- World tone: operational (not ruined) — machines still run, humans are absent, not dead
- Stage 2 confirmed as vertical scroll, all others horizontal
- Each stage gets one unique environmental hazard
- Human traces mandated in each stage as environmental storytelling
- Stage 4 designed as boss-chamber, not a traversable stage
- Parallax specification capped at 4 layers for web performance
