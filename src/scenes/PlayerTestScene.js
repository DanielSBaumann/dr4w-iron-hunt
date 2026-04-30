import Phaser from 'phaser';
import { CONFIG } from '../config.js';

const WORLD_W  = CONFIG.WIDTH * 2;
const GROUND_H = 16;
const GROUND_Y = CONFIG.HEIGHT - GROUND_H;

export class PlayerTestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerTestScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xFFFFFF);

    this._makePlatformTex();
    this._makePlatforms();
    this._makePlayer();
    this._makeCamera();
    this._makeKeys();
    this._makeHUD();

    this._jumpBuffer  = 0;
    this._coyoteTime  = 0;
    this._hasAnims    = false;

    this._setupAnims();
  }

  // ─── Platforms ───────────────────────────────────────────────────────────────

  _makePlatformTex() {
    if (this.textures.exists('px')) return;
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFFFFFF);
    g.fillRect(0, 0, 1, 1);
    g.generateTexture('px', 1, 1);
    g.destroy();
  }

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

  // ─── Player ──────────────────────────────────────────────────────────────────

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
    this.anims.create({ key: 'p_jump', frames: frames(2, 1), frameRate: 8,  repeat: 0  });
    this.anims.create({ key: 'p_fall', frames: frames(3, 1), frameRate: 8,  repeat: 0  });

    this._p.anims.play('p_idle', true);
    this._hasAnims = true;
  }

  // ─── Camera ──────────────────────────────────────────────────────────────────

  _makeCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_W, CONFIG.HEIGHT);
    this.cameras.main.startFollow(this._p, true, 1, 1);
  }

  // ─── Keys ────────────────────────────────────────────────────────────────────

  _makeKeys() {
    this._cur  = this.input.keyboard.createCursorKeys();
    this._keyA = this.input.keyboard.addKey('A');
    this._keyD = this.input.keyboard.addKey('D');
    this._keyW = this.input.keyboard.addKey('W');
    this._keyZ = this.input.keyboard.addKey('Z');
    this._keyX = this.input.keyboard.addKey('X');
  }

  // ─── HUD ─────────────────────────────────────────────────────────────────────

  _makeHUD() {
    this._dbg = this.add.text(4, 4, '', {
      fontFamily: 'monospace', fontSize: '5px', color: '#000000', lineSpacing: 2,
    }).setScrollFactor(0).setDepth(10);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT - 5,
      'WASD/ARROWS move+jump   Z/X shoot', {
      fontFamily: 'monospace', fontSize: '4px', color: '#333333',
    }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(10);
  }

  // ─── Update ──────────────────────────────────────────────────────────────────

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

    // Coyote + buffer
    if (grounded)   this._coyoteTime = CONFIG.COYOTE_MS;
    else            this._coyoteTime = Math.max(0, this._coyoteTime - dt);
    if (jumpJust)   this._jumpBuffer = CONFIG.JUMP_BUFFER_MS;
    else            this._jumpBuffer = Math.max(0, this._jumpBuffer - dt);

    // Horizontal
    if (left)       { b.setVelocityX(-CONFIG.WALK_SPEED); p.setFlipX(true);  }
    else if (right) { b.setVelocityX( CONFIG.WALK_SPEED); p.setFlipX(false); }
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

    // Animations
    if (this._hasAnims) {
      const moving = Math.abs(b.velocity.x) > 5;
      let anim = 'p_idle';
      if (!grounded) anim = b.velocity.y < 0 ? 'p_jump' : 'p_fall';
      else if (moving) anim = 'p_run';
      p.anims.play(anim, true);
    }

    // Debug HUD
    this._dbg.setText([
      `vx/vy : ${b.velocity.x.toFixed(0)} / ${b.velocity.y.toFixed(0)}`,
      `pos   : ${p.x.toFixed(0)}, ${p.y.toFixed(0)}`,
      `floor : ${grounded}`,
    ].join('\n'));
  }
}
