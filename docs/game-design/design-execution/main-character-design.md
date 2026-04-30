# Main Character Design — Dr4w
> Phase: Design Execution / Phase 1
> Focus: Main character visual identity only
> Status: v1.0 — Prompt generation session
> Last updated: 2026-04-29

---

## Critical Question Answer #1

**Can Claude directly generate visual assets (images, sprite sheets, concept art)?**

**No.** Claude is a text-based model. It cannot produce image files, PNG exports, or rendered pixel art. This is a hard technical limitation — not a scope or safety restriction.

**What Claude CAN do:**
- Generate the most precise, production-ready image generation prompts possible
- Provide pixel-level art specifications that a human artist or a code-based sprite generator can implement directly
- Create Python/PIL scripts that generate placeholder sprites from the locked palette
- Write structured visual descriptions that serve as creative briefs

**Chosen path:** Path B — optimized prompts for external image generation tools.

**Why Path B over Path A:**
- Path A (text descriptions) is already complete — character-design.md contains the full written spec
- What the team needs now are *actionable prompts* that produce visual references in minutes
- A good Midjourney or DALL-E 3 prompt turns a 3-page design document into a reference image in 30 seconds
- Reference images are more useful to an artist (or for self-generating) than additional prose

---

## Game Narrative Context (Design Anchor)

This context must be referenced mentally when evaluating any generated image.

**World:** Year 2194. Humans lost the surface of Earth to automated machine factions. The war ended. The extermination protocol — IRON HUNT — did not. Machines continue to hunt human survivors with cold, bureaucratic precision. Cities are intact but lifeless. Machines maintain infrastructure that serves no human purpose. The horror is not destruction — it is indifferent continuation.

**Protagonist:** Dr4w is a humanoid infiltration droid built during the final war phase. Designed to move like a human to access places heavy androids cannot. His core was critically damaged in a failed offensive. He was declared lost. Years later, a fragment of a human transmission reactivates him — not orders, not protocol. A human voice. "...if anyone can hear this... we're still here..." That signal breaks the last obedience link. Dr4w does not recover his mission. He recovers something more dangerous: choice.

**Mission:** Dismantle IRON HUNT by destroying its 4 command nodes and ultimately Crown Engine — the central machine consciousness directing the hunt.

**Enemies:** The machines are not evil. They are executing orders from a war that ended without anyone telling them. They are disciplined, cold, and relentless. Dr4w is the only warm anomaly in their operational world.

**Tone:** Cold. Industrial. Precise. Heroism without romanticism. A machine that chose to be more than its function.

**Visual identity of Dr4w:**
He is built from the same materials as the machines hunting him. His armor is the same navy-gunmetal as enemy units. What marks him as different: a bright cyan visor where others have dark scanners, two red points of light for eyes that suggest something looking *through* the machine rather than *as* the machine. He carries an arm-cannon on his right arm — slightly oversized for his frame, like something that was added, not designed. His left arm is smaller, tucked. The asymmetry is intentional: he was built for function, not symmetry.

---

## Locked Visual Specifications

These values are non-negotiable. Every prompt must respect them.

| Element | Spec |
|---------|------|
| Style | 16-bit pixel art, Mega Man Classic era |
| Resolution target | 32×32px gameplay, concept art at any scale |
| Armor color | `#1E2A38` (dark navy-gunmetal) |
| Armor shadow | `#141E2A` (near-black blue) |
| Visor color | `#40D0F0` (electric cyan, bright) |
| Eye color | `#F01820` (alert red) |
| Specular highlight | `#4A5E76` (slate blue-gray) |
| Total colors | Maximum 5 (no additional colors) |
| Silhouette | Compact humanoid, asymmetric (right arm cannon) |
| Proportions | Slightly top-heavy (larger head), compact legs, Mega Man style |
| Distinctive features | Right arm is a cannon. Cyan visor band. Two red eye dots. |

---

## Prompt Set A — Concept Art Style (for reference and key art)

Use these when you want a detailed, readable character reference — not pixel art, but illustrative concept art. Feed results to your artist as visual briefs.

---

### Prompt A-1 — Front-facing hero shot (primary reference)

**Tool:** Midjourney v6 / DALL-E 3

