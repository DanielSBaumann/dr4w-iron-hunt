import Phaser from 'phaser';
import { CONFIG } from '../config.js';

const FONT   = { fontFamily: '"Press Start 2P", monospace' };
const FADE   = 600;
const CX     = CONFIG.WIDTH  / 2;
const CY     = CONFIG.HEIGHT / 2;

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    this._buildBackground();
    this._buildPrompt();
    this._buildScanlines();
    this._listenInput();

    // Fade in from black
    this.cameras.main.fadeIn(FADE, 0, 0, 0);
  }

  // ─── Background / title ──────────────────────────────────────────────────────

  _buildBackground() {
    if (this.textures.exists('title_screen')) {
      const tex   = this.textures.get('title_screen').getSourceImage();
      const scale = Math.min(CONFIG.WIDTH / tex.width, CONFIG.HEIGHT / tex.height);
      this.add.image(CX, CY, 'title_screen')
        .setOrigin(0.5, 0.5)
        .setScale(scale)
        .setDepth(1);
    } else {
      // Text fallback (should never happen after preload)
      this.add.rectangle(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT, 0x0D111A).setOrigin(0);
      this.add.text(CX, CY - 30, 'DR4W',      { ...FONT, fontSize: '22px', color: '#40D0F0' }).setOrigin(0.5);
      this.add.text(CX, CY -  5, 'IRON HUNT', { ...FONT, fontSize: '10px', color: '#F01820', letterSpacing: 6 }).setOrigin(0.5);
    }
  }

  // ─── Blinking PRESS START prompt ─────────────────────────────────────────────

  _buildPrompt() {
    const prompt = this.add.text(CX, CONFIG.HEIGHT - 26, '> PRESS START <', {
      ...FONT,
      fontSize: '7px',
      color: '#40D0F0',
    }).setOrigin(0.5).setDepth(5);

    this.tweens.add({
      targets:  prompt,
      alpha:    0,
      duration: 520,
      ease:     'Linear',
      yoyo:     true,
      repeat:   -1,
    });
  }

  // ─── Scanlines ────────────────────────────────────────────────────────────────

  _buildScanlines() {
    const g = this.make.graphics({ add: true });
    g.setDepth(20).setScrollFactor(0);
    for (let y = 0; y < CONFIG.HEIGHT; y += 2) {
      g.fillStyle(0x000000, 0.15);
      g.fillRect(0, y, CONFIG.WIDTH, 1);
    }
  }

  // ─── Input ───────────────────────────────────────────────────────────────────

  _listenInput() {
    this.input.keyboard.once('keydown', () => this._goToGame());
  }

  _goToGame() {
    let fired = false;
    this.cameras.main.fade(300, 0, 0, 0, true, (_cam, t) => {
      if (t >= 1 && !fired) { fired = true; this.scene.start('Stage1Scene'); }
    });
  }
}
