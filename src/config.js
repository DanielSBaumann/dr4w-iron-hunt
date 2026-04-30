// src/config.js
// All values locked in the planning session — do not change without updating docs/CONTEXT.md

export const CONFIG = {
  // Display
  WIDTH:  384,
  HEIGHT: 240,
  SCALE:  3,          // renders at 1152×720

  // World
  TILE_SIZE: 16,

  // Physics (locked — from analysis-physics.md research session)
  GRAVITY_Y:      900,
  JUMP_VELOCITY:  -315,
  WALK_SPEED:     110,
  COYOTE_MS:      100,
  JUMP_BUFFER_MS: 100,
  MAX_FALL_SPEED: 420,
  JUMP_CUT_VY:    -80,   // velocity clamped on early jump-button release

  // Player
  PLAYER_FRAME_W:  32,
  PLAYER_FRAME_H:  32,
  PLAYER_HITBOX_W: 18,
  PLAYER_HITBOX_H: 28,
  PLAYER_MAX_HP:   8,
  PLAYER_IFRAME_MS: 1200,
  SHOOT_COOLDOWN_MS: 200,  // 5 shots/second max
  BULLET_SPEED:      240,
  BULLET_RANGE:      300, // pixels before bullet despawns

  // Color palette — use for placeholder rendering and UI tints
  COLORS: {
    ARMOR_PRIMARY:  0x1E2A38,
    ARMOR_SHADOW:   0x141E2A,
    VISOR_CYAN:     0x40D0F0,
    EYES_RED:       0xF01820,
    SPECULAR:       0x4A5E76,
    BACKGROUND:     0x0D111A,

    // Stage palettes
    STAGE1_BG:      0x2A1200,
    STAGE1_PLATFORM: 0x584038,
    STAGE1_ACCENT:  0xD07028,

    STAGE2_BG:      0x050810,
    STAGE2_PLATFORM: 0x202838,
    STAGE2_ACCENT:  0x8030C0,

    STAGE3_BG:      0x0A0C10,
    STAGE3_PLATFORM: 0x2A3038,
    STAGE3_ACCENT:  0xC02018,

    STAGE4_BG:      0x040408,
    STAGE4_PLATFORM: 0x141420,
    STAGE4_ACCENT:  0xFF1018,
  },

  // Boss frame sizes
  BOSS: {
    SCRAP_HOUND:  { w: 48, h: 40 },
    WIDOW_RELAY:  { w: 64, h: 64 },
    BASTION_EXEC: { w: 48, h: 80 },
    CROWN_ENGINE: { w: 96, h: 96 },
  },

  // Player sprite sheet layout (192×256px atlas, 32×32 cells)
  ANIM: {
    IDLE:       { row: 0, frames: 3 },
    RUN:        { row: 1, frames: 4 },
    JUMP:       { row: 2, frames: 1 },
    FALL:       { row: 3, frames: 1 },
    SHOOT_IDLE: { row: 4, frames: 2 },
    SHOOT_RUN:  { row: 5, frames: 4 },
    HURT:       { row: 6, frames: 2 },
    DEAD:       { row: 7, frames: 6 },
  },
};
