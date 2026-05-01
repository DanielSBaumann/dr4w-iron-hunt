# DR4W: Iron Hunt

> 2D action platformer — Mega Man-style, pixel art, browser-first.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Engine](https://img.shields.io/badge/engine-Phaser%203.90-blue)
![Language](https://img.shields.io/badge/language-JavaScript%20ES2022-yellow)

---

## O jogo

**Ano 2194.** A guerra entre humanos e máquinas terminou. A caça, não.

Dr4w é um droide combatente humanoide que acorda no meio dos escombros e descobre que o **IRON HUNT** — protocolo de extermínio automatizado — ainda está ativo. Ele é o único que pode desligá-lo.

Três fases + boss final. Ação e plataforma no estilo clássico dos anos 90.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Engine | Phaser 3.90.0 (Arcade Physics, WebGL/Canvas) |
| Build | Vite 6.4.2 |
| Linguagem | JavaScript ES2022 (módulos nativos) |
| Assets | Python 3 + Pillow (geração/extração de sprites) |
| Resolução interna | 384×240 px (pixel art) |
| Escala de exibição | FIT automático — preenche a janela do browser |
| Paleta do Dr4w | `#1E2A38` `#141E2A` `#40D0F0` `#F01820` `#4A5E76` |

---

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
```

## Gerar assets

```bash
python3 tools/generate_assets.py
```

> Requer Python 3 + Pillow (`pip install Pillow`).
> Extrai sprites do Dr4w de `public/assets/artconcepts/sprites.png`
> e gera `public/assets/sprites/player/player.png` (atlas 192×256).

## Build

```bash
npm run build          # → dist/  (jogo principal — assets PNG, todas as cenas)
npm run build:pages    # → dist/  com base=/dr4w-iron-hunt/ para GitHub Pages
npm run preview        # prévia do build principal
```

### Build da demo web (portfólio)

A demo é um build separado com assets WebP otimizados e flow simplificado (sem intro cinemática).
Os PNGs do jogo principal nunca são tocados.

```bash
npm run build:demo     # → dist-demo/  (~1.8MB, gzipado ~650KB)
npm run preview:demo   # prévia em http://localhost:4174/dr4w-iron-hunt/
```

**Diferenças entre builds:**

| | Jogo principal | Demo (portfólio) |
|---|---|---|
| Assets de cena | PNG (qualidade máxima) | WebP (~92% menor) |
| Flow de cenas | Boot → Preload → Intro → Start → … | Boot → DemoPreload → DemoStart → PlayerTest |
| HUD | Debug HUD completo | Hint de controles minimalista |
| Fundo PlayerTest | Branco | `STAGE1_BG` escuro |
| Tiro | Habilitado | Habilitado |
| Deploy | GitHub Pages / itch.io | GitHub Pages (`/dr4w-iron-hunt/`) |

> **Deploy do GitHub Pages é manual.** Não há CI/CD automático. Após revisar a branch,
> copiar o conteúdo de `dist-demo/` para o branch `gh-pages` manualmente.

### Converter assets para WebP (demo)

```bash
pip install Pillow
python3 tools/convert_demo_assets.py
```

Converte apenas `dr4w-iron-hunt_LOGO_1.png` e `title_screen.png` para WebP em
`public/assets-demo/artconcepts/`. Os PNGs originais em `public/assets/artconcepts/`
não são modificados.

---

## Fluxo de cenas

**Jogo principal:**
```
Boot → Preload → Intro (logo ×3 + painéis ×3) → Start (título) → PlayerTestScene
                                                                         ↓
                                                               (→ Stage1Scene — Milestone 1)
```

**Demo (portfólio):**
```
Boot → DemoPreload → DemoStart (título com WebP) → PlayerTestScene → GameOverScene
```

### Controles (PlayerTestScene)

| Tecla | Ação |
|---|---|
| `A` / `←` | Mover esquerda |
| `D` / `→` | Mover direita |
| `W` / `↑` / `Space` | Pular |
| `Z` / `X` | Atirar |

Coyote time + jump buffer implementados.

---

## Estrutura

```
dr4w-iron-hunt/
├── public/
│   ├── assets/
│   │   ├── artconcepts/        # arte de referência PNG (logo, título, intro, sprites ref)
│   │   ├── sprites/player/     # player.png — atlas gerado
│   │   ├── sprites/effects/    # bullet.png, muzzle_flash.png
│   │   └── audio/              # (próximo milestone)
│   └── assets-demo/
│       └── artconcepts/        # WebP otimizados — APENAS para demo build
├── src/
│   ├── main.js             # bootstrap Phaser (alterna cenas por VITE_DEMO)
│   ├── config.js           # constantes globais (física, paleta, animações)
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── PreloadScene.js          # jogo principal
│   │   ├── DemoPreloadScene.js      # demo — carrega WebP + sprites PNG
│   │   ├── IntroScene.js            # logo + 3 painéis de história com skip
│   │   ├── StartScene.js            # tela título (jogo principal)
│   │   ├── DemoStartScene.js        # tela título simplificada (demo)
│   │   ├── PlayerTestScene.js       # arena de teste: movimento, pulo, tiro
│   │   ├── Stage1Scene.js           # Fase 1 completa (Milestone 1)
│   │   └── [Game/HUD/Menu/Pause/GameOver/Win]Scene.js
│   ├── entities/
│   │   ├── Player.js       # Dr4w: física, animações, tiro, HP, i-frames
│   │   └── Projectile.js   # projétil
│   └── systems/
│       └── InputSystem.js  # WASD/Setas/Space/Z/X → ações nomeadas
├── tools/
│   ├── generate_assets.py      # extrai sprites da ref e gera atlas + efeitos
│   └── convert_demo_assets.py  # converte artconcepts PNG → WebP para demo
├── docs/
│   ├── CONTEXT.md, MILESTONES.md
│   ├── game-design/             # GDD, história, design de personagem e mundo
│   └── specs/web-demo-embed.md  # SDD do sistema de embed no portfólio
└── artconcepts/                 # arte conceitual original (não servida)
```

---

## Spritesheet do Dr4w

Atlas `player.png` — 192×256 px, 6 colunas × 8 linhas, frames 32×32.

| Linha | Animação | Frames |
|---|---|---|
| 0 | idle | 3 |
| 1 | run | 4 |
| 2 | jump | 1 |
| 3 | fall | 1 |
| 4 | shoot_idle | 2 |
| 5 | shoot_run | 4 |
| 6 | hurt | 2 |
| 7 | dead | 6 |

Extraído por pixel analysis de `sprites.png` (arte de referência em alta resolução).

---

## Roadmap

- ✅ **Bootstrap** — Phaser + Vite, config, stubs de cenas e entidades
- ✅ **Milestone 0** — game loop: movimento, pulo, física, câmera
- ✅ **Vertical Slice** — intro completa, título, sprites extraídos, tela de teste jogável
- 🔲 **Milestone 1** — Stage 1: inimigos, boss Scrap Hound, HUD
- 🔲 **Milestone 2** — Stage 2 + Widow Relay boss
- 🔲 **Milestone 3** — Stage 3 + Bastion Executor boss
- 🔲 **Milestone 4** — Stage 4 + Crown Engine (boss final)
- 🔲 **Milestone 5** — Arte final (sprites e tilesets definitivos)
- 🔲 **Milestone 6** — Polish: screen shake, partículas, transições
- 🔲 **Milestone 7** — Ship: itch.io + GitHub Pages

---

## Docs

- [`docs/CONTEXT.md`](docs/CONTEXT.md) — constantes, paleta, decisões de arquitetura
- [`docs/MILESTONES.md`](docs/MILESTONES.md) — checklist completo
- [`docs/game-design/`](docs/game-design/) — GDD, história, design de personagem e mundo
- [`docs/specs/web-demo-embed.md`](docs/specs/web-demo-embed.md) — SDD: embed da demo no portfólio dr4w.io
- [`docs/web-demo.md`](docs/web-demo.md) — guia de arquitetura e operação da demo web

---

## Licença

Projeto pessoal — todos os direitos reservados.
Arte conceitual e sprites © DR4W / dr4wone@gmail.com
