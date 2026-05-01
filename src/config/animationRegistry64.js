// Animation registry for the 64×64 expanded sprite sheet.
// Spritesheet layout: 4 columns × 9 rows, each frame 64×64px → player_64x64.png
//
// Frame numbers map left-to-right, top-to-bottom:
//   Row 0 (frames  0– 3): idle variations
//   Row 1 (frames  4– 7): airborne / jump
//   Row 2 (frames  8–11): shoot + run
//   Row 3 (frames 12–15): hit / knockback
//   Row 4 (frames 16–19): charge
//   Row 5 (frames 20–23): intro / victory
//   Row 6 (frames 24–27): defeat / respawn
//   Row 7 (frames 28–31): status effects
//   Row 8 (frames 32–35): platforming

export const FRAME = {
  idle_sway:         0,
  idle_look:         1,
  idle_weapon_check: 2,
  idle_breathing:    3,

  jump_peak:         4,
  double_jump:       5,
  double_jump_apex:  6,
  air_spin:          7,

  shoot_run_left:    8,
  shoot_run_right:   9,
  shoot_dash:       10,
  shoot_fall:       11,

  hit_react:        12,
  knockback_left:   13,
  knockback_right:  14,
  invincible_flash: 15,

  charge_level_1:   16,
  charge_level_2:   17,
  charge_level_3:   18,
  charge_release:   19,

  intro_entrance:   20,
  intro_pose:       21,
  victory_pose:     22,
  victory_glow:     23,

  defeat_pose:      24,
  collapse:         25,
  dead_64:          26,
  respawn_flash:    27,

  frozen:           28,
  stun:             29,
  burning:          30,
  electrical:       31,

  climb_up:         32,
  ledge_grab:       33,
  ledge_pullup:     34,
  wall_slide:       35,
};

// Animation definitions: key → { frames[], frameRate, repeat, category }
// All single-frame for now (each AI sprite = 1 pose). Add multi-frame later.
export const ANIM_64 = {
  // ── Idle ──────────────────────────────────────────────────────────────────────
  idle_sway:         { frames: [FRAME.idle_sway],         frameRate: 5,  repeat: -1, category: 'idle' },
  idle_look:         { frames: [FRAME.idle_look],         frameRate: 6,  repeat:  0, category: 'idle' },
  idle_weapon_check: { frames: [FRAME.idle_weapon_check], frameRate: 6,  repeat:  0, category: 'idle' },
  idle_breathing:    { frames: [FRAME.idle_breathing],    frameRate: 4,  repeat: -1, category: 'idle' },

  // ── Airborne ──────────────────────────────────────────────────────────────────
  jump_peak:         { frames: [FRAME.jump_peak],         frameRate: 10, repeat:  0, category: 'airborne' },
  double_jump:       { frames: [FRAME.double_jump],       frameRate: 10, repeat:  0, category: 'airborne' },
  double_jump_apex:  { frames: [FRAME.double_jump_apex],  frameRate: 10, repeat:  0, category: 'airborne' },
  air_spin:          { frames: [FRAME.air_spin],          frameRate: 12, repeat:  0, category: 'airborne' },

  // ── Combat ────────────────────────────────────────────────────────────────────
  shoot_run_left:    { frames: [FRAME.shoot_run_left],    frameRate: 12, repeat:  0, category: 'combat' },
  shoot_run_right:   { frames: [FRAME.shoot_run_right],   frameRate: 12, repeat:  0, category: 'combat' },
  shoot_dash:        { frames: [FRAME.shoot_dash],        frameRate: 10, repeat:  0, category: 'combat' },
  shoot_fall:        { frames: [FRAME.shoot_fall],        frameRate: 10, repeat:  0, category: 'combat' },

  // ── Damage ────────────────────────────────────────────────────────────────────
  hit_react:         { frames: [FRAME.hit_react],         frameRate: 10, repeat:  0, category: 'damage' },
  knockback_left:    { frames: [FRAME.knockback_left],    frameRate: 10, repeat:  0, category: 'damage' },
  knockback_right:   { frames: [FRAME.knockback_right],   frameRate: 10, repeat:  0, category: 'damage' },
  invincible_flash:  { frames: [FRAME.invincible_flash],  frameRate: 12, repeat: -1, category: 'damage' },

  // ── Charge ────────────────────────────────────────────────────────────────────
  charge_level_1:    { frames: [FRAME.charge_level_1],    frameRate: 6,  repeat: -1, category: 'combat' },
  charge_level_2:    { frames: [FRAME.charge_level_2],    frameRate: 8,  repeat: -1, category: 'combat' },
  charge_level_3:    { frames: [FRAME.charge_level_3],    frameRate: 12, repeat: -1, category: 'combat' },
  charge_release:    { frames: [FRAME.charge_release],    frameRate: 15, repeat:  0, category: 'combat' },

  // ── Narrative ─────────────────────────────────────────────────────────────────
  intro_entrance:    { frames: [FRAME.intro_entrance],    frameRate: 10, repeat:  0, category: 'narrative' },
  intro_pose:        { frames: [FRAME.intro_pose],        frameRate: 8,  repeat: -1, category: 'narrative' },
  victory_pose:      { frames: [FRAME.victory_pose],      frameRate: 8,  repeat: -1, category: 'narrative' },
  victory_glow:      { frames: [FRAME.victory_glow],      frameRate: 10, repeat: -1, category: 'narrative' },
  defeat_pose:       { frames: [FRAME.defeat_pose],       frameRate: 6,  repeat:  0, category: 'narrative' },
  collapse:          { frames: [FRAME.collapse],          frameRate: 12, repeat:  0, category: 'narrative' },
  dead_64:           { frames: [FRAME.dead_64],           frameRate: 1,  repeat:  0, category: 'narrative' },
  respawn_flash:     { frames: [FRAME.respawn_flash],     frameRate: 15, repeat:  0, category: 'narrative' },

  // ── Status Effects ────────────────────────────────────────────────────────────
  frozen:            { frames: [FRAME.frozen],            frameRate: 5,  repeat:  0, category: 'status' },
  stun:              { frames: [FRAME.stun],              frameRate: 8,  repeat:  0, category: 'status' },
  burning:           { frames: [FRAME.burning],           frameRate: 10, repeat:  0, category: 'status' },
  electrical:        { frames: [FRAME.electrical],        frameRate: 10, repeat:  0, category: 'status' },

  // ── Platforming ───────────────────────────────────────────────────────────────
  climb_up:          { frames: [FRAME.climb_up],          frameRate: 8,  repeat: -1, category: 'movement' },
  ledge_grab:        { frames: [FRAME.ledge_grab],        frameRate: 10, repeat:  0, category: 'movement' },
  ledge_pullup:      { frames: [FRAME.ledge_pullup],      frameRate: 12, repeat:  0, category: 'movement' },
  wall_slide:        { frames: [FRAME.wall_slide],        frameRate: 6,  repeat: -1, category: 'movement' },
};

// Ordered list used for cycling in the test scene (N = next, P = prev)
export const ANIM_64_KEYS = Object.keys(ANIM_64);
