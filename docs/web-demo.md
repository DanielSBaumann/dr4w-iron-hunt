# Web Demo — Arquitetura e Operação

Demo jogável do DR4W: Iron Hunt para embed no portfólio dr4w.io.

---

## Decisão de arquitetura

**Codebase único com múltiplos build modes** (Vite `--mode`).

Alternativas consideradas e descartadas:
- Fork do repositório → duplicação de manutenção
- Subdiretório separado → partilha de deps frágil
- Runtime feature flags → dead code no bundle de produção

A solução escolhida usa `VITE_DEMO` como constante compile-time injetada via
`vite.config.js define`. O Rollup faz tree-shaking de ramos mortos: cenas da demo
não entram no bundle do jogo principal, e vice-versa.

---

## Vite demo mode

### Como funciona

```js
// vite.config.js
define: {
  'import.meta.env.VITE_DEMO': JSON.stringify(isDemo ? 'true' : 'false'),
}
```

Em qualquer cena, verificar `import.meta.env.VITE_DEMO === 'true'` retorna um literal
booleano após compilação. O Rollup elimina o ramo falso inteiramente.

### Build modes disponíveis

| Comando | `VITE_DEMO` | `outDir` | `base` |
|---|---|---|---|
| `npm run dev` | `'false'` | — | `'./'` |
| `npm run build` | `'false'` | `dist/` | `'./'` |
| `npm run build:pages` | `'false'` | `dist/` | `'/dr4w-iron-hunt/'` |
| `npm run build:demo` | `'true'` | `dist-demo/` | `'/dr4w-iron-hunt/'` |

### `demoPrunePlugin`

Vite copia todo o diretório `public/` para o `outDir` de cada build, independentemente
do que o código carrega. Os PNGs de artconcept (18MB) acabariam em `dist-demo/` mesmo
sem nenhuma cena os referenciar.

O plugin `demoPrunePlugin` (inline em `vite.config.js`) usa o hook `closeBundle` para
remover os `.png` de `dist-demo/assets/artconcepts/` após o bundle ser escrito.
Os WebP em `dist-demo/assets-demo/` ficam intactos.

---

## Estratégia de assets

### Regra fundamental

> O jogo principal usa PNG. A demo usa WebP. Os dois nunca se misturam.

| Localização | Formato | Usado por |
|---|---|---|
| `public/assets/artconcepts/` | PNG | `PreloadScene` (jogo principal) |
| `public/assets-demo/artconcepts/` | WebP | `DemoPreloadScene` (demo) |
| `public/assets/sprites/` | PNG | ambos (sprites pequenos, overhead mínimo) |

### Por que PNG no jogo principal

Os artconcepts em alta resolução (1024×768+) são a fonte de verdade visual do projeto.
Converter para WebP com perda e usar como assets de produção degradaria a qualidade de
referência. PNG preserva a fidelidade original sem custo operacional no jogo principal
(que é distribuído via download, não stream).

### Por que WebP na demo

A demo é servida via HTTP e carregada em iframe no portfólio. Cada KB importa para o
first contentful paint. Os dois artconcepts usados na demo (`logo`, `title_screen`)
representavam 3.2MB em PNG; em WebP qualidade 82 ficam em 246KB total (~92% menor).

### Converter assets para WebP

```bash
pip install Pillow
python3 tools/convert_demo_assets.py
```

O script converte apenas os arquivos listados em `DEMO_ASSETS` (atualmente
`dr4w-iron-hunt_LOGO_1.png` e `title_screen.png`). Fonte: `public/assets/artconcepts/`.
Destino: `public/assets-demo/artconcepts/`. Os PNGs originais não são modificados.

Para adicionar um artconcept à demo, incluir o nome do arquivo em `DEMO_ASSETS` e
re-executar o script.

---

## Flow de cenas (demo)

```
BootScene
  └─ DemoPreloadScene   (carrega WebP + sprites PNG)
       └─ DemoStartScene  (título com title_screen.webp, "PRESS ANY KEY")
            └─ PlayerTestScene  (arena jogável, fundo escuro, tiro habilitado)
                 └─ GameOverScene  (stub — volta ao DemoStartScene no futuro)
```

Comparação com o flow do jogo principal:
```
BootScene → PreloadScene → IntroScene → StartScene → PlayerTestScene → Stage1Scene → …
```

A demo pula a intro cinemática (3 flashes de logo + 3 painéis narrativos) para levar o
visitante ao gameplay em menos de 3 segundos de carregamento.

---

## Checklist de validação local

Execute antes de qualquer push de `dist-demo/`:

```bash
npm run build:demo
```

Verificar:
- [ ] Build concluiu sem erros
- [ ] `dist-demo/` existe e tem menos de 3MB
- [ ] `dist-demo/assets/artconcepts/` não contém arquivos `.png`
  (plugin de pruning funcionou)
- [ ] `dist-demo/assets-demo/artconcepts/` contém `dr4w-iron-hunt_LOGO_1.webp` e
  `title_screen.webp`
- [ ] `dist-demo/assets/sprites/player/player.png` presente
- [ ] `dist-demo/assets/sprites/effects/bullet.png` presente

```bash
npm run preview:demo   # abre em http://localhost:4174/dr4w-iron-hunt/
```

Verificar no browser:
- [ ] Título carrega (DemoStartScene com title_screen.webp)
- [ ] "[ WORK IN PROGRESS ]" visível no topo
- [ ] Prompt piscante "> PRESS ANY KEY <" visível na base
- [ ] Qualquer tecla faz fade e abre PlayerTestScene
- [ ] PlayerTestScene tem fundo escuro (não branco)
- [ ] Sprite do Dr4w aparece e anima
- [ ] Movimento WASD/Setas funciona
- [ ] Pulo W/Space/↑ funciona (coyote time + jump buffer)
- [ ] Z/X atira projéteis
- [ ] Hint de controles visível na borda inferior
- [ ] Sem texto de debug HUD (vx/vy, pos, floor)

---

## Plano de integração no landing page (futuro)

O landing page do portfólio (`Dr4wOne/dr4w-landpage`, React + Tailwind) receberá um
componente `GameDemoSection` que embeds a demo via `<iframe>`.

Pontos definidos na spec [`docs/specs/web-demo-embed.md`](specs/web-demo-embed.md):

- Lazy load: iframe só é criado quando o `IntersectionObserver` detecta o componente
  na viewport (evita 650KB de download para visitantes que não rolam até a seção)
- Fallback mobile: em viewports < 768px, exibir screenshot estática + link "Jogar no
  desktop" (o jogo não tem suporte a touch ainda)
- Controls legend: legenda HTML/CSS sobreposta ao iframe (não dentro do canvas)
- Deploy: game.dr4w.io via GitHub Pages (`gh-pages` branch de `dr4w-iron-hunt`)

O componente ainda não foi implementado. Aguarda aprovação da branch `feature/web-demo-embed`
e deploy manual inicial do GitHub Pages.

---

## Deploy manual (GitHub Pages)

1. Aprovar e fazer merge de `feature/web-demo-embed` em `main`
2. Executar `npm run build:demo` localmente
3. Copiar conteúdo de `dist-demo/` para o branch `gh-pages`:
   ```bash
   git checkout gh-pages
   cp -r dist-demo/* .
   git add -A
   git commit -m "deploy: demo build vX.X.X"
   git push origin gh-pages
   ```
4. Verificar em `https://danielsbaumann.github.io/dr4w-iron-hunt/`

> Não há CI/CD automático. Deploy sob demanda.
