# Iteration Notes — Design Execution
> Tracks prompt results, decisions, refinements, and what to try next
> Updated each session after running prompts through image generation tools
> Last updated: 2026-04-29

---

## How to Use This Document

After each image generation session:
1. Note which prompt IDs were run
2. Rate the output (Accept / Reject / Partial)
3. If rejected: note exactly what failed
4. If accepted: what was extracted/saved and how it will be used
5. List any prompt refinements made as a result

This document is the memory of what worked and what didn't. It prevents repeating failed experiments.

---

## Phase 1 — Session 001 (2026-04-29)

### What was requested

**Scope:** Main character (Dr4w) + game logo/theme identity.
**Reason for scope:** Design-first principle. Start small, validate the visual identity before expanding to enemies and bosses.

### Critical decisions made this session

**Path chosen:** Path B — optimized prompts for external image generation tools.

**Reasoning:**
- Claude cannot generate images (hard technical limitation)
- Text descriptions (Path A) are already complete in character-design.md
- Prompts (Path B) produce actionable visual references in minutes
- A reference image is worth more than additional prose for a visual medium

**Tools recommended (in priority order):**
1. **Midjourney v6** — Best overall quality for pixel art character design. Strongest style adherence. Best for establishing visual references. Requires Discord or Midjourney.com access.
2. **DALL-E 3** — Available via ChatGPT. Less consistent with pixel art style but excellent at following layout instructions (character sheets, title screen composition). Best fallback if Midjourney unavailable.
3. **Stable Diffusion** (local) — Best option if privacy/cost is a concern. Requires pixel art LoRA for good results. More setup but fully controllable.

**Recommendation for this project:** Start with Midjourney `MJ-CHR-001` for Dr4w and `MJ-LOG-003` for the title screen. These are the highest-impact prompts that will anchor the visual identity fastest.

---

## Pending Runs (Not Yet Executed)

These prompts have been written but not yet run through any tool. Run them in this order for maximum efficiency.

### Priority 1 — Run immediately (anchors visual identity)

| Prompt ID | Description | Tool | Expected output |
|-----------|-------------|------|----------------|
| MJ-CHR-001 | Dr4w front-facing hero shot | Midjourney v6 | Primary character reference |
| MJ-LOG-003 | Title screen composition | Midjourney v6 | Visual identity anchor |

### Priority 2 — Run after Priority 1 validated

| Prompt ID | Description | Tool | Expected output |
|-----------|-------------|------|----------------|
| MJ-CHR-002 | Character turnaround sheet | Midjourney v6 | Artist reference for all views |
| MJ-LOG-001 | Stacked logo | Midjourney v6 | Clean logo for HUD and menus |
| DE-CHR-002 | Character sheet layout | DALL-E 3 | Alternative if MJ-CHR-002 fails |

### Priority 3 — Run when Priority 2 is accepted

| Prompt ID | Description | Tool | Expected output |
|-----------|-------------|------|----------------|
| MJ-CHR-003 | Action pose (shooting) | Midjourney v6 | Animation reference |
| MJ-CHR-004 | Key art atmospheric | Midjourney v6 | Marketing/presentation use |
| MJ-LOG-002 | Single-line logo | Midjourney v6 | Small-use logo (HUD header) |
| MJ-LOG-005 | Icon/emblem | Midjourney v6 | App icon / favicon |

---

## Results Log

*This section is empty. Fill in after running prompts.*

### Template for each result entry

```
### Run: [PROMPT-ID] — [Brief description]
**Date:** YYYY-MM-DD
**Tool:** [Midjourney v6 / DALL-E 3 / SD]
**Result:** Accept / Reject / Partial
**What worked:** [specific elements that were correct]
**What failed:** [specific elements that were wrong]
**Extracted:** [what was saved and where]
**Next action:** [retry with modified prompt / accept and move on / escalate to manual art]
**Modified prompt (if applicable):** [paste modified version here]
```

---

## Known Failure Modes (pre-populated from experience)

These are common ways image generators fail on pixel art. Check for these before accepting any output.

### Failure Mode 1 — Anti-aliasing creep

**Symptom:** Pixel art looks slightly blurry at edges. Individual pixels are not clean squares.
**Cause:** Image generators smooth edges by default.
**Fix:** Add to prompt: `--no anti-aliasing, blur, smooth edges` and/or add `pixel perfect edges, hard pixel boundaries`