```
A humanoid combat robot standing in a confident neutral pose, facing forward, slight 3/4 angle.
Dark navy-gunmetal armor, matte finish, battle-worn with light scuff marks.
Bright electric cyan visor band across the upper face — the only warm light source on the character.
Two small red dots visible inside the visor, like eyes looking through a window.
Right arm is a compact arm cannon, slightly oversized, integrated into the forearm.
Left arm is smaller, tucked slightly inward.
Asymmetric silhouette. Compact proportions. Slightly large head relative to body.
5-color palette: dark navy (#1E2A38), near-black blue shadow (#141E2A), electric cyan (#40D0F0), alert red eyes (#F01820), slate-gray specular (#4A5E76).
Background: pure black.
Style: 16-bit pixel art character concept art, inspired by Mega Man Classic NES aesthetic.
Clean, readable silhouette. No gradients. Hard edges. Limited shading.
Retro game character sheet style.
--ar 1:1 --v 6 --style raw
```

---

### Prompt A-2 — Full character sheet (multiple views)

**Tool:** Midjourney v6

```
Character design sheet for a humanoid combat android named Dr4w.
Four views on white background: front, side, back, 3/4 front.
Dark navy-gunmetal plated armor. Electric cyan visor band. Two red eye dots. Right arm cannon.
Compact Mega Man-style proportions: large head, compact torso, short legs.
5-color flat pixel art palette. No gradients. Hard pixel edges.
Professional game character reference sheet layout.
Labels for: helmet, visor, arm cannon, chest plate, leg actuators.
Style: retro 16-bit pixel art, NES-era Mega Man design philosophy.
Flat design, readable at small scale.
--ar 2:1 --v 6 --style raw
```

---

### Prompt A-3 — Action pose (shooting)

**Tool:** DALL-E 3

```
A compact humanoid combat droid in a shooting stance, seen from the side.
Right arm extended forward as a cannon, barrel glowing electric cyan at the tip.
Dark navy-gunmetal armor, matte and slightly worn.
Bright cyan visor across the upper face area, two small red lights visible behind the visor.
Body leaning slightly forward in a run-and-shoot pose.
Style: clean 16-bit pixel art, inspired by classic Mega Man NES game character design.
5 colors only: dark navy, near-black shadow, electric cyan, alert red, slate-gray.
High contrast, strong readable silhouette. Transparent background preferred.
No gradient shading. Flat pixel art style. Retro game aesthetic.
```

---

### Prompt A-4 — Damaged/corrupted variant

**Tool:** Midjourney v6

```
Humanoid combat android, battle-damaged. Same design as Mega Man-style compact droid.
Armor cracked in two places on the chest, exposing dark internals underneath.
Visor flickering — half bright cyan, half dark, as if power failing.
Red eye dots dimmer than normal.
Right arm cannon intact but scarred.
Posture: standing upright but with slight forward lean suggesting damage.
Background: dark industrial corridor, very low detail.
Style: 16-bit pixel art, Mega Man Classic influence.
5-color palette with addition of white for crack glow highlights.
--ar 1:1 --v 6
```

---

### Prompt A-5 — Atmospheric key art (scale shot)

**Tool:** Midjourney v6

```
A small humanoid combat android stands in the foreground of a massive post-apocalyptic industrial facility.
The android is compact, Mega Man-proportioned: large head, arm cannon, cyan visor glowing in the dark.
Behind him: enormous rusted factory machinery, conveyor belts, crane arms. Sky is deep orange-brown haze.
The android is small relative to the environment — the world dwarfs him.
Style: pixel art scene, 16-bit retro game aesthetic, Mega Man / Contra industrial sci-fi.
Limited palette: character in navy and cyan, world in rust (#2A1200, #584038, #D07028 orange).
Strong perspective. Distance and scale emphasized.
Cinematic but pixel art.
--ar 16:9 --v 6 --style raw
```

---

## Prompt Set B — Pixel Art Sprites (for direct game use)

Use these when you want to generate the actual game sprite or a close reference to pixel-trace from.

**Important:** Image generation tools produce inconsistent pixel art at small scales. Always generate at 512×512 or larger and downscale manually, or use the output as a reference for manual pixel art creation.

---

### Prompt B-1 — 32×32 idle sprite (single frame)

**Tool:** Stable Diffusion (with pixel art LoRA) or Midjourney

