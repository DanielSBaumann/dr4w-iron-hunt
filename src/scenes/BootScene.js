import Phaser from 'phaser';

const DEMO = import.meta.env.VITE_DEMO === 'true';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.scene.start(DEMO ? 'DemoPreloadScene' : 'PreloadScene');
  }
}
