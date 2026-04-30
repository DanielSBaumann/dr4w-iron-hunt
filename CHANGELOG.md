# Changelog

## [0.3.0] — Milestone 1 — Stage 1 jogável — 2026-04-29

### Adicionado
- **Stage1Scene**: fase 1 completa — mundo 2304×240, fundo ferrugem, 4 segmentos de chão
  com gaps jumpáveis, 9 plataformas elevadas (paleta Stage 1)
- **PatrolDrone**: 5 inimigos voadores inline — patrulha entre pontos, detecta jogador em
  200px, atira projétil de dano a cada ~2.4s, 2 HP, flash branco ao receber dano
- **Scrap Hound (boss)**: FSM com 2 fases — Fase 1 (HP>6): anda + 1 tiro a cada 3s;
  Fase 2 (HP≤6): mais veloz, 2 tiros por rajada a cada 1.8s, flash laranja na transição
- **Sistema de HP do Player**: `takeDamage(amount)`, `respawn(x, y)`, i-frames de 1200ms
  com flash de transparência (80ms ciclo), estado `isDead`, evento `player_dead`
- **Projéteis inimigos**: bullets vermelhos 7×4 disparados por drones e boss, sem gravidade
- **Colisões completas**: player bullets → drone, player bullets → boss, enemy bullets →
  player, contato drone/boss → player (todos com guarda de i-frames)
- **Checkpoint flag**: flag laranja em x=1120; fica ciana ao tocar; salva posição de
  respawn; queda em pit → respawn no último checkpoint com HP preservado
- **HUD integrado**: HP do jogador atualizado por evento `player_hurt`; HP do boss exibido
  ao entrar na arena (x>1480), atualizado a cada hit
- **Fluxo de cenas**: StartScene → Stage1Scene → WinScene (boss morto) ou GameOverScene
  (HP=0); WinScene volta ao StartScene; GameOverScene volta ao Stage1Scene
- **Boss death VFX**: boss pisca 8× antes de desaparecer; fade preto → WinScene

### Corrigido
- `GameOverScene` apontava para `GameScene` (M0) — agora reinicia `Stage1Scene`
- `WinScene` apontava para `MenuScene` — agora retorna ao `StartScene`
- `Player.update()` não retornava quando `_dead = true` — movimento continuava após morte

### Alterado
- `StartScene._goToGame()`: transição agora vai para `Stage1Scene` em vez de `PlayerTestScene`
- `Player.js`: adicionado HP system, i-frames, `isDead`/`isInvincible`/`hp` getters

---

## [0.2.0] — Vertical Slice — 2026-04-29

### Adicionado
- **IntroScene** completa: logo com 3 flashes (fade in/out encadeado via `tweens.chain`),
  seguido de 3 painéis de história com fade de 400ms entrada / 1500ms hold / 500ms saída
- **Skip de intro**: qualquer tecla (exceto Tab) avança o painel; durante a logo, pula toda
  a sequência com fade de 250ms para preto
- **StartScene**: tela título com imagem `title_screen.png` escalada por `fitScale`,
  prompt "> PRESS START <" piscante, fade de entrada de 600ms
- **PlayerTestScene**: arena de testes jogável — fundo branco, plataformas estilo industrial,
  câmera seguindo o personagem, debug HUD com estado físico em tempo real
- **Extração de sprites reais**: `tools/generate_assets.py` lê `sprites.png` (arte de
  referência 1024×1536) e extrai sprites do Dr4w via análise de pixels; remove background
  laranja-acastanhado; escala cada pose para 32×32 e monta atlas `player.png` (192×256)
- **Animações do Dr4w**: idle (3f), run (4f), jump (1f), fall (1f), shoot_idle (2f),
  shoot_run (4f), hurt (2f), dead (6f) — todas mapeadas do atlas extraído
- **Física completa**: coyote time (100ms), jump buffer (100ms), variable jump height
  (corte de velocidade ao soltar o botão), velocidade máxima de queda, colisão com mundo
- **Sistema de tiro**: teclas Z/X disparam projétil; bullet.png 8×4 gerado programaticamente
- **Efeitos**: muzzle_flash.png gerado; flash branco no sprite ao atirar (40ms)
- **CHANGELOG.md** e **README.md** completos

### Corrigido
- Escala do jogo: `scale.width/height: 1152/720` no config do Phaser sobrescrevia a
  resolução interna para 1152×720, fazendo todo o conteúdo (posicionado em 384×240)
  aparecer em apenas 1/9 da tela — removido; jogo agora roda em 384×240 com FIT para
  preencher a janela
- Tela preta na PlayerTestScene: `Phaser.Geom.Line` não disponível como namespace global
  no build ESM via Vite causava crash silencioso em `create()` antes do primeiro frame
- Transição StartScene → PlayerTestScene: `camera.fade(..., force:false)` bloqueado pelo
  `fadeIn` de entrada ainda em andamento nunca disparava o callback; corrigido com `force:true`
  e timeout reduzido para 300ms
- Tecla Tab durante a intro causava tela preta e travamento: Tab agora ignorado no handler
  de keydown (é tecla de navegação do browser, não do jogo)
- `generate_assets.py` sobrescrevia `intro_0n.png` com versões geradas ao ser executado —
  removidas as chamadas de `extract_intro_panels()`, `build_intro_sharp()` e `build_intro_bgs()`
  do bloco `__main__`; o script agora toca apenas sprites e efeitos

### Alterado
- `PreloadScene`: carrega `intro_0n.png` (imagens do usuário) em vez de `intro_0n_sharp.png`
- Paleta de plataformas na PlayerTestScene: tons de `#4A5E76` / `#3A4E62` (especular da
  armadura) sobre fundo branco

---

## [0.1.0] — Milestone 0 — Game Loop — data anterior

### Adicionado
- Bootstrap: Phaser 3.90.0 + Vite 6.4.2, `npm run dev` funcional
- `src/config.js` com todas as constantes de física, paleta, animações e boss sizes
- 8 cenas conectadas: Boot → Preload → Menu → Game + HUD/Pause/GameOver/Win
- Entidades stub: Player, Enemy, Projectile
- Sistemas stub: InputSystem (WASD/Setas/Space/Z/X), CameraSystem
- Dados de nível stub: Stage1–4
- `player-placeholder.png` (192×256, paleta Dr4w) e `tileset-stage1-placeholder.png`
- Docs: CONTEXT.md, MILESTONES.md, asset-audit.md, asset-map.md
- Game loop confirmado: jogador se move, colide com chão, pula com física correta
