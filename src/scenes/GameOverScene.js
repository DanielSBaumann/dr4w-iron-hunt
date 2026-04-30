import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    console.log('[GameOverScene] loaded');

    this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, CONFIG.COLORS.BACKGROUND).setOrigin(0);

    this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 - 16, 'GAME OVER', {
      fontSize: '16px', color: '#F01820', fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5);

    const prompt = this.add.text(CONFIG.WIDTH / 2, CONFIG.HEIGHT / 2 + 10, 'PRESS X TO RETRY', {
      fontSize: '8px', color: '#40D0F0', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.tweens.add({ targets: prompt, alpha: 0, duration: 500, yoyo: true, repeat: -1 });

    this.input.keyboard.on('keydown', (e) => {
      if (['KeyX', 'Space', 'Enter'].includes(e.code)) {
        this.scene.stop('HUDScene');
        this.scene.start('GameScene');
        this.scene.launch('HUDScene');
      }
    });
  }
}
