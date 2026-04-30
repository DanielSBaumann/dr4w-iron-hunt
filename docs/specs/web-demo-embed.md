# SDD — DR4W: Iron Hunt — Web Demo Embed
**Version:** 1.0  
**Date:** 2026-04-29  
**Author:** Daniel Baumann / DR4W  
**Status:** Draft — awaiting implementation approval

---

## 1. Objective

Make the current DR4W: Iron Hunt demo (intro sequence + playable character test) embeddable in the personal landing page at **dr4w.io**, as a live playable section that showcases the game in development without interrupting the landing page's UX.

---

## 2. Current State

| Property | Value |
|---|---|
| Engine | Phaser 3.88.2 |
| Build tool | Vite 6 |
| Language | JavaScript ES2022 (ESM) |
| Game resolution | 384×240 (FIT-scaled to fill window) |
| Existing build | `dist/` folder, ~17MB (artconcept PNGs are unoptimised) |
| Hosting | None (local only) |
| Scenes available | Boot → Preload → Intro (logo + 3 panels) → Start (title) → PlayerTestScene |
| Audio | Empty (no files yet) |
| Font | "Press Start 2P" via Google Fonts CDN |

The game is already HTML5-native. No engine change or platform export is required.

---

## 3. Target State

- Game is hosted on a dedicated static URL (e.g., `https://game.dr4w.io` or GitHub Pages)
- Landing page (`dr4w.io`) contains a **"Play Demo"** section with a lazy-loaded `<iframe>` pointing to that URL
- Visitor can click the frame, give it keyboard focus, and play the demo without leaving the landing page
- Mobile visitors see a static fallback card with a "Open in full screen" link instead of the iframe
- Total additional load on landing page: **zero JS** (iframe loads on interaction, not on page load)

---

## 4. User Experience

### Desktop flow
1. Visitor scrolls to "Iron Hunt" section on dr4w.io
2. Section shows: title, one-liner description, WIP badge, and a dark frame
3. Frame contains a static thumbnail/poster with a **▶ Play Demo** overlay button
4. Clicking the button lazy-loads the iframe (replaces the thumbnail)
5. A "Click to focus" hint appears below the frame
6. Visitor clicks inside the frame → game receives keyboard input → plays normally
7. Controls info (`A/D move · W/Space jump · Z/X shoot · ESC pause`) shown below frame
8. "View on GitHub" and "Full screen" links flank the frame

### Mobile flow
- iframe is not shown (performance + UX reasons)
- Static card with concept art thumbnail, game title, WIP badge, and "Open full screen →" link
- Full screen link opens the game URL in a new tab

---

## 5. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Game must be accessible at a stable HTTPS URL |
| FR-02 | Landing page must embed the game via `<iframe>` |
| FR-03 | iframe must be lazy-loaded (only after user clicks Play) |
| FR-04 | Mobile devices (viewport < 768px) must show a fallback card, not the iframe |
| FR-05 | Frame must be sized at 768×480px (2× game resolution) on desktop |
| FR-06 | Controls info must be visible below the frame at all times |
| FR-07 | A "full screen" link must open the game URL in a new tab |
| FR-08 | A "View on GitHub" link must point to the game repository |
| FR-09 | A "Work in progress" badge must be visible |
| FR-10 | The game must not auto-play audio (no audio exists yet — no action needed) |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Landing page initial load must not be affected (0 extra JS/CSS until user interacts) |
| NFR-02 | Game URL must respond in < 1s (static CDN) |
| NFR-03 | Game bundle must load in < 5s on a 10Mbps connection |
| NFR-04 | Total game asset size must be reduced to < 5MB after optimisation |
| NFR-05 | Game must run at stable 60fps in Chrome/Firefox/Safari desktop |
| NFR-06 | iframe must not break landing page layout on any viewport |
| NFR-07 | HTTPS required on game host (iframe from HTTPS parent requires HTTPS child) |

---

