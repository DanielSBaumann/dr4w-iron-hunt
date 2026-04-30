import Phaser from 'phaser';
import { CONFIG }      from '../config.js';
import { Player }      from '../entities/Player.js';
import { InputSystem } from '../systems/InputSystem.js';

const WORLD_W  = CONFIG.WIDTH * 6;           // 2304
const GROUND_H = 16;
const GROUND_Y = CONFIG.HEIGHT - GROUND_H;   // 224 — top edge of ground
const FLOOR_CY = GROUND_Y + GROUND_H / 2;   // 232 — center y of ground

const SPAWN_X = 60;
const SPAWN_Y = GROUND_Y - CONFIG.PLAYER_HITBOX_H / 2;  // ~210

const BOSS_MAX_HP       = 12;
const BOSS_PHASE2_HP    = BOSS_MAX_HP / 2;
const BOSS_W            = CONFIG.BOSS.SCRAP_HOUND.w;    // 48
const BOSS_H            = CONFIG.BOSS.SCRAP_HOUND.h;    // 40
const BOSS_ARENA_LEFT   = 1560;
const BOSS_ARENA_RIGHT  = 2275;

// Drones placed at y≈206 so horizontal bullets hit them when player stands on ground
const DRONE_Y           = GROUND_Y - 18;    // 206
const DRONE_HP          = 2;
const DRONE_DETECT      = 200;
const DRONE_SHOOT_MS    = 2400;
const DRONE_SPEED       = 48;

const PLATFORM_TINT     = CONFIG.COLORS.STAGE1_PLATFORM;
const ACCENT_TINT       = CONFIG.COLORS.STAGE1_ACCENT;

export class Stage1Scene extends Phaser.Scene {
  constructor() { super({ key: 'Stage1Scene' }); }

  // ── Lifecycle ─────────────────────────────────────────────────────────────────

  create() {
    this.cameras.main.setBackgroundColor(CONFIG.COLORS.STAGE1_BG);
    this.physics.world.setBounds(0, -CONFIG.HEIGHT * 2, WORLD_W, CONFIG.HEIGHT * 5);

    this._genTextures();

    this._platforms = this.physics.add.staticGroup();
    this._buildLevel();
    this._buildCheckpoint();
    this._buildPlayer();
    this._buildDrones();
    this._buildBoss();
    this._buildOverlaps();

    this.cameras.main.setBounds(0, 0, WORLD_W, CONFIG.HEIGHT);
    this.cameras.main.startFollow(this._player, true, 0.1, 0.1);

    this._input = new InputSystem(this);

    this.scene.launch('HUDScene');
    this.time.delayedCall(120, () => {
      const hud = this.scene.get('HUDScene');
      if (hud?.setPlayerHP) hud.setPlayerHP(CONFIG.PLAYER_MAX_HP, CONFIG.PLAYER_MAX_HP);
    });

    this._active    = true;
    this._bossShown = false;

    this.input.keyboard.on('keydown-ESC', () => {
      if (!this._active) return;
      this.scene.launch('PauseScene');
      this.scene.pause();
    });

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  update(_t, dt) {
    if (!this._active) return;

    this._input.flush();
    this._player.update(dt, this._input);
    this._updateDrones(dt);
    this._updateBoss(dt);
    this._cleanupBullets();

    // Reveal boss HP when player enters arena
    if (!this._bossShown && this._player.x > BOSS_ARENA_LEFT - 80) {
      this._bossShown = true;
      const hud = this.scene.get('HUDScene');
      hud?.showBossHP('SCRAP HOUND');
      hud?.setBossHP(this._bossHp, BOSS_MAX_HP);
    }

    // Pit fall → respawn at last checkpoint
    if (!this._player.isDead && this._player.y > CONFIG.HEIGHT + 60) {
      this._player.respawn(this._checkpointX, this._checkpointY);
    }
  }

  // ── Textures ──────────────────────────────────────────────────────────────────

  _genTextures() {
    if (!this.textures.exists('px')) {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0xFFFFFF); g.fillRect(0, 0, 1, 1);
      g.generateTexture('px', 1, 1); g.destroy();
    }

    if (!this.textures.exists('drone')) {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0x584038); g.fillRect(0, 0, 16, 12);
      g.fillStyle(0xD07028); g.fillRect(2, 2, 12, 8);
      g.fillStyle(0xF01820); g.fillRect(5, 3, 3, 4);
      g.fillStyle(0xF01820); g.fillRect(10, 3, 3, 4);
      g.generateTexture('drone', 16, 12);
      g.destroy();
    }

