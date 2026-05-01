import { CONFIG } from '../config.js';

export class CameraSystem {
  constructor(scene, target, worldW, zoom = 1.5) {
    const cam = scene.cameras.main;
    cam.setZoom(zoom);
    cam.setBounds(0, 0, worldW, CONFIG.HEIGHT);
    cam.startFollow(target, true, 0.12, 0.12);
    this._cam = cam;
  }

  stopFollow() {
    this._cam.stopFollow();
  }
}
