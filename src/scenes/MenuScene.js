import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    console.log('[MenuScene] loaded');
    const cx = CONFIG.WIDTH  / 2;
    const cy = CONFIG.HEIGHT / 2;

    this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, CONFIG.COLORS.BACKGROUND)
      .setOrigin(0);

    this.add.text(cx, cy - 40, 'IRON HUNT', {
      fontSize: '20px',
      color: '#40D0F0',
      fontFamily: 'monospace',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(cx, cy - 22, 'Year 2194. The war is over. The hunt is not.', {
      fontSize: '6px',
      color: '#4A5E76',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const prompt = this.add.text(cx, cy + 20, 'PRESS X OR SPACE TO START', {
      fontSize: '8px',
      color: '#40D0F0',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    // Blink prompt
    this.tweens.add({
      targets: prompt,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    // Start on X, Space, or Enter
    this.input.keyboard.on('keydown', (e) => {
      if (['KeyX', 'Space', 'Enter'].includes(e.code)) {
        this.scene.start('GameScene');
        this.scene.launch('HUDScene');
      }
    });
  }
}