    if (!this.textures.exists('scrap_hound')) {
      const g = this.make.graphics({ add: false });
      g.fillStyle(0x584038); g.fillRect(0, 0, BOSS_W, BOSS_H);
      g.fillStyle(0xD07028); g.fillRect(6, 6, 36, 28);
      g.fillStyle(0xF01820); g.fillRect(8, 8, 8, 6);
      g.fillStyle(0xF01820); g.fillRect(22, 8, 8, 6);
      g.fillStyle(0x1E2A38); g.fillRect(0, 32, BOSS_W, 8);
      g.generateTexture('scrap_hound', BOSS_W, BOSS_H);
      g.destroy();
    }
  }

  // ── Level layout ──────────────────────────────────────────────────────────────

  _mkPlat(cx, cy, w, h, tint = PLATFORM_TINT) {
    this._platforms.create(cx, cy, 'px')
      .setDisplaySize(w, h).setTint(tint).refreshBody();
  }

  _buildLevel() {
    // Ground segments — gaps at [480-500], [910-940], [1410-1480]
    this._mkPlat(240,  FLOOR_CY, 480, GROUND_H);  // start     [0..480]
    this._mkPlat(720,  FLOOR_CY, 440, GROUND_H);  // mid-1   [500..940]
    this._mkPlat(1175, FLOOR_CY, 470, GROUND_H);  // mid-2  [940..1410]
    this._mkPlat(1892, FLOOR_CY, 824, GROUND_H);  // boss   [1480..2304]

    // Elevated platforms (accent colour, 10px tall)
    this._mkPlat(190,  CONFIG.HEIGHT - 58, 80, 10, ACCENT_TINT);
    this._mkPlat(420,  CONFIG.HEIGHT - 86, 60, 10, ACCENT_TINT);  // before gap 1
    this._mkPlat(550,  CONFIG.HEIGHT - 58, 80, 10, ACCENT_TINT);  // bridge gap 1
    this._mkPlat(760,  CONFIG.HEIGHT - 82, 80, 10, ACCENT_TINT);
    this._mkPlat(970,  CONFIG.HEIGHT - 58, 80, 10, ACCENT_TINT);  // bridge gap 2
    this._mkPlat(1190, CONFIG.HEIGHT - 82, 80, 10, ACCENT_TINT);
    this._mkPlat(1360, CONFIG.HEIGHT - 60, 80, 10, ACCENT_TINT);  // before boss gap
    this._mkPlat(1490, CONFIG.HEIGHT - 54, 60, 10, ACCENT_TINT);  // bridge boss gap
    this._mkPlat(1780, CONFIG.HEIGHT - 68, 80, 10, ACCENT_TINT);  // boss arena
  }

  // ── Checkpoint ────────────────────────────────────────────────────────────────

  _buildCheckpoint() {
    this._checkpointX = SPAWN_X;
    this._checkpointY = SPAWN_Y;

    this._checkpointGroup = this.physics.add.staticGroup();
    const flag = this._checkpointGroup.create(1120, GROUND_Y - 10, 'px');
    flag.setDisplaySize(6, 24).setTint(ACCENT_TINT).refreshBody();
  }

  // ── Player ────────────────────────────────────────────────────────────────────

  _buildPlayer() {
    this._player = new Player(this, SPAWN_X, SPAWN_Y);
    this.physics.add.collider(this._player, this._platforms);

    this._playerBullets = this.physics.add.group();
    this._player.on('shoot', ({ x, y, dir }) => this._firePlayerBullet(x, y, dir));
    this._player.on('player_hurt', ({ hp, max }) => {
      const hud = this.scene.get('HUDScene');
      if (hud?.setPlayerHP) hud.setPlayerHP(hp, max);
    });
    this._player.on('player_dead', () => this._startGameOver());
  }

  _firePlayerBullet(x, y, dir) {
    const tex = this.textures.exists('bullet') ? 'bullet' : '__DEFAULT';
    const b = this._playerBullets.create(x, y, tex);
    b.body.setAllowGravity(false);
    b.body.setVelocityX(dir * CONFIG.BULLET_SPEED);
    if (!this.textures.exists('bullet')) {
      b.setTint(0x40D0F0).setDisplaySize(8, 4);
      b.body.setSize(8, 4);
    }
    if (dir < 0) b.setFlipX(true);
    b.setData('startX', x);
    b.setData('range', CONFIG.BULLET_RANGE);
  }

  // ── Drones ────────────────────────────────────────────────────────────────────

  _buildDrones() {
    this._droneGroup  = this.physics.add.group();
    this._enemyBullets = this.physics.add.group();

    // [x, y, patrolLeft, patrolRight]
    const DRONES = [
      [280,  DRONE_Y, 160, 400],
      [590,  DRONE_Y, 505, 700],
      [800,  DRONE_Y, 700, 920],
      [1100, DRONE_Y, 960, 1250],
      [1380, DRONE_Y, 1280, 1450],
    ];
    DRONES.forEach(([x, y, pl, pr]) => this._spawnDrone(x, y, pl, pr));
  }

  _spawnDrone(x, y, patrolLeft, patrolRight) {
    const d = this._droneGroup.create(x, y, 'drone');
    d.body.setAllowGravity(false);
    d.body.setImmovable(true);
    d.setData({ hp: DRONE_HP, patrolLeft, patrolRight, dir: 1,
      shootTimer: DRONE_SHOOT_MS + Math.random() * 800 });
  }

  _updateDrones(dt) {
    [...this._droneGroup.getChildren()].forEach(d => {
      if (!d.active) return;

      const pl  = d.getData('patrolLeft');
      const pr  = d.getData('patrolRight');
      let dir   = d.getData('dir');
      if (d.x <= pl) dir = 1;
      if (d.x >= pr) dir = -1;
      d.setData('dir', dir);
      d.setFlipX(dir < 0);
      d.body.setVelocityX(dir * DRONE_SPEED);

      let st = d.getData('shootTimer') - dt;
      d.setData('shootTimer', st);
      if (st <= 0 && Math.abs(this._player.x - d.x) < DRONE_DETECT && !this._player.isDead) {
        const sDir = this._player.x > d.x ? 1 : -1;
        this._fireEnemyBullet(d.x + sDir * 10, d.y, sDir);
        d.setData('shootTimer', DRONE_SHOOT_MS + Math.random() * 800);
      }
    });
  }

  _fireEnemyBullet(x, y, dir) {
    const b = this._enemyBullets.create(x, y, '__DEFAULT');
    b.body.setAllowGravity(false);
    b.body.setVelocityX(dir * 130);
    b.setTint(0xF01820).setDisplaySize(7, 4);
    b.body.setSize(7, 4);
    b.setData('startX', x);
    b.setData('range', 340);
  }

  // ── Boss ──────────────────────────────────────────────────────────────────────

  _buildBoss() {
    const bossY = GROUND_Y - BOSS_H / 2;
    this._boss = this.physics.add.sprite(2050, bossY, 'scrap_hound');
    this._boss.body.setSize(BOSS_W - 4, BOSS_H);
    this._boss.setCollideWorldBounds(false);
    this.physics.add.collider(this._boss, this._platforms);

    this._bossHp          = BOSS_MAX_HP;
    this._bossPhase       = 1;
    this._bossDir         = -1;
    this._bossActionTimer = 3200;
    this._bossIframeTimer = 0;
    this._bossDead        = false;
  }

  _updateBoss(dt) {
    if (this._bossDead || !this._boss.active) return;

    this._bossIframeTimer = Math.max(0, this._bossIframeTimer - dt);
    this._bossActionTimer -= dt;

    const spd = this._bossPhase === 1 ? 65 : 98;
    if (this._boss.x <= BOSS_ARENA_LEFT + 30) this._bossDir = 1;
    if (this._boss.x >= BOSS_ARENA_RIGHT - 30) this._bossDir = -1;
    this._boss.body.setVelocityX(this._bossDir * spd);
    this._boss.setFlipX(this._bossDir > 0);

    if (this._bossActionTimer <= 0) {
      this._bossFire();
      const interval = this._bossPhase === 1 ? 3000 : 1800;
      this._bossActionTimer = interval + Math.random() * 800;
    }
  }

  _bossFire() {
    if (this._bossDead) return;
    const dir   = this._player.x < this._boss.x ? -1 : 1;
    const shots = this._bossPhase === 2 ? 2 : 1;
    for (let i = 0; i < shots; i++) {
      this.time.delayedCall(i * 280, () => {
        if (this._bossDead || !this._boss.active) return;
        this._fireEnemyBullet(this._boss.x + dir * 28, this._boss.y - 8, dir);
      });
    }
  }

  // ── Overlaps ──────────────────────────────────────────────────────────────────

  _buildOverlaps() {
    // Player bullets → drones
    this.physics.add.overlap(this._playerBullets, this._droneGroup, (bullet, drone) => {
      bullet.destroy();
      const hp = drone.getData('hp') - 1;
      drone.setData('hp', hp);
      drone.setTint(0xFFFFFF);
      if (hp <= 0) {
        drone.destroy();
      } else {
        this.time.delayedCall(80, () => { if (drone.active) drone.clearTint(); });
      }
    });

    // Player bullets → boss
    this.physics.add.overlap(this._playerBullets, this._boss, (bullet) => {
      bullet.destroy();
      if (this._bossDead || this._bossIframeTimer > 0) return;
      this._bossIframeTimer = 280;
      this._bossHp -= 1;
      this._boss.setTint(0xFFFFFF);
      this.time.delayedCall(100, () => { if (!this._bossDead && this._boss.active) this._boss.clearTint(); });
      const hud = this.scene.get('HUDScene');
      if (hud?.setBossHP) hud.setBossHP(this._bossHp, BOSS_MAX_HP);
      if (this._bossHp <= BOSS_PHASE2_HP && this._bossPhase === 1) {
        this._bossPhase = 2;
        this._bossActionTimer = 600;
        this._boss.setTint(0xFF8040);
        this.time.delayedCall(300, () => { if (this._boss.active) this._boss.clearTint(); });
      }
      if (this._bossHp <= 0) {
        this._bossDead = true;
        this._startWin();
      }
    });

    // Enemy bullets → player
    this.physics.add.overlap(this._player, this._enemyBullets, (_p, bullet) => {
      bullet.destroy();
      this._player.takeDamage(1);
    });

    // Drone contact → player
    this.physics.add.overlap(this._player, this._droneGroup, () => {
      this._player.takeDamage(1);
    });

    // Boss contact → player
    this.physics.add.overlap(this._player, this._boss, () => {
      this._player.takeDamage(1);
    });

    // Checkpoint flag
    this.physics.add.overlap(this._player, this._checkpointGroup, (_p, flag) => {
      if (flag.tintTopLeft !== 0x40D0F0) flag.setTint(0x40D0F0);
      this._checkpointX = flag.x;
      this._checkpointY = SPAWN_Y;
    });
  }

  // ── Bullet housekeeping ───────────────────────────────────────────────────────

  _cleanupBullets() {
    [this._playerBullets, this._enemyBullets].forEach(group => {
      [...group.getChildren()].forEach(b => {
        if (!b.active) return;
        const dx = Math.abs(b.x - (b.getData('startX') ?? 0));
        if (dx > (b.getData('range') ?? 300) || b.y < -60 || b.y > CONFIG.HEIGHT + 60) {
          b.destroy();
        }
      });
    });
  }

  // ── Transitions ───────────────────────────────────────────────────────────────

  _startGameOver() {
    if (!this._active) return;
    this._active = false;
    let fired = false;
    this.time.delayedCall(900, () => {
      this.cameras.main.fade(400, 0, 0, 0, false, (_cam, t) => {
        if (t >= 1 && !fired) {
          fired = true;
          this.scene.stop('HUDScene');
          this.scene.start('GameOverScene');
        }
      });
    });
  }

  _startWin() {
    if (!this._active) return;
    this._active = false;
    this._boss.body.setVelocityX(0);

    // Boss death flicker
    let n = 0;
    this.time.addEvent({
      delay: 160, repeat: 7,
      callback: () => {
        if (!this._boss.active) return;
        this._boss.setVisible(!this._boss.visible);
        if (++n >= 8) this._boss.destroy();
      },
    });

    let fired = false;
    this.time.delayedCall(1600, () => {
      this.cameras.main.fade(600, 0, 0, 0, false, (_cam, t) => {
        if (t >= 1 && !fired) {
          fired = true;
          this.scene.stop('HUDScene');
          this.scene.start('WinScene');
        }
      });
    });
  }
}
