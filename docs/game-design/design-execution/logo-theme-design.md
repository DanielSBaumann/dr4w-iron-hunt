# Logo & Theme Identity Design — DR4W: Iron Hunt
> Phase: Design Execution / Phase 1
> Focus: Game logo and visual identity only
> Status: v1.0
> Last updated: 2026-04-29

---

## Logo Design Brief

### What the logo must communicate

1. **Industrial threat** — this is not a colorful action game. It is a cold, operational machine world.
2. **Machine aesthetic** — typography should feel mechanical, stenciled, or stamped — like a military designation code on hardware.
3. **The anomaly** — Dr4w's name contains a number (`4`) where a letter should be. The logo must make this visible and intentional. It's not a typo. It's a corrupted designation.
4. **The IRON HUNT** — the subtitle is the name of the protocol hunting humans. It should feel heavier than the character's name. More institutional. More dangerous.

### Typography direction

| Element | Direction |
|---------|-----------|
| "DR4W" | Monospace or stencil-cut typeface. The "4" is the same weight as letters. Military designation feeling. |
| ":" separator | Simple colon. Minimal. Suggests a system designation format (UNIT:PROTOCOL). |
| "IRON HUNT" | Heavier weight than "DR4W". All caps. Wider tracking. Feels like a government/military protocol name. |
| Overall feeling | Functional. Not decorative. Like text stamped on machinery. |

### Color direction

| Element | Color | Reasoning |
|---------|-------|-----------|
| "DR4W" primary | `#40D0F0` (cyan) | Matches Dr4w's visor — his identity color |
| "DR4W" shadow/outline | `#1E2A38` (dark navy) | His armor color |
| ":" separator | `#4A5E76` (slate) | Neutral, system-like |
| "IRON HUNT" | `#F01820` (alert red) | The threat. The protocol. Warning color. |
| "IRON HUNT" backing | None or `#141E2A` (near-black) | Dark and institutional |
| Background | `#0D111A` (near-black with blue tint) | The void behind everything |

**The visual statement:** A cyan designation (Dr4w — the anomaly, warm, alive) against a red protocol label (IRON HUNT — the threat, institutional, cold). The two colors are opposites in emotional temperature while both being electric/artificial. They coexist in tension.

### Layout options

**Option 1 — Stacked**
```
  DR4W
  ————
  IRON HUNT
```
Dr4w centered top in cyan. Separator line in slate. IRON HUNT centered bottom in red. Tight stack.

**Option 2 — Colon format (designation style)**
```
DR4W: IRON HUNT
```
Single line. Reads like a system command. Machine-format.

**Option 3 — Hierarchical**
```
       DR4W
  ⬛⬛⬛⬛⬛⬛⬛
  I R O N  H U N T
```
Dr4w smaller above, IRON HUNT large below in red. The protocol is the dominant visual weight — Dr4w is the outlier within it.

**Recommended:** Option 3 for title screens (most cinematic), Option 2 for in-game HUD and small usage.

---

## Prompt Set C — Logo Generation

---

### Prompt C-1 — Primary logo (stacked, concept)

**Tool:** Midjourney v6

```
Pixel art game logo for a retro action platformer.
Title: "DR4W" on top line in electric cyan, bold monospace pixel font.
Subtitle: "IRON HUNT" on second line in alert red, same pixel font but slightly wider tracking.
A thin horizontal line separates them in slate gray.
Background: near-black with very subtle blue tint (#0D111A).
Style: 16-bit retro game title screen typography. NES/SNES era.
Pixel-perfect edges. No anti-aliasing on letterforms.
Military stencil / monospace quality to the font.
The "4" in DR4W is a numeral, same weight as letters, intentionally stylized.
Clean, readable, industrial. No decorative flourishes.
Aspect ratio 3:1, logo centered.
--ar 3:1 --v 6 --style raw
```

---

### Prompt C-2 — Single-line designation format

**Tool:** DALL-E 3

```
A pixel art game logo in a single line: "DR4W: IRON HUNT"
The text "DR4W" is rendered in bright electric cyan (#40D0F0).
The colon ":" is in slate gray.
The text "IRON HUNT" is rendered in alert red (#F01820).
Font style: monospace, bold, military stencil aesthetic, pixel art typeface.
Background: pure black.
Style: retro 16-bit game title, NES era typography.
The entire logo is made of clean pixel squares. No anti-aliasing. No gradients.
Horizontal layout, centered. The "4" is a numeral integrated seamlessly.
```

---

### Prompt C-3 — Title screen composition (with character)

**Tool:** Midjourney v6