```
A single pixel art character sprite at 32x32 pixels.
Humanoid combat robot, compact proportions, Mega Man Classic NES style.
Dark navy-gunmetal body. Bright cyan visor strip on the head.
Two red pixel dots for eyes. Right arm is a cannon.
Standing neutral idle pose, facing right.
Strictly limited to 5 colors: #1E2A38 dark navy, #141E2A near-black, #40D0F0 cyan, #F01820 red, #4A5E76 slate.
Pixel perfect edges. No anti-aliasing. No gradients.
Black background. Clean game sprite.
Upscaled 8x (output at 256x256) for visibility.
Style: NES pixel art, 1987-1994 era, Mega Man sprite style.
--ar 1:1 --v 6 --style raw --no gradients, anti-aliasing, blur, noise
```

---

### Prompt B-2 — Animation strip reference (run cycle)

**Tool:** Midjourney v6

```
4-frame pixel art run animation strip for a humanoid robot character.
Frames displayed left to right on transparent background.
Mega Man NES-style proportions. Dark navy armor. Cyan visor. Red eyes. Right arm cannon.
Frame 1: right leg forward, left leg back. Frame 2: both legs together, body dips slightly.
Frame 3: left leg forward, right leg back. Frame 4: both legs together, body rises.
5-color palette only. Hard pixel edges. No anti-aliasing.
Each frame 32x32 pixels, 4 frames total, strip is 128x32 pixels.
Upscaled 4x for visibility.
NES-era pixel art style, Mega Man Classic.
--ar 4:1 --v 6 --style raw
```

---

### Prompt B-3 — Sprite sheet (all states)

**Tool:** DALL-E 3 (more responsive to layout instructions)

```
A pixel art sprite sheet for a humanoid combat robot.
8 rows, 6 columns, each cell exactly 32x32 pixels.
Row 1: idle (3 frames). Row 2: run (4 frames). Row 3: jump (1 frame). Row 4: fall (1 frame).
Row 5: shoot idle (2 frames). Row 6: shoot run (4 frames). Row 7: hurt (2 frames). Row 8: death (6 frames).
Character style: Mega Man Classic NES 1988. Compact humanoid robot.
Colors: dark navy armor, electric cyan visor, two red eye dots, right arm cannon, slate gray shoulder.
Strict 5-color pixel palette. No gradients. Black background between cells.
Grid lines visible between cells preferred.
Professional game sprite sheet layout.
```

---

## Evaluation Criteria for Generated Images

When reviewing outputs from any image generation tool, score on these axes:

| Criterion | Check |
|-----------|-------|
| Silhouette reads | Can you identify it as a robot with an arm cannon at 32px? |
| Palette compliance | Does it use approximately the 5 locked colors? |
| Asymmetry correct | Is the right arm clearly the cannon arm? |
| Visor prominent | Is the cyan visor the first thing you notice after silhouette? |
| Eyes visible | Are the two red dots present and inside the visor? |
| Mega Man proportion | Is the head proportionally large? Compact legs? |
| Style consistency | Does it feel like it belongs in a 16-bit era game? |
| Background readability | Does it read against the Stage 1 background (`#2A1200`)? |

**Accept if:** 6/8 criteria are met.
**Reject if:** Silhouette, palette, or visor fail — these are the non-negotiable elements.

---

## Stable Diffusion Specific Notes

If using Stable Diffusion locally:

**Recommended checkpoints:**
- `Anything V5` (good anime/game character base)
- `DreamShaper 8` (flexible for concept art)
- `AbsoluteReality v1.8` (detailed characters)

**Recommended LoRAs:**
- `pixel art LoRA` (search CivitAI for "pixel art")
- `Mega Man style LoRA` (if available)

**Positive tags:**
```
pixel art, 16-bit, NES style, Mega Man, humanoid robot, arm cannon,
dark navy armor, cyan visor, red eyes, compact proportions,
limited palette, flat shading, retro game character, sprite style,
clean silhouette, game asset, 1988 era game graphics
```

**Negative tags:**
```
realistic, 3D, gradient, anti-aliasing, blur, photographic,
too many colors, detailed texture, modern graphics, anime, chibi,
oversized cannon, symmetric arms, human face visible, no visor
```

---

## Prompt History

| Session | Date | Action | Output |
|---------|------|--------|--------|
| 001 | 2026-04-29 | Generated 8 prompts for main character Dr4w | Prompt Set A (5 prompts) + Set B (3 prompts) |
