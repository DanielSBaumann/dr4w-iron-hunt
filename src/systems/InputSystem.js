import Phaser from 'phaser';

const ACTION_MAP = {
  ArrowLeft:  'left',
  KeyA:       'left',
  ArrowRight: 'right',
  KeyD:       'right',
  ArrowUp:    'jump',
  KeyW:       'jump',
  Space:      'jump',
  ArrowDown:  'down',
  KeyS:       'down',
  KeyZ:       'shoot',
  KeyX:       'shoot',
};

export class InputSystem {
  constructor(scene) {
    this._held        = {};
    this._justPressed = {};

    scene.input.keyboard.on('keydown', (event) => {
      const action = ACTION_MAP[event.code];
      if (!action) return;
      if (!this._held[action]) {
        this._justPressed[action] = true;
        console.log(`[InputSystem] keydown → ${action} (${event.code})`);
      }
      this._held[action] = true;
    });

    scene.input.keyboard.on('keyup', (event) => {
      const action = ACTION_MAP[event.code];
      if (!action) return;
      this._held[action] = false;
    });
  }

  // Call at the start of each scene update frame
  flush() {
    this._justPressed = {};
  }

  isHeld(action)      { return !!this._held[action]; }
  justPressed(action) { return !!this._justPressed[action]; }
}
