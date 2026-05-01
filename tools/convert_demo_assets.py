"""
Convert demo-specific PNG assets to WebP for the portfolio embed build.

Usage:
    python3 tools/convert_demo_assets.py

Rules:
- Original PNG assets in public/assets/ are NEVER modified.
- WebP output goes to public/assets-demo/ (demo-only folder).
- Only assets actually used by the demo build are converted (no bulk conversion).
- Run this script again if source PNGs are replaced; overwrite output is safe.

Requires: Pillow  (pip install Pillow)
"""

from pathlib import Path
from PIL import Image

SRC_DIR  = Path(__file__).parent.parent / 'public' / 'assets' / 'artconcepts'
DEST_DIR = Path(__file__).parent.parent / 'public' / 'assets-demo' / 'artconcepts'
QUALITY  = 82   # WebP quality — 82 is visually near-lossless at ~90-95% size reduction

# Only assets the DemoPreloadScene actually loads.
# Intro panels (intro_01/02/03) are intentionally excluded — demo skips the intro.
DEMO_ASSETS = [
    'dr4w-iron-hunt_LOGO_1.png',
    'title_screen.png',
]

def convert():
    DEST_DIR.mkdir(parents=True, exist_ok=True)

    total_src_kb  = 0
    total_dest_kb = 0

    for name in DEMO_ASSETS:
        src  = SRC_DIR  / name
        dest = DEST_DIR / (src.stem + '.webp')

        if not src.exists():
            print(f'[SKIP] {name} — source not found')
            continue

        img = Image.open(src)
        img.save(dest, 'webp', quality=QUALITY, method=6)

        src_kb  = src.stat().st_size  // 1024
        dest_kb = dest.stat().st_size // 1024
        pct     = round((1 - dest.stat().st_size / src.stat().st_size) * 100)
        total_src_kb  += src_kb
        total_dest_kb += dest_kb

        print(f'{name:45s}  {src_kb:>5} KB  →  {dest_kb:>4} KB  (−{pct}%)')

    print()
    print(f'Total: {total_src_kb} KB  →  {total_dest_kb} KB  '
          f'(−{round((1 - total_dest_kb / total_src_kb) * 100)}%)')
    print(f'Output: {DEST_DIR}')
    print('Original PNG assets: untouched.')

if __name__ == '__main__':
    convert()
