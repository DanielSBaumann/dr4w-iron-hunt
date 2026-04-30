import Phaser from 'phaser';
import { CONFIG } from '../config.js';
import { InputSystem }  from '../systems/InputSystem.js';
import { CameraSystem } from '../systems/CameraSystem.js';
import { Player }       from '../entities/Player.js';

const WORLD_W  = CONFIG.WIDTH * 3;   // 1152px — 3 screens wide
const FLOOR_Y  = CONFIG.HEIGHT - 8;  // floor center y
const FLOOR_H  = 16;

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    console.log('[GameScene] loaded');

    this._dead = false;

    // Background
    this.add.rectangle(0, 0, WORLD_W, CONFIG.HEIGHT, CONFIG.COLORS.STAGE1_BG).setOrigin(0);

    // Shared 1×1 white pixel texture for tinted rects
    if (!this.textures.exists('px')) {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0xFFFFFF);
      g.fillRect(0, 0, 1, 1);
      g.generateTexture('px', 1, 1);
      g.destroy();
    }

    // --- Platforms (StaticGroup) ---
    const platforms = this.physics.add.staticGroup();

    const mkPlatform = (cx, cy, w, h) =>
      platforms.create(cx, cy, 'px')
        .setDisplaySize(w, h)
        .setTint(CONFIG.COLORS.STAGE1_PLATFORM)
        .refreshBody();

    // Floor: two segments with a gap at x 176-256 (5-tile gap, jumpable)
    mkPlatform(88,             FLOOR_Y, 176,       FLOOR_H); // left ground
    mkPlatform(256 + (WORLD_W - 256) / 2, FLOOR_Y, WORLD_W - 256, FLOOR_H); // right ground

    // Raised platforms
    mkPlatform(320, CONFIG.HEIGHT - 52, 80, 10);
    mkPlatform(500, CONFIG.HEIGHT - 80, 80, 10);
    mkPlatform(700, CONFIG.HEIGHT - 48, 96, 10);

    // --- Player ---
    Player.generateTexture(this);
    const spawnY = FLOOR_Y - FLOOR_H / 2 - CONFIG.PLAYER_HITBOX_H / 2;
    this.player = new Player(this, 60, spawnY);

    this.physics.add.collider(this.player, platforms);

    // --- Input ---
    this.input_system = new InputSystem(this);

    // --- Camera ---
    this.camera_system = new CameraSystem(this, this.player, WORLD_W);

    // --- HUD label ---
    this.add.text(4, 4, 'M0 — walk, jump, fall into the gap', {
      fontSize: '5px', color: '#4A5E76', fontFamily: 'monospace',
    }).setScrollFactor(0);

    // --- Pause ---
    this.input.keyboard.on('keydown-ESC', () => {
      if (this._dead) return;
      this.scene.launch('PauseScene');
      this.scene.pause();
    });
  }

  update(_time, delta) {
    if (this._dead) return;

    this.input_system.flush();
    this.player.update(delta, this.input_system);

    // Fall-death: player dropped below the world
    if (this.player.y > CONFIG.HEIGHT + 32) {
      this._dead = true;
      this.camera_system.stopFollow();
      this.time.delayedCall(400, () => {
        this.scene.stop('HUDScene');
        this.scene.start('GameOverScene');
      });
    }
  }
}
