import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class Projectile extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, dir) {
    const hasTex = scene.textures.exists('bullet');
    super(scene, x, y, hasTex ? 'bullet' : '__DEFAULT');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.body.setVelocityX(dir * CONFIG.BULLET_SPEED);

    // Flip sprite if going left
    if (dir < 0) this.setFlipX(true);

    this._startX = x;
    this._dir    = dir;

    // Tint fallback rect if no texture
    if (!hasTex) this.setTint(0x40D0F0).setDisplaySize(8, 4);
  }

  update() {
    if (Math.abs(this.x - this._startX) >= CONFIG.BULLET_RANGE) {
      this.destroy();
    }
  }
}
