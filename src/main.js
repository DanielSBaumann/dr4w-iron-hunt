import Phaser from 'phaser';
import { CONFIG } from './config.js';

// ── Bootstrap ──────────────────────────────────────────────────────────────
import { BootScene }     from './scenes/BootScene.js';
import { PreloadScene }  from './scenes/PreloadScene.js';

// ── Vertical slice flow (intro → test) ────────────────────────────────────
import { IntroScene }       from './scenes/IntroScene.js';
import { StartScene }       from './scenes/StartScene.js';
import { PlayerTestScene }  from './scenes/PlayerTestScene.js';

// ── Legacy game scenes (Milestone 0, kept for reference) ──────────────────
import { MenuScene }     from './scenes/MenuScene.js';
import { GameScene }     from './scenes/GameScene.js';
import { HUDScene }      from './scenes/HUDScene.js';
import { PauseScene }    from './scenes/PauseScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { WinScene }      from './scenes/WinScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width:  CONFIG.WIDTH,
  height: CONFIG.HEIGHT,
  scale: {
    mode:       Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: CONFIG.GRAVITY_Y },
      debug: false,
    },
  },
  scene: [
    BootScene,
    PreloadScene,
    // Vertical slice flow
    IntroScene,
    StartScene,
    PlayerTestScene,
    // Legacy scenes (not removed — reachable via GameScene)
    MenuScene,
    GameScene,
    HUDScene,
    PauseScene,
    GameOverScene,
    WinScene,
  ],
  backgroundColor: '#000000',
  pixelArt:  true,
  antialias: false,
});
