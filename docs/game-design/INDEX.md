# Game Design Documentation — DR4W: Iron Hunt
> This folder is the authoritative design reference for the Phaser.js iron-hunt project.
> When code and design conflict, design wins — unless a locked constant in config.js takes precedence.

---

## Document Index

### Design Foundation (`history/`)

| Document | Contents | Status |
|----------|----------|--------|
| [character-design.md](history/character-design.md) | Dr4w, 6 enemy types, 4 bosses — visual spec, behavior, palette, narrative role | v1.0 |
| [world-design.md](history/world-design.md) | 4 stage themes, layouts, palettes, atmosphere, enemy distribution, boss arenas | v1.0 |
| [inspiration-analysis.md](history/inspiration-analysis.md) | Mega Man Classic/X, Contra, Metal Slug, Celeste — what to take and what to skip | v1.0 |
| [design-iterations.md](history/design-iterations.md) | Inconsistency log, refinements, open questions | v1.0 |
| [roadmap.md](history/roadmap.md) | Design-first rationale, 5-phase plan, asset priority list, ship checklist | v1.0 |

### Design Execution (`design-execution/`)

| Document | Contents | Status |
|----------|----------|--------|
| [main-character-design.md](design-execution/main-character-design.md) | Dr4w concept art prompts — 5 Midjourney + 2 DALL-E 3 + SD variants | v1.0 |
| [logo-theme-design.md](design-execution/logo-theme-design.md) | Logo prompts, typography spec, Phaser implementation code | v1.0 |
| [prompt-library.md](design-execution/prompt-library.md) | All prompts categorized by tool + style anchor system | v1.0 |
| [iteration-notes.md](design-execution/iteration-notes.md) | Results log, failure modes, pending runs, accepted assets | v1.0 |

---

## Quick Reference — Locked Values

These are already in `src/config.js` and must not change without updating this index and CONTEXT.md.

| Constant | Value |
|----------|-------|
| Resolution | 384×240 internal / 1152×720 display |
| Tile size | 16×16px |
| Player frame | 32×32px |
| Player hitbox | 18×28px |
| Dr4w HP | 8 segments |
| Shoot cooldown | 200ms |
| I-frames | 1200ms |
| Gravity | 900 |
| Jump velocity | -315 |
| Walk speed | 110 |
| Coyote time | 100ms |
| Jump buffer | 100ms |
| Jump cut velocity | -80 |
| Max fall speed | 420 |

---

## Quick Reference — Character Roster

| Character | Type | Size | Stage | Status |
|-----------|------|------|-------|--------|
| Dr4w | Player | 32×32px / 18×28px hitbox | All | Placeholder done |
| Patrol Drone | Minion | 16×16px | 1, 2 | Pending |
| Sentry Turret | Minion | 24×24px | 1, 3 | Pending |
| Scrap Crawler | Minion | 24×16px | 1 | Pending |
| Signal Sniper | Minion | 16×24px | 2 | Pending |
| Relay Wisp | Minion | 12×12px | 2, 4 | Pending |
| Purge Sentinel | Minion | 24×32px | 3 | Pending |
| Scrap Hound | Boss | 48×40px | 1 | Pending |
| Widow Relay | Boss | 64×64px | 2 | Pending |
| Bastion Executor | Boss | 48×80px | 3 | Pending |
| Crown Engine | Boss | 96×96px+ | 4 | Pending |

---

## Quick Reference — Stage Palettes

| Stage | BG | Platform | Accent |
|-------|----|----------|--------|
| 1 — Ferro Velho Solar | `#2A1200` | `#584038` | `#D07028` |
| 2 — Torre de Sinais Mortos | `#050810` | `#202838` | `#8030C0` |
| 3 — Núcleo de Purga | `#0A0C10` | `#2A3038` | `#C02018` |
| 4 — Crown Engine | `#040408` | `#141420` | `#FF1018` |

---

## Open Questions (Requiring Decisions)

| ID | Question | Needed by | Document |
|----|----------|-----------|----------|
| OQ-01 | Checkpoint placement (mid-stage or boss-gate-only?) | Milestone 1 | design-iterations.md |
| OQ-02 | Intro sequence scope (text-only vs. illustrated) | Pre-ship | design-iterations.md |
| OQ-03 | Bastion Executor purge beam (keep / simplify / remove) | Milestone 3 | design-iterations.md |
| OQ-04 | Crown Engine Phase C duration tuning | Milestone 4 | design-iterations.md |

---

## Prompt History — All Sessions

| Session | Date | Focus | Key output |
|---------|------|-------|-----------|
| 001 | 2026-04-29 | Full design foundation | character-design.md, world-design.md, inspiration-analysis.md, design-iterations.md, roadmap.md |
| 002 | 2026-04-29 | Visual execution phase 1 — Dr4w + logo | main-character-design.md, logo-theme-design.md, prompt-library.md (16 prompts), iteration-notes.md |

---

## How to Continue This Work

Future agents or sessions: read `INDEX.md` first, then the specific document for the area you're working on. When adding to a document, append a new entry to its **Prompt History** section at the bottom. When resolving an open question, remove it from the OQ table in INDEX.md and log the resolution in design-iterations.md.

**Do not change locked constants without updating `src/config.js`, `docs/CONTEXT.md`, and the Quick Reference table in this file.**
