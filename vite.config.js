import { defineConfig }          from 'vite';
import { readdirSync, unlinkSync, existsSync } from 'fs';
import { join }                  from 'path';

// After a demo build, Vite copies the full public/ directory (including heavy
// artconcept PNGs).  The demo code never requests them, but they waste 18MB of
// server storage.  This plugin removes them from dist-demo after the bundle is
// written.  Only artconcepts/*.png is removed; all other assets stay.
function demoPrunePlugin() {
  return {
    name: 'demo-prune-unused-artconcepts',
    closeBundle: {
      order: 'post',
      handler() {
        const dir = join('dist-demo', 'assets', 'artconcepts');
        if (!existsSync(dir)) return;
        const removed = readdirSync(dir)
          .filter(f => f.endsWith('.png') || f === '.gitkeep');
        removed.forEach(f => unlinkSync(join(dir, f)));
        console.log(`[demo-prune] removed ${removed.length} unused artconcept files from dist-demo/`);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDemo    = mode === 'demo';
  const isGhPages = mode === 'github-pages';

  return {
    server: {
      port: 3000,
      open: true,
    },

    plugins: isDemo ? [demoPrunePlugin()] : [],

    // Inject VITE_DEMO so scenes can gate demo-only behaviour at compile time.
    // Tree-shaking eliminates dead branches in production builds.
    define: {
      'import.meta.env.VITE_DEMO': JSON.stringify(isDemo ? 'true' : 'false'),
    },

    build: {
      outDir:    isDemo ? 'dist-demo' : 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            phaser: ['phaser'],
          },
        },
      },
    },

    // demo and github-pages both deploy to /dr4w-iron-hunt/ on GitHub Pages.
    // Local dev and preview use './' so the preview server works without a subpath.
    base: (isDemo || isGhPages) ? '/dr4w-iron-hunt/' : './',
  };
});
