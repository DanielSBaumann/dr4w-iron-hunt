import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    console.log('[HUDScene] loaded');

    // Player HP bar — left corner (matches hud-mock-concept.png)
    this.add.text(4, 4, 'DR4W', { fontSize: '6px', color: '#E8DCC8', fontFamily: 'monospace' });
    this.add.rectangle(4, 14, 6, 40, 0x1A1A2A).setOrigin(0);    // background
    this._playerHPBar = this.add.rectangle(4, 14, 6, 40, CONFIG.COLORS.VISOR_CYAN).setOrigin(0);

    // Boss HP bar — right corner
    this._bossLabel = this.add.text(CONFIG.WIDTH - 30, 4, 'BOSS', {
      fontSize: '6px', color: '#E8DCC8', fontFamily: 'monospace',
    }).setVisible(false);
    this.add.rectangle(CONFIG.WIDTH - 10, 14, 6, 40, 0x1A1A2A).setOrigin(0).setVisible(false);
    this._bossHPBar = this.add.rectangle(CONFIG.WIDTH - 10, 14, 6, 40, 0xE07060).setOrigin(0)
      .setVisible(false);
  }

  setPlayerHP(current, max) {
    this._playerHPBar.height = Math.max(0, Math.round(40 * current / max));
  }

  showBossHP(name) {
    this._bossLabel.setText(name).setVisible(true);
    this._bossHPBar.setVisible(true);
  }

  setBossHP(current, max) {
    this._bossHPBar.height = Math.max(0, Math.round(40 * current / max));
  }
}
