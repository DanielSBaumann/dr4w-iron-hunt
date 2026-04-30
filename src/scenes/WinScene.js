import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WinScene' });
  }

  create() {
    console.log('[WinScene] loaded');

    this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, CONFIG.COLORS.BACKGROUND).setOrigin(0);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 20, 'STAGE CLEAR', {
      fontSize: '14px', color: '#40D0F0', fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2, 'The signal fell.', {
      fontSize: '7px', color: '#4A5E76', fontFamily: 'monospace',
    }).setOrigin(0.5);

    const prompt = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 20, 'PRESS X TO CONTINUE', {
      fontSize: '8px', color: '#40D0F0', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.tweens.add({ targets: prompt, alpha: 0, duration: 600, yoyo: true, repeat: -1 });

    this.input.keyboard.on('keydown', (e) => {
      if (['KeyX', 'Space', 'Enter'].includes(e.code)) {
        this.scene.stop('HUDScene');
        this.scene.start('MenuScene');
      }
    });
  }
}