```
Retro pixel art game title screen composition.
Top third: "DR4W" in large electric cyan pixel letters, bold monospace, left-aligned.
Below that: "IRON HUNT" in massive bold red pixel letters, full width, commanding presence.
Bottom third: silhouette of a compact humanoid robot (Mega Man-style proportions) standing facing right.
Robot details: dark navy armor, cyan visor glow, arm cannon visible as right arm.
Far background: pixelated ruins of factory buildings against a dark orange-brown haze sky.
Very far background: faint scan lines of red suggesting machine surveillance.
Overall atmosphere: cold, industrial, the robot is small against the world.
Style: NES title screen aesthetic, 16-bit pixel art, Mega Man / Contra visual language.
5-6 total colors max. High contrast. Readable at a glance.
--ar 16:9 --v 6 --style raw
```

---

### Prompt C-4 — Logo mark / icon variant (square format)

**Tool:** Midjourney v6

```
Square icon/emblem for a retro sci-fi action game called "DR4W: IRON HUNT".
Central element: the letters "D4" or just the number "4" rendered as a corrupted machine designation.
Surrounding the numeral: a broken circuit line forming a partial hexagon.
Color: electric cyan on near-black background. Red accent on one broken edge of the hexagon.
Style: pixel art icon, 16-bit, game logo mark, NES era aesthetic.
Clean geometry. Limited palette: cyan, red, dark navy, near-black.
Works as an app icon or favicon at 16x16px.
--ar 1:1 --v 6 --style raw
```

---

### Prompt C-5 — Worn/distressed variant (for intro/atmosphere)

**Tool:** Midjourney v6

```
Pixel art game logo, distressed/glitched version for use in intro sequence.
Text: "DR4W: IRON HUNT" in monospace pixel art font.
"DR4W" in cyan but with a horizontal glitch artifact — one line of pixels offset 3px right.
"IRON HUNT" in red but with scan line interference — every 4th row slightly dimmer.
Background: near-black. Small static particles across the scene.
As if transmitted from a failing signal.
Style: retro pixel art, CRT monitor effect, signal degradation aesthetic.
Same color palette as clean version: cyan, red, dark navy, near-black.
The glitch is subtle — the logo is still fully readable.
--ar 3:1 --v 6
```

---

## Typography Specification for Manual Implementation

If generating the logo in code (Phaser text objects) or using a bitmap font:

### Recommended free pixel fonts (ready to use)

| Font | Source | Style | License |
|------|--------|-------|---------|
| Press Start 2P | Google Fonts | Classic 8-bit, all-caps | Open Font License |
| VT323 | Google Fonts | Terminal/monospace | Open Font License |
| Silkscreen | Google Fonts | Clean pixel, readable | Open Font License |
| Tiny5 | Google Fonts | Ultra compact 5px | Open Font License |
| Pixelify Sans | Google Fonts | Modern pixel, mixed case | Open Font License |

**Primary recommendation:** `Press Start 2P` for the title. It is the de facto standard for retro game aesthetics and is already well-known to players. Use it for "DR4W" and "IRON HUNT" at different sizes.

**For HUD and body text:** `Silkscreen` or `Tiny5` for compact UI elements where Press Start 2P is too wide.

### Phaser implementation note

```javascript
// Title screen — example of bicolor logo approach
this.add.text(cx, cy - 30, 'DR4W', {
  fontFamily: '"Press Start 2P"',
  fontSize: '24px',
  color: '#40D0F0',         // cyan
  stroke: '#1E2A38',        // navy stroke for depth
  strokeThickness: 2,
}).setOrigin(0.5);

this.add.text(cx, cy + 4, 'IRON HUNT', {
  fontFamily: '"Press Start 2P"',
  fontSize: '12px',
  color: '#F01820',         // red
  letterSpacing: 6,         // wider tracking = institutional
}).setOrigin(0.5);
```

---

## Logo Evaluation Criteria

| Criterion | Check |
|-----------|-------|
| "4" reads as intentional | Does the numeral feel designed, not accidental? |
| Bicolor contrast | Do cyan and red both read against the dark background? |
| IRON HUNT weight | Does the subtitle feel heavier/more threatening than DR4W? |
| Style match | Does it feel like a 16-bit era game logo? |
| Small scale | Does it read at 64px wide (HUD use case)? |
| Silhouette without color | Is the layout readable in black and white? |

**Accept if:** 5/6 criteria met. Bicolor contrast is non-negotiable.

---

## Prompt History

| Session | Date | Action | Output |
|---------|------|--------|--------|
| 001 | 2026-04-29 | Generated 5 logo prompts + typography spec | Prompt Set C (5 prompts) + manual implementation guide |
