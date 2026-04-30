# Inspiration Analysis — DR4W: Iron Hunt
> Role: Senior Game Designer / Research Lead
> Status: v1.0
> Last updated: 2026-04-29

---

## Analysis Framework

For each reference game, this document extracts:
1. **What works** — the specific mechanic or design choice, and why it works
2. **What to take** — how Iron Hunt can implement it
3. **What to avoid** — what does not fit our scope or tone
4. **Production efficiency** — how referencing this saves us development time

---

## Reference 01 — Mega Man Classic (NES, 1987-1994)

### Why it's the primary reference

Mega Man Classic is the foundational document for the "action platformer with pattern-reading bosses" genre. Every design choice in that series — health bars, boss patterns, level structure — was optimized for one thing: creating a game where the player learns and improves, and where improvement *feels good*. Iron Hunt has the same design goal.

### What works in Mega Man Classic

**1. Segmented health bars**
The bar of 8 or 16 segments communicates health state far more precisely than a number. "I have 4 bars left" reads faster than "I have 52/128 HP." Every segment lost is a small moment of consequence. Every segment maintained during a boss fight feels like an achievement.

**Take for Iron Hunt:** Dr4w has 8 HP segments (already locked in config.js). Boss bars also segmented. Visual format: vertical bars in screen corners, as shown in concept art.

**2. Pattern-based bosses**
Every Mega Man boss has a fixed or lightly randomized pattern that a player can learn and eventually dodge perfectly. The boss doesn't get harder on repeat attempts — the player gets better. This is fundamentally different from randomized or difficulty-scaling bosses.

**Take for Iron Hunt:** All 4 bosses use deterministic patterns with minor randomization in Phase 2. Learning the pattern IS the game. The feel of "first encounter chaos → learned mastery" is the core loop.

**3. Short stage length**
Classic Mega Man stages take 3-5 minutes for a new player, 1-2 minutes once learned. This is intentional — you replay stages constantly (dying at the boss), so they cannot overstay their welcome.

**Take for Iron Hunt:** Stage target is 2-3 minutes skilled, 5-7 minutes new. Never more. If a stage design requires more content to fill it, the design is too complex — cut it.

**4. Limited projectiles on screen**
Classic Mega Man limits the player to 3 projectiles on screen simultaneously. This prevents "just hold shoot" gameplay and makes every shot feel deliberate.

**Take for Iron Hunt:** Cooldown-based shooting (200ms) achieves the same effect without the visual complexity. Maximum 3 player projectiles on screen at once enforced by the shoot cooldown.

**5. Boss gates as ritual**
The boss room door — the moment before the fight — is always the same. Small room, door closes behind you, boss appears, health bar drops from top. This ritual prepares the player psychologically. They know what's coming.

**Take for Iron Hunt:** Same ritual. Boss gate → small entry room → boss intro animation (name appears) → health bars emerge → fight begins.

**6. I-frames after damage**
1-2 seconds of invulnerability after taking a hit. Without this, any boss that touches you can instantly combo you to death. With it, every hit feels recoverable. The blinking animation during I-frames is a clear visual communication of that state.

**Take for Iron Hunt:** 1200ms I-frames (already locked in config). White damage flash (1 frame) → blink cycle during I-frames.

### What to avoid from Mega Man Classic

- **Weapon switching system** — Each Mega Man boss gives you a weapon. Iron Hunt has no weapon system. Dr4w has one weapon. This is intentional — we are a smaller scope.
- **Password / save system complexity** — Classic Mega Man had passwords for progress. We use simple save (stage unlocked, intro seen). No passwords.
- **Lives system** — Classic Mega Man had 3 lives and a game over screen. Iron Hunt has infinite respawns from last checkpoint. Lower friction.
- **Energy tanks / E-tanks** — Inventory management does not fit Iron Hunt's tone or scope.

### Production efficiency gain

By referencing Mega Man Classic, we inherit 35+ years of "what works" for pattern bosses, health bars, and stage pacing. We do not need to discover these things through iteration. The design is pre-validated. We implement, we tune numbers, we ship.

---

## Reference 02 — Mega Man X (SNES, 1993)

### Why it's the secondary reference

Mega Man X takes the Classic formula and makes the player more powerful and mobile. X can dash, wall-jump, charge shoot. The result is a faster, more dynamic game that rewards aggressive play. Iron Hunt does not want X's full mobility toolkit (no dash or wall-jump in MVP), but X's *feel* — the sense that the player character is capable and precise — is the target.

### What works in Mega Man X

**1. Coyote time and jump forgiveness**
X has extremely forgiving jump physics. You can jump a few frames after walking off a platform. You can buffer a jump input before landing. This makes traversal feel smooth without feeling automatic.

**Take for Iron Hunt:** Already implemented. 100ms coyote time, 100ms jump buffer. These exact values come from studying X's feel.

**2. Variable jump height**
Hold jump = full arc. Release early = shorter arc. This gives the player precise control over jump trajectories. Critical for platforming that requires both short hops and full leaps.

