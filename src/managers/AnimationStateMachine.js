import { ANIM_64 } from '../config/animationRegistry64.js';

// Allowed transitions: from-state → [valid next states]
const TRANSITIONS = {
  idle_sway:         ['idle_look', 'idle_weapon_check', 'idle_breathing', 'jump_peak', 'shoot_run_left'],
  idle_look:         ['idle_sway', 'idle_breathing', 'jump_peak'],
  idle_weapon_check: ['idle_sway', 'idle_breathing', 'jump_peak'],
  idle_breathing:    ['idle_sway', 'idle_look', 'jump_peak', 'shoot_run_left'],
  jump_peak:         ['double_jump', 'air_spin', 'shoot_fall'],
  double_jump:       ['double_jump_apex', 'air_spin'],
  double_jump_apex:  ['air_spin'],
  air_spin:          ['shoot_fall', 'idle_sway'],
  shoot_run_left:    ['shoot_run_right', 'idle_sway', 'shoot_fall'],
  shoot_run_right:   ['shoot_run_left', 'idle_sway', 'shoot_fall'],
  shoot_dash:        ['shoot_fall', 'idle_sway'],
  shoot_fall:        ['idle_sway', 'hit_react'],
  hit_react:         ['knockback_left', 'knockback_right'],
  knockback_left:    ['invincible_flash', 'idle_sway'],
  knockback_right:   ['invincible_flash', 'idle_sway'],
  invincible_flash:  ['idle_sway'],
  charge_level_1:    ['charge_level_2', 'charge_release'],
  charge_level_2:    ['charge_level_3', 'charge_release'],
  charge_level_3:    ['charge_release'],
  charge_release:    ['idle_sway'],
  intro_entrance:    ['intro_pose'],
  intro_pose:        ['idle_sway'],
  victory_pose:      ['victory_glow'],
  victory_glow:      ['idle_sway'],
  defeat_pose:       ['collapse'],
  collapse:          ['dead_64'],
  dead_64:           ['respawn_flash'],
  respawn_flash:     ['idle_sway'],
  frozen:            ['idle_sway'],
  stun:              ['idle_sway'],
  burning:           ['idle_sway'],
  electrical:        ['idle_sway'],
  climb_up:          ['ledge_grab'],
  ledge_grab:        ['ledge_pullup'],
  ledge_pullup:      ['idle_sway'],
  wall_slide:        ['jump_peak', 'idle_sway'],
};

export class AnimationStateMachine {
  /** @param {Phaser.Physics.Arcade.Sprite} sprite */
  constructor(sprite) {
    this._sprite  = sprite;
    this._current = 'idle_sway';
    this._prev    = 'idle_sway';
  }

  get current() { return this._current; }
  get prev()    { return this._prev; }

  /** Play an animation by key, respecting transition rules. */
  play(key, force = false) {
    if (key === this._current && !force) return false;
    if (!ANIM_64[key]) return false;
    if (!force && !this._canTransition(this._current, key)) return false;

    this._prev    = this._current;
    this._current = key;
    this._sprite.anims.play('e64_' + key, true);
    return true;
  }

  /** Play without checking transition rules (for external triggers like damage). */
  forcePlay(key) {
    return this.play(key, true);
  }

  _canTransition(from, to) {
    const allowed = TRANSITIONS[from];
    return allowed ? allowed.includes(to) : false;
  }
}
