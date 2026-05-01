import Phaser from 'phaser';
import { CONFIG } from '../config.js';

/**
 * Lightweight preload scene for the portfolio demo build.
 *
 * Loads only what the demo flow requires:
 *   - WebP versions of logo and title screen (from public/assets-demo/)
 *   - Player spritesheet and bullet PNG (already tiny, no WebP needed)
 *
 * Intentionally excludes intro panels (intro_01/02/03) — the demo skips
 * the full intro sequence to minimise initial load time for portfolio visitors.
 *
 * Main game: uses PreloadScene, which loads PNGs and intro panels.
 * Demo build: uses this scene, which loads WebP-only essentials.
 */
export class DemoPreloadScene extends Phaser.Scene {
  constructor() { super({ key: 'DemoPreloadScene' }); }

  preload() {
    const bar = this.add.rectangle(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 0, 4, 0x40D0F0);
    this.load.on('progress', (v) => { bar.width = CONFIG.WIDTH * v; });
    this.load.on('loaderror', (f) => console.warn('[DemoPreload] missing asset:', f.key));

    // WebP demo assets — converted from PNG originals by tools/convert_demo_assets.py
    this.load.image('logo',         'assets-demo/artconcepts/dr4w-iron-hunt_LOGO_1.webp');
    this.load.image('title_screen', 'assets-demo/artconcepts/title_screen.webp');

    // Sprite assets remain PNG — already small (32KB / <4KB), no benefit from WebP
    this.load.spritesheet('player', 'assets/sprites/player/player.png', {
      frameWidth:  CONFIG.PLAYER_FRAME_W,
      frameHeight: CONFIG.PLAYER_FRAME_H,
    });
    this.load.spritesheet('player_64x64', 'assets/sprites/player/player_64x64.png', {
      frameWidth: 128, frameHeight: 128,
    });
    this.load.image('bullet', 'assets/sprites/effects/bullet.png');
  }

  create() {
    this.scene.start('DemoStartScene');
  }
}