### Failure Mode 2 — Wrong proportions (too realistic)

**Symptom:** Character looks like a real humanoid robot instead of a Mega Man-style chunky sprite.
**Cause:** "humanoid robot" pulls toward realistic sci-fi aesthetics.
**Fix:** Emphasize `Mega Man Classic 1988 NES proportions, large head, compact legs, chibi-adjacent but not chibi` and reduce `humanoid robot` weight.

### Failure Mode 3 — Too many colors

**Symptom:** The generated image uses 20+ colors instead of 5.
**Cause:** Image generators love visual richness.
**Fix:** Be explicit: `strictly 5 colors only, no additional colors, extremely limited palette, flat posterized colors` and list the exact colors by name.

### Failure Mode 4 — Wrong era / wrong pixel art style

**Symptom:** Looks like "modern retro" indie style (Shovel Knight) or synthwave pixel art instead of NES Classic.
**Cause:** "pixel art" is a broad term.
**Fix:** Be hyper-specific: `NES 1987-1994 era, Mega Man Classic aesthetic, NOT modern retro, NOT 32-bit era, NOT Shovel Knight style`

### Failure Mode 5 — Arm cannon reads as a held weapon

**Symptom:** Dr4w appears to be holding a gun in his hand rather than having a cannon integrated into his forearm.
**Cause:** Guns/weapons default to "held in hand" in training data.
**Fix:** Use `arm cannon integrated into forearm, not held, forearm IS the cannon, Mega Man arm cannon style`

### Failure Mode 6 — Logo generates with wrong text / misspellings

**Symptom:** Generated image shows wrong letters, e.g., "DR4N", "DRYW", "IRON HUNT" as "IRON HUMT"
**Cause:** Image generators struggle with specific text.
**Fix:** Keep logo text prompts extremely simple. Generate the shape/style, add text in code (Phaser) or Photoshop/GIMP. Don't rely on AI for precise typography.

**Action for logo prompts:** If the generated typography is wrong, extract only the *style/color/composition* and implement the actual text manually using the `Press Start 2P` font in Phaser.

---

## Refinement Queue

When a prompt is identified as needing changes, log it here before modifying the master prompt in prompt-library.md.

| Prompt ID | Current issue | Proposed fix | Status |
|-----------|--------------|--------------|--------|
| (empty — fill as results come in) | | | |

---

## Accepted Assets Log

When an output is accepted, log it here so the team knows what visual references exist.

| Asset | Prompt ID | Location | Usage |
|-------|-----------|----------|-------|
| (empty — fill as results are accepted) | | | |

---

## Design Decisions Made from Visual Output

When running prompts changes a design decision (e.g., "the visor looks better as a full-face visor than a band"), log it here and update character-design.md.

| Decision | Triggered by | Change | Updated in |
|----------|-------------|--------|-----------|
| (empty — fill as iterations run) | | | |

---

## Phase 2 Preview — What Comes Next

After Phase 1 (Dr4w + Logo) is validated:

**Phase 2 scope:** Enemy minions
- Prompt set D: Patrol Drone, Sentry Turret, Scrap Crawler (Stage 1 enemies)
- Priority: Stage 1 enemies first (needed for Milestone 1 coding)

**Phase 2 entry criteria:**
- [ ] Dr4w front-facing reference accepted (MJ-CHR-001 result accepted)
- [ ] Logo visual identity confirmed (at least one logo prompt accepted)
- [ ] Color palette validated visually against dark backgrounds

**Do not start Phase 2 until Phase 1 entry criteria are checked.**

**Reason:** If the main character's palette or proportions need adjustment after seeing visual output, those changes must propagate to enemy designs. Enemy colors are defined *relative* to Dr4w (all enemies use cold tones, Dr4w uses mixed warm/cold). If Dr4w's palette shifts, the contrast system shifts.

---

## Prompt History — Session Log

| Session | Date | Prompts created | Prompts run | Assets accepted | Notes |
|---------|------|----------------|-------------|-----------------|-------|
| 001 | 2026-04-29 | 16 (all categories) | 0 (pending execution) | 0 | Initial prompt generation session |
