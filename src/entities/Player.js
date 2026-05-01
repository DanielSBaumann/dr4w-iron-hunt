import Phaser from 'phaser';
import { CONFIG } from '../config.js';

const W    = CONFIG.PLAYER_HITBOX_W;   // 18
const H    = CONFIG.PLAYER_HITBOX_H;   // 28
const FW   = CONFIG.PLAYER_FRAME_W;    // 32
const FH   = CONFIG.PLAYER_FRAME_H;    // 32
const COLS = 6;

// Map state name → animation key
const ANIM_KEY = {
  idle:       'player_idle',
  run:        'player_run',
  jump:       'player_jump',
  fall:       'player_fall',
  shoot_idle: 'player_shoot_idle',
  shoot_run:  'player_shoot_run',
  hurt:       'player_hurt',
  dead:       'player_dead',
};

export class Player extends Phaser.Physics.Arcade.Sprite {
  // ─── Texture helpers ──────────────────────────────────────────────────────────

  static generateFallbackTexture(scene) {
    if (scene.textures.exists('player-rect')) return;
    const g = scene.make.graphics({ add: false });
    g.fillStyle(CONFIG.COLORS.ARMOR_PRIMARY);  g.fillRect(0, 0, W, H);
    g.fillStyle(CONFIG.COLORS.ARMOR_SHADOW);   g.fillRect(0, 0, 3, H);
    g.fillStyle(CONFIG.COLORS.VISOR_CYAN);     g.fillRect(4, 3, 10, 6);
    g.fillStyle(CONFIG.COLORS.EYES_RED);       g.fillRect(5, 5, 2, 2); g.fillRect(11, 5, 2, 2);
    g.fillStyle(CONFIG.COLORS.SPECULAR);       g.fillRect(13, 0, 5, 4);
    g.generateTexture('player-rect', W, H);
    g.destroy();
  }

  static setupAnims(scene) {
    if (!scene.textures.exists('player')) return;
    if (scene.anims.exists('player_idle')) return;

    const row = (r, frames) =>
      scene.anims.generateFrameNumbers('player', {
        start: r * COLS,
        end:   r * COLS + frames - 1,
      });

    scene.anims.create({ key: 'player_idle',       frames: row(CONFIG.ANIM.IDLE.row,       CONFIG.ANIM.IDLE.frames),       frameRate: 6,  repeat: -1 });
    scene.anims.create({ key: 'player_run',        frames: row(CONFIG.ANIM.RUN.row,        CONFIG.ANIM.RUN.frames),        frameRate: 10, repeat: -1 });
    scene.anims.create({ key: 'player_jump',       frames: row(CONFIG.ANIM.JUMP.row,       CONFIG.ANIM.JUMP.frames),       frameRate: 8,  repeat:  0 });
    scene.anims.create({ key: 'player_fall',       frames: row(CONFIG.ANIM.FALL.row,       CONFIG.ANIM.FALL.frames),       frameRate: 8,  repeat:  0 });
    scene.anims.create({ key: 'player_shoot_idle', frames: row(CONFIG.ANIM.SHOOT_IDLE.row, CONFIG.ANIM.SHOOT_IDLE.frames), frameRate: 10, repeat: -1 });
    scene.anims.create({ key: 'player_shoot_run',  frames: row(CONFIG.ANIM.SHOOT_RUN.row,  CONFIG.ANIM.SHOOT_RUN.frames),  frameRate: 10, repeat: -1 });
    scene.anims.create({ key: 'player_hurt',       frames: row(CONFIG.ANIM.HURT.row,       CONFIG.ANIM.HURT.frames),       frameRate: 10, repeat:  0 });
    scene.anims.create({ key: 'player_dead',       frames: row(CONFIG.ANIM.DEAD.row,       CONFIG.ANIM.DEAD.frames),       frameRate: 8,  repeat:  0 });
  }

  // Registers the same animation keys but sourced from the 64×64 spritesheet.
  // Frame layout (4 cols × 9 rows): row 0 = idle, row 1 = airborne, row 2 = shoot/run,
  // row 3 = hit, row 4 = charge, row 5 = narrative, row 6 = defeat, row 7 = status, row 8 = platforming.
  static setupAnims64(scene) {
    if (!scene.textures.exists('player_64x64')) return;
    if (scene.anims.exists('player_idle')) return;

    const f = (frames) => scene.anims.generateFrameNumbers('player_64x64', { frames });

    scene.anims.create({ key: 'player_idle',       frames: f([0]),     frameRate: 5,  repeat: -1 });
    scene.anims.create({ key: 'player_run',        frames: f([8, 9]),  frameRate: 8,  repeat: -1 });
    scene.anims.create({ key: 'player_jump',       frames: f([4]),     frameRate: 10, repeat:  0 });
    scene.anims.create({ key: 'player_fall',       frames: f([11]),    frameRate: 8,  repeat:  0 });
    scene.anims.create({ key: 'player_shoot_idle', frames: f([2]),     frameRate: 10, repeat: -1 });
    scene.anims.create({ key: 'player_shoot_run',  frames: f([8, 9]),  frameRate: 10, repeat: -1 });
    scene.anims.create({ key: 'player_hurt',       frames: f([12]),    frameRate: 10, repeat:  0 });
    scene.anims.create({ key: 'player_dead',       frames: f([26]),    frameRate: 8,  repeat:  0 });
  }

  // ─── Constructor ──────────────────────────────────────────────────────────────