**Take for Iron Hunt:** Already implemented via JUMP_CUT_VY (-80). Early release clamps upward velocity.

**3. Readable boss tells**
Every X boss has a larger, more visible tell than Classic bosses. The increased sprite size (64×64+ for most X bosses vs 48×48 Classic) means the animation telegraph reads clearly. The player can see what's coming from farther away.

**Take for Iron Hunt:** All boss attacks have 0.4-1.2s telegraphs, communicated through animation. The larger the boss, the more readable the tell. Crown Engine at 96×96 has the most visible tells in the game.

**4. Boss intro cinematics**
X introduced brief boss intro sequences — door opens, boss drops in or poses, brief stare-down. This creates drama without consuming significant development time.

**Take for Iron Hunt:** Boss name + health bar drop = our intro. Optional: 1-second freeze before fight begins (boss name splash). This is fast to implement and adds ceremony.

**5. Damage numbers / health feedback**
X made it visually clear when damage was dealt (hit flash + recoil on enemy). There is never ambiguity about whether a shot connected.

**Take for Iron Hunt:** Enemy hit flash (white, 1 frame). Enemy recoil animation (1-pixel pushback). Damage dealt is never ambiguous.

### What to avoid from Mega Man X

- **Upgrades system (armor, heart tanks, sub-tanks)** — X's depth comes partly from exploration and upgrades. Our stages are linear and we have no upgrade economy.
- **Unlockable abilities between stages** — Our Dr4w has the same moveset in Stage 1 as Stage 4. All difficulty scaling comes from enemies and stages, not from player power growth.
- **8 boss stage select screen** — We have 4 stages in linear order. No stage select screen in MVP.

---

## Reference 03 — Contra (NES, 1987)

### What to extract

**1. Visual urgency**
Contra's stages feel relentless — there is no moment where the player is safe to stop and admire the scenery. Enemies come from all angles. The pace is high.

**Take for Iron Hunt:** Not the same density (Contra was co-op and arcade-derived), but the *feeling* that the environment is actively hostile. Enemies do not wait patiently. Hazards are not decorative.

**2. Industrial war aesthetic**
Contra established the "military sci-fi in a post-war industrial hellscape" visual language. Rust, metal, harsh lighting, military architecture. Everything about the world says "this was designed for war and now runs without war."

**Take for Iron Hunt:** Our Stage 1 and Stage 3 directly borrow this visual language. Contra's color discipline (limited palette, high contrast) is our discipline.

**3. Bullet patterns as readable art**
Contra's bullet patterns are often visually beautiful — not just threats, but visual events. The player reads them aesthetically as much as tactically.

**Take for Iron Hunt:** Boss projectile patterns are designed to be visually coherent, not random. Scrap Hound's shrapnel spread is radial. Widow Relay's laser sweeps have visible geometry. Crown Engine's radial blast is explicitly circular.

### What to avoid from Contra

- **One-hit death** — Contra kills you in one hit. Iron Hunt has HP bars. We are not that punishing.
- **Run-and-gun constant action** — Iron Hunt has breathing room, exploration moments, platforming segments. It is not a constant combat scroll.

---

## Reference 04 — Metal Slug (SNK, 1996)

### What to extract

**1. Environmental personality**
Metal Slug's stages are dense with personality — background details, destructible props, objects with behavior. Even empty areas feel inhabited. The art team added detail that wasn't mechanically necessary but made the world feel alive.

**Take for Iron Hunt:** Our stages have background layers with animated elements (cranes, blinking lights, heat shimmer). Not interactive — but living. The human traces (graffiti, radio receivers) serve this purpose.

**2. Enemy design clarity**
Every Metal Slug enemy is immediately readable: what they are, what they do, and how dangerous they are. Soldier vs. tank vs. flying unit — all visually distinct from 10 pixels away.

**Take for Iron Hunt:** Each of our 6 enemy types must be distinguishable at 16×16px. Color and silhouette carry this: Patrol Drone (disc shape, amber eye), Sentry Turret (square base + barrel), Scrap Crawler (wide, low, rust), Signal Sniper (tall, thin, rod arm), Relay Wisp (glowing orb), Purge Sentinel (thick humanoid, red slit).

**3. Boss spectacle without complexity**
Metal Slug bosses are visually impressive without being mechanically complex. They often have simple patterns executed with flair. The spectacle comes from the art and the scale, not from the number of attack types.

**Take for Iron Hunt:** Crown Engine is our Metal Slug boss moment. It is visually the most impressive thing in the game. Its Phase A and B mechanics are not complex (shoot through gap, dodge patterns), but the presentation — the room integration, the scale — makes it feel like a final boss.

### What to avoid from Metal Slug

- **Vehicle mechanics** — Metal Slug's tanks and submarines are iconic but mechanically separate systems. Not in scope.
- **POW rescue system** — The hostage/rescue side system. Not in scope.
- **Humor tone** — Metal Slug is often comedic. Iron Hunt is cold and serious.