## 7. Technical Constraints

- **Asset size (critical):** Artconcept PNGs are 1.1–2.5MB each, totalling ~18MB. These must be converted to WebP before deployment. Target: < 200KB per image.
- **Google Fonts dependency:** IntroScene loads "Press Start 2P" from `fonts.googleapis.com`. Works fine, but adds a network request. Acceptable for demo.
- **Keyboard focus:** Browsers require a user gesture (click inside iframe) before the iframe can receive keyboard events. This is a browser security constraint, not a bug. Must be communicated to the user.
- **Same-origin vs cross-origin iframe:** Game and landing page are on different origins. `allow-scripts` sandbox is fine; no `postMessage` needed for MVP.
- **base path:** `vite.config.js` uses `base: '/iron-hunt/'` for GitHub Pages mode. This must be updated to match the actual hosting path.
- **Cloudflare Pages:** Landing page is deployed via Cloudflare (wrangler.toml). Game can also use Cloudflare Pages for consistency, or use GitHub Pages.

---

## 8. Architecture Proposal

```
┌─────────────────────────────────────────────────────────┐
│  dr4w.io  (Cloudflare Pages)                            │
│  React + Tailwind — dr4w-landpage repo                  │
│                                                         │
│  <GameDemoSection>                                      │
│    ↓ (click Play)                                       │
│    <iframe src="https://game.dr4w.io" />                │
└─────────────────────────────────────────────────────────┘
                          ↑ HTTPS iframe
┌─────────────────────────────────────────────────────────┐
│  game.dr4w.io  (Cloudflare Pages OR GitHub Pages)       │
│  Static build from dr4w-iron-hunt repo                  │
│  dist/ → index.html + phaser chunk + game chunk + assets│
└─────────────────────────────────────────────────────────┘
```

### Hosting decision matrix

| Option | Pros | Cons | Decision |
|---|---|---|---|
| GitHub Pages (`dr4wone.github.io/dr4w-iron-hunt`) | Free, already has `build:pages` script | URL is long; not `dr4w.io` subdomain | OK for MVP |
| Cloudflare Pages (separate project) | `game.dr4w.io` custom domain, same infra as landing page | One more Cloudflare project to manage | Recommended for v1 |
| Subfolder of dr4w.io (`dr4w.io/game`) | Single deploy pipeline | Game iframe inside same origin — simpler but couples deploys | Future option |

**Recommended:** Cloudflare Pages for game with custom subdomain `game.dr4w.io`.

---

## 9. Integration with Landing Page

### New component: `GameDemoSection.tsx`

Location: `dr4w-landpage/src/components/GameDemoSection.tsx`

Behaviour:
- Renders as a `<section id="iron-hunt">` between `Projects` and `Interests`
- Shows poster/thumbnail state by default
- On "Play Demo" click: replaces thumbnail with `<iframe>`
- Below frame: controls legend, GitHub link, full-screen link

### App.tsx change

```tsx
import { GameDemoSection } from './components/GameDemoSection'

// Add after <Projects />
<GameDemoSection />
```

### Navbar change

Add `Iron Hunt` link pointing to `#iron-hunt` anchor.

---

## 10. Asset Handling

### Problem
Artconcept PNGs are large (1.1–2.5MB each). For a web demo, this is unacceptable.

### Solution
Run a one-time conversion before building the game:

```bash
# In dr4w-iron-hunt repo
python3 tools/convert_assets_webp.py
# or
cwebp -q 80 public/assets/artconcepts/intro_01.png -o public/assets/artconcepts/intro_01.webp
```

Then update `PreloadScene.js` to load `.webp` instead of `.png`.

Expected size reduction: ~80%. Each 1.8MB PNG → ~150-300KB WebP.

Total estimated after conversion: **< 2MB** for all artconcept images.

### What stays as PNG
- `player.png` (atlas) — already 36KB, no action needed
- `bullet.png`, `muzzle_flash.png` — trivially small

