import Phaser from 'phaser';
import { CONFIG } from '../config.js';
import { ANIM_64, ANIM_64_KEYS } from '../config/animationRegistry64.js';

const WORLD_W  = CONFIG.WIDTH * 2;
const GROUND_H = 16;
const GROUND_Y = CONFIG.HEIGHT - GROUND_H;

// Injected at build time by vite.config.js.
// true  → demo build (portfolio embed): dark bg, no debug text, shooting enabled.
// false → dev / main game build: white bg, debug HUD visible.
const DEMO = import.meta.env.VITE_DEMO === 'true';

export class PlayerTestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerTestScene' });
  }

  preload() {
    this.load.spritesheet('player_64x64',
      'assets/sprites/player/player_64x64.png',
      { frameWidth: 64, frameHeight: 64 }
    );
  }

  create() {
    this.cameras.main.setBackgroundColor(DEMO ? CONFIG.COLORS.STAGE1_BG : 0xFFFFFF);

    this._makePlatformTex();
    this._makePlatforms();
    this._makePlayer();
    this._makeBullets();
    this._makeCamera();
    this._makeKeys();
    this._makeHUD();

    this._jumpBuffer    = 0;
    this._coyoteTime    = 0;
    this._hasAnims      = false;
    this._shootCooldown = 0;
    this._facingRight   = true;

    this._setupAnims();
    this._setup64Anims();
    this._setup64Preview();
    this.cameras.main.fadeIn(300, 0, 0, 0);
  }

  // ─── Textures ─────────────────────────────────────────────────────────────────

  _makePlatformTex() {
    if (this.textures.exists('px')) return;
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFFFFFF);
    g.fillRect(0, 0, 1, 1);
    g.generateTexture('px', 1, 1);
    g.destroy();
  }

  // ─── Platforms ────────────────────────────────────────────────────────────────

  _makePlatforms() {
    this._ground = this.physics.add.staticGroup();

    const floors = [
      [WORLD_W / 2, GROUND_Y + GROUND_H / 2, WORLD_W, GROUND_H, 0x3A4E62],
      [160,  CONFIG.HEIGHT - 56,   96, 10, 0x4A5E76],
      [360,  CONFIG.HEIGHT - 88,   80, 10, 0x4A5E76],
      [540,  CONFIG.HEIGHT - 64,  112, 10, 0x4A5E76],
      [700,  CONFIG.HEIGHT - 104,  72, 10, 0x4A5E76],
      [480,  CONFIG.HEIGHT - 136,  64, 10, 0x4A5E76],
    ];

    floors.forEach(([cx, cy, w, h, tint]) => {
      this._ground.create(cx, cy, 'px')
        .setDisplaySize(w, h)
        .setTint(tint)
        .refreshBody();
    });
  }

  // ─── Player ───────────────────────────────────────────────────────────────────

  _makePlayer() {
    const tex = this.textures.exists('player') ? 'player' : '__DEFAULT';
    this._p = this.physics.add.sprite(60, GROUND_Y - 20, tex);
    this._p.setMaxVelocity(CONFIG.WALK_SPEED * 2, CONFIG.MAX_FALL_SPEED);
    this._p.setCollideWorldBounds(true);
    this.physics.world.setBounds(0, -CONFIG.HEIGHT, WORLD_W, CONFIG.HEIGHT * 2);
    this.physics.add.collider(this._p, this._ground);
  }

  _setupAnims() {
    if (!this.textures.exists('player')) return;
    if (this.anims.exists('p_idle')) { this._hasAnims = true; return; }

    const COLS = 6;
    const frames = (row, n) =>
      this.anims.generateFrameNumbers('player', { start: row * COLS, end: row * COLS + n - 1 });

    this.anims.create({ key: 'p_idle', frames: frames(0, 3), frameRate: 6,  repeat: -1 });
    this.anims.create({ key: 'p_run',  frames: frames(1, 4), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'p_jump', frames: frames(2, 1), frameRate: 8,  repeat:  0 });
    this.anims.create({ key: 'p_fall', frames: frames(3, 1), frameRate: 8,  repeat:  0 });

    this._p.anims.play('p_idle', true);
    this._hasAnims = true;
  }

  // ─── Bullets ──────────────────────────────────────────────────────────────────

  _makeBullets() {
    this._bullets = this.physics.add.group();
  }

  _fireBullet() {
    const dir = this._facingRight ? 1 : -1;
    const bx  = this._p.x + dir * 20;
    const by  = this._p.y - 4;
    const tex = this.textures.exists('bullet') ? 'bullet' : '__DEFAULT';

    const b = this._bullets.create(bx, by, tex);
    b.body.setAllowGravity(false);
    b.body.setVelocityX(dir * CONFIG.BULLET_SPEED);
    if (!this.textures.exists('bullet')) b.setTint(0x40D0F0).setDisplaySize(8, 4);
    if (dir < 0) b.setFlipX(true);
    b.setData('startX', bx);
  }

  // ─── Camera ───────────────────────────────────────────────────────────────────

  _makeCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_W, CONFIG.HEIGHT);
    this.cameras.main.startFollow(this._p, true, 1, 1);
  }

  // ─── Keys ─────────────────────────────────────────────────────────────────────

  _makeKeys() {
    this._cur  = this.input.keyboard.createCursorKeys();
    this._keyA = this.input.keyboard.addKey('A');
    this._keyD = this.input.keyboard.addKey('D');
    this._keyW = this.input.keyboard.addKey('W');
    this._keyZ = this.input.keyboard.addKey('Z');
    this._keyX = this.input.keyboard.addKey('X');
  }

  // ─── HUD ──────────────────────────────────────────────────────────────────────

  _makeHUD() {
    const CX = CONFIG.WIDTH / 2;

    if (DEMO) {
      // Demo: clean controls hint, visible against dark background
      this.add.text(CX, CONFIG.HEIGHT - 6,
        'A / D  move   ·   W / SPACE  jump   ·   Z / X  shoot', {
        fontFamily: 'monospace', fontSize: '4px', color: '#4A5E76',
      }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(10);
      this._dbg = null;
    } else {
      // Dev: full debug HUD (physics state visible)
      this._dbg = this.add.text(4, 4, '', {
        fontFamily: 'monospace', fontSize: '5px', color: '#000000', lineSpacing: 2,
      }).setScrollFactor(0).setDepth(10);

      this.add.text(CX, CONFIG.HEIGHT - 5,
        'WASD/ARROWS move+jump   Z/X shoot', {
        fontFamily: 'monospace', fontSize: '4px', color: '#333333',
      }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(10);
    }
  }

  // ─── Update ───────────────────────────────────────────────────────────────────

  update(_t, dt) {
    const p   = this._p;
    const b   = p.body;
    const cur = this._cur;

    const grounded = b.blocked.down;
    const left     = cur.left.isDown  || this._keyA.isDown;
    const right    = cur.right.isDown || this._keyD.isDown;

    const jumpJust = Phaser.Input.Keyboard.JustDown(cur.up)
                  || Phaser.Input.Keyboard.JustDown(cur.space)
                  || Phaser.Input.Keyboard.JustDown(this._keyW);
    const jumpHeld = cur.up.isDown || cur.space.isDown || this._keyW.isDown;
    const shooting = this._keyZ.isDown || this._keyX.isDown;

    // Coyote + buffer
    if (grounded)  this._coyoteTime = CONFIG.COYOTE_MS;
    else           this._coyoteTime = Math.max(0, this._coyoteTime - dt);
    if (jumpJust)  this._jumpBuffer = CONFIG.JUMP_BUFFER_MS;
    else           this._jumpBuffer = Math.max(0, this._jumpBuffer - dt);

    // Horizontal
    if (left)       { b.setVelocityX(-CONFIG.WALK_SPEED); p.setFlipX(true);  this._facingRight = false; }
    else if (right) { b.setVelocityX( CONFIG.WALK_SPEED); p.setFlipX(false); this._facingRight = true;  }
    else            { b.setVelocityX(0); }

    // Jump
    if (this._jumpBuffer > 0 && this._coyoteTime > 0) {
      b.setVelocityY(CONFIG.JUMP_VELOCITY);
      this._jumpBuffer = 0;
      this._coyoteTime = 0;
    }
    if (!jumpHeld && b.velocity.y < CONFIG.JUMP_CUT_VY) {
      b.setVelocityY(CONFIG.JUMP_CUT_VY);
    }

    // Shoot
    this._shootCooldown = Math.max(0, this._shootCooldown - dt);
    if (shooting && this._shootCooldown <= 0) {
      this._fireBullet();
      this._shootCooldown = CONFIG.SHOOT_COOLDOWN_MS;
    }

    // Bullet range cleanup
    [...this._bullets.getChildren()].forEach(bullet => {
      if (!bullet.active) return;
      if (Math.abs(bullet.x - (bullet.getData('startX') ?? 0)) > CONFIG.BULLET_RANGE) {
        bullet.destroy();
      }
    });

    // Animations
    if (this._hasAnims) {
      const moving = Math.abs(b.velocity.x) > 5;
      let anim = 'p_idle';
      if (!grounded) anim = b.velocity.y < 0 ? 'p_jump' : 'p_fall';
      else if (moving) anim = 'p_run';
      p.anims.play(anim, true);
    }

    // Debug HUD (dev build only — null in demo)
    if (this._dbg) {
      this._dbg.setText([
        `vx/vy : ${b.velocity.x.toFixed(0)} / ${b.velocity.y.toFixed(0)}`,
        `pos   : ${p.x.toFixed(0)}, ${p.y.toFixed(0)}`,
        `floor : ${grounded}`,
        this._previewSprite ? `64anim: ${ANIM_64_KEYS[this._previewIdx]}` : '',
      ].join('\n'));
    }
  }

  // ─── 64×64 animation registration ────────────────────────────────────────────

  _setup64Anims() {
    if (!this.textures.exists('player_64x64')) return;
    if (this.anims.exists('e64_idle_sway')) return;  // already registered

    for (const [key, cfg] of Object.entries(ANIM_64)) {
      this.anims.create({
        key: 'e64_' + key,
        frames: this.anims.generateFrameNumbers('player_64x64', {
          frames: cfg.frames,
        }),
        frameRate: cfg.frameRate,
        repeat:    cfg.repeat,
      });
    }
  }

  // ─── Preview sprite (top-right corner, cycles with N / P keys) ───────────────

  _setup64Preview() {
    if (!this.textures.exists('player_64x64')) return;

    this._previewIdx    = 0;
    this._previewSprite = this.add
      .sprite(CONFIG.WIDTH - 40, 40, 'player_64x64')
      .setScrollFactor(0)
      .setDepth(20)
      .setScale(1.5);

    this._previewSprite.anims.play('e64_' + ANIM_64_KEYS[0], true);

    if (!DEMO) {
      this.add.text(CONFIG.WIDTH - 40, 82, 'N/P cycle', {
        fontFamily: 'monospace', fontSize: '4px', color: '#4A5E76',
      }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(20);
    }

    this._keyN = this.input.keyboard.addKey('N');
    this._keyP = this.input.keyboard.addKey('P');

    this._keyN.on('down', () => this._cyclePreview(1));
    this._keyP.on('down', () => this._cyclePreview(-1));
  }

  _cyclePreview(dir) {
    if (!this._previewSprite) return;
    this._previewIdx = (this._previewIdx + dir + ANIM_64_KEYS.length) % ANIM_64_KEYS.length;
    const key = ANIM_64_KEYS[this._previewIdx];
    this._previewSprite.anims.play('e64_' + key, true);
    if (!DEMO) console.log(`[64px] ${this._previewIdx}: ${key}`);
  }
}