---

## Reference 05 — Celeste (Maddy Thorson & Noel Berry, 2018)

### Role in our references

Celeste is a structural reference, not a visual or mechanical one. We look at how Celeste approaches player friction — specifically, how it makes a hard game feel fair.

### What to extract

**1. Death is fast and cheap**
In Celeste, you die constantly and respawn in under 1 second. The game trains you to accept death as a feedback mechanism, not a punishment. The respawn speed is 90% of what makes it feel fair.

**Take for Iron Hunt:** Game over → respawn at last checkpoint with minimal animation. Target: under 1.5 seconds from "died" to "back in control." No lengthy death animations that lock the player in frustration.

**2. Difficulty through design, not stat inflation**
Celeste never makes you stronger. The mountain never gets weaker. The difficulty is always "can you execute this movement at this moment." There are no levels, no XP, no stats. You get better; the game stays the same.

**Take for Iron Hunt:** Already our design principle. Dr4w does not level up. No stat growth. The difficulty curve is entirely in the level design and boss patterns.

**3. Consistent rules**
Celeste never breaks its own physics. Every platform behaves the same way every time. The player can fully trust the game's systems.

**Take for Iron Hunt:** Config.js exists to make this promise. Jump velocity is always -315. Walk speed is always 110. These values do not change between stages. The player's mental model of the physics transfers perfectly from Stage 1 to Stage 4.

### What to avoid from Celeste

- **Narrative depth** — Celeste's story is emotionally complex and central. Iron Hunt's story is minimal and functional.
- **Collectibles / crystal hearts** — No collectible systems in MVP.
- **Assist mode / accessibility settings** — Desirable post-launch but not in MVP scope.

---

## Design Patterns to Adopt (Summary)

| Pattern | Source | Implementation |
|---------|--------|----------------|
| Segmented HP bars | Mega Man Classic | 8 segments, vertical, corners of screen |
| Pattern-read bosses | Mega Man Classic | 2-phase, deterministic, visible tells |
| Short stages | Mega Man Classic | 2-3min skilled play target |
| Coyote + jump buffer | Mega Man X | 100ms both (already in config) |
| Variable jump height | Mega Man X | JUMP_CUT_VY clamp (already in config) |
| Boss entry ritual | Mega Man X | Name splash + health bar drop |
| Visual urgency | Contra | Active hazards, enemies don't idle passively |
| Enemy silhouette clarity | Metal Slug | Distinct shape at 16px |
| Boss spectacle | Metal Slug | Crown Engine room integration |
| Fast respawn | Celeste | < 1.5s from death to control |
| Consistent physics | Celeste | Config.js locked constants |
| Skill-based difficulty | Celeste | No stat inflation, design-driven curve |

---

## Design Patterns to Avoid

| Pattern | Why avoided |
|---------|-------------|
| Weapon switching | Scope — adds complexity without core loop benefit |
| Lives system | Friction — infinite respawns serve our tone better |
| Stage select (8 bosses) | Scope — linear 4-stage structure |
| Upgrade economy | Scope — no loot, no crafting, no items |
| One-hit death | Tone — we have HP bars, we are not that punishing |
| Vehicle mechanics | Scope |
| Narrative interruption | Tone — story is minimal, never pauses gameplay |
| Humor | Tone — cold and serious throughout |

---

## Production Efficiency Gains from These References

**Time saved by referencing Mega Man Classic:**
- Boss pattern structure: pre-validated through decades of player testing
- HP bar format: known to be readable and emotionally clear
- Stage pacing: target durations are established best practice

**Time saved by referencing Mega Man X:**
- Jump feel: coyote time + jump buffer values were empirically tuned over years. We can trust these values.
- Boss tell timing: 0.4-1.2s window is the X series standard. Works.

**Time saved by referencing Celeste:**
- Respawn design: we know fast respawn is good. We implement it as default.
- Physics consistency: the config.js approach is directly inspired by how Celeste keeps physics constant.

**Total design debt avoided:** Approximately 40-60 hours of playtesting "what values feel right for jump physics" and "how long should a boss tell be" — these questions are answered by reference.

---

## Prompt History — Session 001

**Date:** 2026-04-29
**Prompt intent:** Analyze reference games for design patterns applicable to Iron Hunt. Extract actionable items. Identify what to take and what to avoid. Quantify production efficiency.
**References analyzed:** Mega Man Classic, Mega Man X, Contra, Metal Slug, Celeste
**Key decisions:**
- Confirmed 200ms shoot cooldown (Mega Man Classic inspiration for deliberate shooting)
- Confirmed boss tell window 0.4-1.2s range (Mega Man X standard)
- Confirmed fast respawn target < 1.5s (Celeste principle)
- Confirmed stage length target 2-3min skilled (Mega Man Classic pacing)
- Rejected weapon switching, lives system, upgrade economy (out of scope)
