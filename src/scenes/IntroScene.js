import Phaser from 'phaser';
import { CONFIG } from '../config.js';

// ─── Timing (ms) ─────────────────────────────────────────────────────────────
const LOGO_IN   = 600;
const LOGO_HOLD = 500;   // flashes 1 & 2; flash 3 uses 2×
const LOGO_OUT  = 600;
const LOGO_GAP  = 150;  // black between flashes
const PRE_PANEL = 300;  // black before panels start

const PANEL_IN  = 400;  // fade in
const PANEL_HOLD = 1500; // hold at full opacity
const PANEL_OUT  = 500;  // fade out to black

const PANELS = ['intro_01', 'intro_02', 'intro_03'];

const CX = CONFIG.WIDTH  / 2;
const CY = CONFIG.HEIGHT / 2;

function fitScale(img) {
  return Math.min(CONFIG.WIDTH / img.width, CONFIG.HEIGHT / img.height);
}

// ─────────────────────────────────────────────────────────────────────────────

export class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  create() {
    this._phase      = 'logo';  // 'logo' | 'panel'
    this._panelIdx   = -1;
    this._busy       = false;
    this._timer      = null;
    this._currentImg = null;

    this.cameras.main.setBackgroundColor('#000000');
    this._buildScanlines();

    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'Tab') return;
      this._skip();
    });

    this.time.delayedCall(200, () => this._logoFlash(0));
  }

  // ─── Scanlines ───────────────────────────────────────────────────────────────

  _buildScanlines() {
    const g = this.make.graphics({ add: true });
    g.setDepth(50).setScrollFactor(0);
    for (let y = 0; y < CONFIG.HEIGHT; y += 2) {
      g.fillStyle(0x000000, 0.14);
      g.fillRect(0, y, CONFIG.WIDTH, 1);
    }
  }

  // ─── Logo — 3 flashes ────────────────────────────────────────────────────────

  _logoFlash(n) {
    if (this._busy) return;
    if (n >= 3) {
      this.time.delayedCall(PRE_PANEL, () => {
        this._phase = 'panel';
        this._showPanel(0);
      });
      return;
    }

    const logo = this.add.image(CX, CY, 'logo')
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(1);
    logo.setScale(fitScale(logo));
    this._currentImg = logo;

    const holdMs = n === 2 ? LOGO_HOLD * 2.4 : LOGO_HOLD;

    this.tweens.chain({
      targets: logo,
      tweens: [
        { alpha: 1, duration: LOGO_IN,  ease: 'Linear' },
        { alpha: 1, duration: holdMs },
        { alpha: 0, duration: LOGO_OUT, ease: 'Linear' },
      ],
      onComplete: () => {
        logo.destroy();
        this._currentImg = null;
        this._timer = this.time.delayedCall(LOGO_GAP, () => this._logoFlash(n + 1));
      },
    });
  }

  // ─── Panels ──────────────────────────────────────────────────────────────────

  _showPanel(idx) {
    if (idx >= PANELS.length) { this._done(); return; }

    this._panelIdx = idx;
    this._busy     = false;

    if (this._currentImg) { this._currentImg.destroy(); this._currentImg = null; }

    const img = this.add.image(CX, CY, PANELS[idx])
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(1);
    img.setScale(fitScale(img));
    this._currentImg = img;

    // Fade in, then start hold timer
    this.tweens.add({
      targets:  img,
      alpha:    1,
      duration: PANEL_IN,
      ease:     'Linear',
      onComplete: () => {
        if (!this._busy) {
          this._timer = this.time.delayedCall(PANEL_HOLD, () => this._advance());
        }
      },
    });
  }

  // ─── Advance (auto or skip) ───────────────────────────────────────────────────

  _advance() {
    if (this._busy) return;
    this._busy = true;
    this._cancelTimer();

    // Kill any in-progress tween on the image (handles skip-during-fade-in)
    if (this._currentImg) this.tweens.killTweensOf(this._currentImg);

    this.tweens.add({
      targets:  this._currentImg,
      alpha:    0,
      duration: PANEL_OUT,
      ease:     'Linear',
      onComplete: () => {
        if (this._currentImg) { this._currentImg.destroy(); this._currentImg = null; }
        this._showPanel(this._panelIdx + 1);
      },
    });
  }

  // ─── Skip ────────────────────────────────────────────────────────────────────

  _skip() {
    if (this._busy) return;

    if (this._phase === 'logo') {
      // Skip entire logo sequence → jump directly to panels
      this._busy = true;
      this.tweens.killAll();
      this._cancelTimer();
      if (this._currentImg) { this._currentImg.destroy(); this._currentImg = null; }

      let fired = false;
      this.cameras.main.fade(250, 0, 0, 0, false, (_cam, t) => {
        if (t >= 1 && !fired) {
          fired = true;
          this.cameras.main.resetFX();
          this._busy  = false;
          this._phase = 'panel';
          this._showPanel(0);
        }
      });
      return;
    }

    // During panel → advance to next
    this._advance();
  }

  // ─── Done ────────────────────────────────────────────────────────────────────

  _done() {
    let fired = false;
    this.cameras.main.fade(600, 0, 0, 0, false, (_cam, t) => {
      if (t >= 1 && !fired) { fired = true; this.scene.start('StartScene'); }
    });
  }

  _cancelTimer() {
    if (this._timer) { this._timer.remove(false); this._timer = null; }
  }
}
