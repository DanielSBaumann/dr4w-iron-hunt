import Phaser from 'phaser';
import { CONFIG } from './config.js';

// ── Bootstrap (always present) ────────────────────────────────────────────
import { BootScene }     from './scenes/BootScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

// ── Demo build scenes ──────────────────────────────────────────────────────
// Loaded only when VITE_DEMO === 'true' (npm run build:demo).
// Tree-shaking removes them from the main game bundle.
import { DemoPreloadScene } from './scenes/DemoPreloadScene.js';
import { DemoStartScene }   from './scenes/DemoStartScene.js';
import { PlayerTestScene }  from './scenes/PlayerTestScene.js';

// ── Main game scenes ───────────────────────────────────────────────────────
import { PreloadScene }  from './scenes/PreloadScene.js';
import { IntroScene }    from './scenes/IntroScene.js';
import { StartScene }    from './scenes/StartScene.js';
import { Stage1Scene }   from './scenes/Stage1Scene.js';
import { MenuScene }     from './scenes/MenuScene.js';
import { GameScene }     from './scenes/GameScene.js';
import { HUDScene }      from './scenes/HUDScene.js';
import { PauseScene }    from './scenes/PauseScene.js';
import { WinScene }      from './scenes/WinScene.js';

// ── Scene selection ────────────────────────────────────────────────────────
// VITE_DEMO is injected at build time by vite.config.js define.
// Demo flow: Boot → DemoPreload → DemoStart → PlayerTest → GameOver
// Full game: Boot → Preload → Intro → Start → PlayerTest → Stage1 → …
const DEMO = import.meta.env.VITE_DEMO === 'true';

const scenes = DEMO
  ? [
      BootScene,
      DemoPreloadScene,
      DemoStartScene,
      PlayerTestScene,
      GameOverScene,
    ]
  : [
      BootScene,
      PreloadScene,
      IntroScene,
      StartScene,
      PlayerTestScene,
      Stage1Scene,
      MenuScene,
      GameScene,
      HUDScene,
      PauseScene,
      GameOverScene,
      WinScene,
    ];

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
  scene: scenes,
  backgroundColor: '#000000',
  pixelArt:  true,
  antialias: false,
});
