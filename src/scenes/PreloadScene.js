import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    const bar = this.add.rectangle(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 0, 4, 0x40D0F0);
    this.load.on('progress', (v) => { bar.width = CONFIG.WIDTH * v; });
    this.load.on('loaderror', (f) => console.warn('[Preload] missing:', f.key));

    this.load.image('logo',         'assets/artconcepts/dr4w-iron-hunt_LOGO_1.png');
    this.load.image('title_screen', 'assets/artconcepts/title_screen.png');

    // Landscape crops — 512×320 scale exactly to 384×240 (no black bars)
    for (let i = 1; i <= 3; i++) {
      this.load.image(`intro_0${i}`, `assets/artconcepts/intro_0${i}.png`);
    }

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
    this.scene.start('IntroScene');
  }
}