  constructor(scene, x, y) {
    const has64     = scene.textures.exists('player_64x64');
    const hasSprite = has64 || scene.textures.exists('player');
    if (!hasSprite) Player.generateFallbackTexture(scene);

    const texKey = has64 ? 'player_64x64' : (hasSprite ? 'player' : 'player-rect');
    super(scene, x, y, texKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(W, H);
    this.body.setMaxVelocityY(CONFIG.MAX_FALL_SPEED);
    if (hasSprite) {
      const frameW = has64 ? 64 : FW;
      const frameH = has64 ? 64 : FH;
      this.body.setOffset((frameW - W) / 2, (frameH - H) / 2);
    }

    this._hasSprite    = hasSprite;
    this._state        = 'idle';
    this._coyoteTimer  = 0;
    this._jumpBuffer   = 0;
    this._grounded     = false;
    this._facingRight  = true;
    this._shootCooldown = 0;
    this._hp           = CONFIG.PLAYER_MAX_HP;
    this._iframeTimer  = 0;
    this._dead         = false;

    if (has64) Player.setupAnims64(scene);
    else       Player.setupAnims(scene);
    if (hasSprite) this.anims.play('player_idle', true);

    console.log(`[Player] created | tex:${texKey}`);
  }

  // ─── State ────────────────────────────────────────────────────────────────────

  get grounded() { return this._grounded; }
  get state()    { return this._state; }
  get isShooting() { return this._shootCooldown > 0; }

  _computeState() {
    const moving = Math.abs(this.body.velocity.x) > 5;
    if (!this._grounded) return this.body.velocity.y < 0 ? 'jump' : 'fall';
    if (this._shootCooldown > 0) return moving ? 'shoot_run' : 'shoot_idle';
    return moving ? 'run' : 'idle';
  }

  _setState(next) {
    if (next === this._state) return;
    this._state = next;
    if (this._hasSprite) this.anims.play(ANIM_KEY[next] ?? 'player_idle', true);
  }

  // ─── Update ───────────────────────────────────────────────────────────────────

  get hp()          { return this._hp; }
  get isInvincible() { return this._iframeTimer > 0; }
  get isDead()       { return this._dead; }

  takeDamage(amount = 1) {
    if (this._iframeTimer > 0 || this._dead) return false;
    this._hp = Math.max(0, this._hp - amount);
    this._iframeTimer = CONFIG.PLAYER_IFRAME_MS;
    this.emit('player_hurt', { hp: this._hp, max: CONFIG.PLAYER_MAX_HP });
    if (this._hp <= 0) {
      this._dead = true;
      this.emit('player_dead');
    }
    return true;
  }

  respawn(x, y) {
    this.setPosition(x, y);
    this.body.setVelocity(0, 0);
    this._iframeTimer = CONFIG.PLAYER_IFRAME_MS;
    this._state = 'idle';
    this.setAlpha(1);
    if (this._hasSprite) this.anims.play(ANIM_KEY.idle ?? 'player_idle', true);
  }

  update(dt, input) {
    if (this._dead) return;
    const body = this.body;

    // Grounded + coyote
    const nowGrounded = body.blocked.down;
    if (nowGrounded) {
      this._coyoteTimer = CONFIG.COYOTE_MS;
    } else if (this._grounded && !nowGrounded) {
      this._coyoteTimer = CONFIG.COYOTE_MS;
    } else {
      this._coyoteTimer = Math.max(0, this._coyoteTimer - dt);
    }
    this._grounded = nowGrounded;

    // Jump buffer
    if (input.justPressed('jump')) {
      this._jumpBuffer = CONFIG.JUMP_BUFFER_MS;
    } else {
      this._jumpBuffer = Math.max(0, this._jumpBuffer - dt);
    }

    // Horizontal movement
    if (input.isHeld('left')) {
      body.setVelocityX(-CONFIG.WALK_SPEED);
      this._facingRight = false;
      this.setFlipX(true);
    } else if (input.isHeld('right')) {
      body.setVelocityX(CONFIG.WALK_SPEED);
      this._facingRight = true;
      this.setFlipX(false);
    } else {
      body.setVelocityX(0);
    }

    // Jump
    if (this._jumpBuffer > 0 && this._coyoteTimer > 0) {
      body.setVelocityY(CONFIG.JUMP_VELOCITY);
      this._jumpBuffer  = 0;
      this._coyoteTimer = 0;
    }

    // Variable jump height
    if (!input.isHeld('jump') && body.velocity.y < CONFIG.JUMP_CUT_VY) {
      body.setVelocityY(CONFIG.JUMP_CUT_VY);
    }

    // Shoot cooldown tick
    this._shootCooldown = Math.max(0, this._shootCooldown - dt);

    // Iframe tick + flash
    if (this._iframeTimer > 0) {
      this._iframeTimer -= dt;
      this.setAlpha(Math.floor(this._iframeTimer / 80) % 2 === 0 ? 1 : 0.35);
      if (this._iframeTimer <= 0) this.setAlpha(1);
    }

    // Shoot — fires while held (held-fire at cooldown rate)
    if (input.isHeld('shoot') && this._shootCooldown <= 0) {
      this._shootCooldown = CONFIG.SHOOT_COOLDOWN_MS;
      // Muzzle position: in front of the cannon arm
      const muzzleOffX = this._facingRight ? 22 : -22;
      const muzzleOffY = -4; // slightly above center (cannon height)
      this.emit('shoot', {
        x:   this.x + muzzleOffX,
        y:   this.y + muzzleOffY,
        dir: this._facingRight ? 1 : -1,
      });
    }

    this._setState(this._computeState());
  }
}
