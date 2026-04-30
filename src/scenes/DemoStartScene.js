import Phaser from 'phaser';
import { CONFIG } from '../config.js';

const FONT = { fontFamily: '"Press Start 2P", monospace' };
const CX   = CONFIG.WIDTH  / 2;
const CY   = CONFIG.HEIGHT / 2;

/**
 * Title screen for the portfolio demo build.
 *
 * Shows the title_screen image (WebP, loaded by DemoPreloadScene) with:
 *   - "WORK IN PROGRESS" badge
 *   - Blinking "PRESS ANY KEY" prompt
 *
 * On keypress → fade → PlayerTestScene.
 *
 * This replaces the full IntroScene + StartScene flow used in the main game.
 * The demo skips the cinematic intro to get the visitor to gameplay quickly.
 */
export class DemoStartScene extends Phaser.Scene {
  constructor() { super({ key: 'DemoStartScene' }); }

  create() {
    this.cameras.main.setBackgroundColor('#000000');

    this._buildBackground();
    this._buildScanlines();
    this._buildUI();

    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.input.keyboard.once('keydown', () => this._goToDemo());
  }

  _buildBackground() {
    if (!this.textures.exists('title_screen')) return;
    const tex   = this.textures.get('title_screen').getSourceImage();
    const scale = Math.min(CONFIG.WIDTH / tex.width, CONFIG.HEIGHT / tex.height);
    this.add.image(CX, CY, 'title_screen')
      .setOrigin(0.5)
      .setScale(scale)
      .setDepth(1);
  }

  _buildScanlines() {
    const g = this.make.graphics({ add: true });
    g.setDepth(2).setScrollFactor(0);
    for (let y = 0; y < CONFIG.HEIGHT; y += 2) {
      g.fillStyle(0x000000, 0.15);
      g.fillRect(0, y, CONFIG.WIDTH, 1);
    }
  }

  _buildUI() {
    // WIP badge — top centre
    this.add.text(CX, 10, '[ WORK IN PROGRESS ]', {
      ...FONT, fontSize: '5px', color: '#F01820',
    }).setOrigin(0.5).setDepth(5);

    // Press any key prompt — bottom centre, blinking
    const prompt = this.add.text(CX, CONFIG.HEIGHT - 22, '> PRESS ANY KEY <', {
      ...FONT, fontSize: '7px', color: '#40D0F0',
    }).setOrigin(0.5).setDepth(5);

    this.tweens.add({
      targets: prompt, alpha: 0,
      duration: 520, ease: 'Linear', yoyo: true, repeat: -1,
    });
  }

  _goToDemo() {
    let fired = false;
    this.cameras.main.fade(350, 0, 0, 0, true, (_cam, t) => {
      if (t >= 1 && !fired) { fired = true; this.scene.start('PlayerTestScene'); }
    });
  }
}
