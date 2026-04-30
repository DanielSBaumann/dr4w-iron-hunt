import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    console.log('[PauseScene] loaded');

    // Semi-transparent overlay
    this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 0x000000, 0.6).setOrigin(0);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 10, 'PAUSED', {
      fontSize: '12px', color: '#40D0F0', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 6, 'ESC to resume', {
      fontSize: '6px', color: '#4A5E76', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.stop();
      this.scene.resume('GameScene');
    });
  }
}