---

## 11. Build & Deploy Strategy

### Game repo (`dr4w-iron-hunt`)

```bash
# 1. Convert artconcept PNGs to WebP (one-time, then commit)
# 2. Update vite.config.js base path
# 3. Build
npm run build

# 4. Deploy to Cloudflare Pages (or push to gh-pages branch)
wrangler pages deploy dist --project-name dr4w-iron-hunt-demo
```

### vite.config.js update required

```js
base: mode === 'github-pages'   ? '/dr4w-iron-hunt/'
    : mode === 'cloudflare'     ? '/'
    :                             './',
```

Add `build:cf` script:
```json
"build:cf": "vite build --mode cloudflare"
```

### Landing page repo (`dr4w-landpage`)

```bash
npm run build
wrangler pages deploy dist --project-name dr4w-landpage
```

No change to existing deploy pipeline.

---

## 12. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| User doesn't know to click frame for keyboard focus | High | Medium | Prominent "Click to focus · then use keyboard" hint |
| 18MB assets cause slow load | High | High | WebP conversion (Priority 1 before deploy) |
| Mobile perf issues with Phaser | Medium | Low | Already blocked on mobile with fallback card |
| Google Fonts fails to load in some regions | Low | Low | Font fallback chain: `"Press Start 2P", monospace` |
| iframe blocked by CSP on landing page | Low | High | Add `frame-src game.dr4w.io` to Cloudflare CSP headers |
| Game has no loading indicator visible in iframe | Medium | Medium | Phaser's PreloadScene already shows a progress bar — acceptable |

---

## 13. Open Questions

1. **Custom domain:** Is `game.dr4w.io` configured or available in the Cloudflare account? If not, GitHub Pages URL is the fallback.
2. **WebP support in PreloadScene:** `Phaser.Loader.ImageFile` supports WebP natively in modern browsers. Safari 14+ supports WebP. Acceptable risk for demo.
3. **Poster image:** Should the thumbnail shown before Play is clicked be a screenshot of the game, or the concept art? Recommend: title screen screenshot (`title_screen.webp`).
4. **iframe `allow` attribute:** Does the game need any special browser permissions (fullscreen API, gamepad API)? Currently no. Fullscreen button uses `window.open`, not the Fullscreen API.
5. **Analytics:** Should game visits be tracked separately? Not in MVP scope.

---

## 14. MVP Scope

The MVP is the **smallest deliverable that shows a live playable demo** on dr4w.io.

### In scope
- [ ] Convert artconcept PNGs to WebP
- [ ] Update `vite.config.js` base path to `'/'` (Cloudflare) or `/dr4w-iron-hunt/` (GitHub Pages)
- [ ] `npm run build` producing clean, minimal dist
- [ ] Deploy game to static host (GitHub Pages first, Cloudflare Pages after)
- [ ] `GameDemoSection.tsx` component in landing page
- [ ] Lazy iframe load on Play click
- [ ] Mobile fallback card
- [ ] Controls legend below frame
- [ ] WIP badge

### Out of scope for MVP
- Audio
- Full Stage 1 in demo (PlayerTestScene is enough)
- Gamepad support
- Analytics
- Custom `game.dr4w.io` domain (can use GitHub Pages URL)
- Screenshot/poster generation automation

---

## 15. Future Improvements

- Replace GitHub Pages URL with `game.dr4w.io` Cloudflare subdomain
- Add CI/CD: push to `main` in game repo → auto-deploy to Cloudflare Pages
- Add a "mute/unmute" button once audio is implemented
- Progressive loading: show logo first, then stream remaining assets
- Add gamepad support (Phaser supports it natively)
- Replace iframe with embedded canvas once game and landing page share a domain (eliminates focus UX issue)
- Versioned deploys: `/game/v0.3/` etc. so landing page can pin a stable demo version

---

*This spec was generated as part of the SDD process for dr4w-iron-hunt v0.3.0.*
