"""
DR4W: Iron Hunt — Asset Generator
Extracts intro panels from intro.png and generates pixel-art player sprite sheet.
Run: python3 tools/generate_assets.py
"""

import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTCONCEPTS = os.path.join(ROOT, 'public', 'assets', 'artconcepts')
SPRITES_OUT = os.path.join(ROOT, 'public', 'assets', 'sprites', 'player')
EFFECTS_OUT = os.path.join(ROOT, 'public', 'assets', 'sprites', 'effects')
os.makedirs(EFFECTS_OUT, exist_ok=True)

# ─── Palette ────────────────────────────────────────────────────────────────────
A = (30,  42,  56,  255)   # #1E2A38  armor primary
S = (20,  30,  42,  255)   # #141E2A  armor shadow
C = (64,  208, 240, 255)   # #40D0F0  cyan visor/cannon tip
E = (240, 24,  32,  255)   # #F01820  red eyes
P = (74,  94,  118, 255)   # #4A5E76  specular
T = (0,   0,   0,   0)     # transparent
W = (255, 255, 255, 255)   # white (hurt flash)
D = (48,  48,  48,  255)   # #303030  dead armor (desaturated)
DC = (30, 40,  40,  255)   # dead cyan (dimmed)

# ─── Pixel drawing helpers ───────────────────────────────────────────────────────

def put(pixels, x, y, color):
    if 0 <= x < 32 and 0 <= y < 32:
        pixels[y][x] = list(color)

def fill(pixels, x1, y1, x2, y2, color):
    for y in range(max(0,y1), min(32,y2+1)):
        for x in range(max(0,x1), min(32,x2+1)):
            pixels[y][x] = list(color)

def pixels_to_image(pixels):
    img = Image.new('RGBA', (32, 32))
    for y in range(32):
        for x in range(32):
            img.putpixel((x, y), tuple(pixels[y][x]))
    return img

def empty_frame():
    return [[list(T)] * 32 for _ in range(32)]

# ─── Character parts ────────────────────────────────────────────────────────────

def draw_head(px, dx=0, dy=0, visor_color=C, eye_color=E):
    """Head block: 13w × 11h, anchor top-left at (9,1)"""
    x0, y0 = 9 + dx, 1 + dy
    fill(px, x0, y0, x0+12, y0+10, A)          # head base
    fill(px, x0, y0, x0+1,  y0+10, S)           # left shadow
    fill(px, x0+12, y0, x0+12, y0+5, P)         # right specular
    fill(px, x0+1, y0+4, x0+12, y0+6, visor_color)  # visor band
    # Eyes within visor (y+5)
    fill(px, x0+3, y0+5, x0+4, y0+5, eye_color)  # left eye
    fill(px, x0+9, y0+5, x0+10, y0+5, eye_color)  # right eye

def draw_torso(px, dx=0, dy=0):
    """Torso: 14w × 11h, anchor top-left at (8,12)"""
    x0, y0 = 8 + dx, 12 + dy
    fill(px, x0, y0, x0+13, y0+10, A)
    fill(px, x0, y0, x0+1,  y0+10, S)
    fill(px, x0+12, y0, x0+13, y0+3, P)
    # Chest detail
    put(px, x0+7, y0+5, P)

def draw_cannon_arm(px, dx=0, dy=0, extended=False, hanging=False):
    """Right arm cannon extending rightward from torso"""
    if hanging:
        # Arm hanging down during hurt/dead
        x0, y0 = 22 + dx, 14 + dy
        fill(px, x0, y0, x0+3, y0+8, A)
        fill(px, x0, y0, x0, y0+8, S)
        return
    x0, y0 = 22 + dx, 13 + dy
    # Upper arm
    fill(px, x0, y0, x0+3, y0+6, A)
    fill(px, x0, y0, x0, y0+6, S)
    # Barrel
    tip = x0+9 if extended else x0+8
    fill(px, x0+4, y0+2, min(31, tip), y0+5, S)
    # Cannon tip (cyan glow)
    tx = min(31, tip)
    fill(px, tx, y0+2, tx, y0+5, C)
    if extended and tx < 31:
        fill(px, tx+1, y0+3, min(31,tx+1), y0+4, C)

def draw_left_arm(px, dx=0, dy=0):
    """Left arm: 6w × 9h, at left side of torso"""
    x0, y0 = 3 + dx, 14 + dy
    fill(px, x0, y0, x0+5, y0+8, A)
    fill(px, x0, y0, x0+1, y0+8, S)

def draw_legs_idle(px, dx=0, dy=0):
    """Standard idle legs"""
    x0, y0 = 8 + dx, 23 + dy
    # Left leg
    fill(px, x0, y0, x0+5, y0+7, A)
    fill(px, x0, y0, x0+1, y0+7, S)
    # Right leg (gap of 1px at x0+6)
    fill(px, x0+7, y0, x0+13, y0+7, A)
    fill(px, x0+7, y0, x0+8, y0+7, S)
    # Feet (slightly wider)
    fill(px, x0-1, y0+6, x0+6, y0+8, A)
    fill(px, x0-1, y0+6, x0, y0+8, S)
    fill(px, x0+6, y0+6, x0+14, y0+8, A)
    fill(px, x0+6, y0+6, x0+7, y0+8, S)

def draw_legs_run(px, phase):
    """Run cycle legs, phase 0-3"""
    base_x = 8

    if phase == 0:  # left leg forward/raised, right back
        # Left leg raised (up 2, slightly forward)
        fill(px, base_x, 21, base_x+5, 27, A)
        fill(px, base_x, 21, base_x+1, 27, S)
        fill(px, base_x-1, 26, base_x+5, 28, A)   # foot forward
        fill(px, base_x-1, 26, base_x, 28, S)
        # Right leg extended back
        fill(px, base_x+7, 23, base_x+13, 31, A)
        fill(px, base_x+7, 23, base_x+8, 31, S)
        fill(px, base_x+6, 29, base_x+14, 31, A)  # foot back
        fill(px, base_x+6, 29, base_x+7, 31, S)

    elif phase == 1:  # crossing
        fill(px, base_x, 23, base_x+5, 29, A)
        fill(px, base_x, 23, base_x+1, 29, S)
        fill(px, base_x-1, 28, base_x+6, 30, A)
        fill(px, base_x-1, 28, base_x, 30, S)
        fill(px, base_x+7, 21, base_x+13, 28, A)
        fill(px, base_x+7, 21, base_x+8, 28, S)
        fill(px, base_x+6, 27, base_x+13, 29, A)
        fill(px, base_x+6, 27, base_x+7, 29, S)

    elif phase == 2:  # right forward, left back (mirror of 0)
        fill(px, base_x, 23, base_x+5, 31, A)
        fill(px, base_x, 23, base_x+1, 31, S)
        fill(px, base_x-1, 29, base_x+6, 31, A)
        fill(px, base_x-1, 29, base_x, 31, S)
        fill(px, base_x+7, 21, base_x+12, 27, A)
        fill(px, base_x+7, 21, base_x+8, 27, S)
        fill(px, base_x+6, 26, base_x+13, 28, A)
        fill(px, base_x+6, 26, base_x+7, 28, S)

    elif phase == 3:  # crossing back (mirror of 1)
        fill(px, base_x, 21, base_x+5, 28, A)
        fill(px, base_x, 21, base_x+1, 28, S)
        fill(px, base_x-1, 27, base_x+6, 29, A)
        fill(px, base_x-1, 27, base_x, 29, S)
        fill(px, base_x+7, 23, base_x+13, 29, A)
        fill(px, base_x+7, 23, base_x+8, 29, S)
        fill(px, base_x+6, 28, base_x+14, 30, A)
        fill(px, base_x+6, 28, base_x+7, 30, S)

# ─── Animation frames ────────────────────────────────────────────────────────────

def make_idle(variant=0):
    """Idle: 3 variants (0=base, 1=chest rise, 2=eye flicker)"""
    px = empty_frame()
    dy = -1 if variant == 1 else 0
    vc = DC if variant == 2 else C    # dim visor on variant 2
    ec = S  if variant == 2 else E    # eye flicker (shadow = very dim)
    draw_head(px, dy=dy, visor_color=vc, eye_color=ec)
    draw_torso(px, dy=dy)
    draw_cannon_arm(px, dy=dy)
    draw_left_arm(px, dy=dy)
    draw_legs_idle(px)
    return pixels_to_image(px)

def make_run(phase):
    px = empty_frame()
    # Slight body bob: frames 0,2 are normal, frames 1,3 down 1px
    dy = 1 if phase in (1, 3) else 0
    draw_head(px, dy=dy)
    draw_torso(px, dy=dy)
    draw_cannon_arm(px, dy=dy)
    draw_left_arm(px, dy=dy)
    draw_legs_run(px, phase)
    return pixels_to_image(px)

def make_jump():
    px = empty_frame()
    draw_head(px, dy=-1)
    draw_torso(px, dy=-1)
    # Cannon aimed slightly up (dy=-2)
    draw_cannon_arm(px, dy=-2)
    draw_left_arm(px, dy=-1)
    # Legs tucked up
    fill(px, 8, 21, 13, 27, A)
    fill(px, 8, 21, 9, 27, S)
    fill(px, 7, 26, 14, 27, A)
    fill(px, 7, 26, 8, 27, S)
    fill(px, 15, 21, 21, 27, A)
    fill(px, 15, 21, 16, 27, S)
    fill(px, 14, 26, 22, 27, A)
    fill(px, 14, 26, 15, 27, S)
    return pixels_to_image(px)

def make_fall():
    px = empty_frame()
    draw_head(px)
    draw_torso(px)
    draw_cannon_arm(px, dy=1)  # cannon aimed down
    draw_left_arm(px)
    # Legs extended downward
    fill(px, 8, 23, 13, 31, A)
    fill(px, 8, 23, 9, 31, S)
    fill(px, 15, 23, 21, 31, A)
    fill(px, 15, 23, 16, 31, S)
    return pixels_to_image(px)

def make_shoot_idle(variant=0):
    px = empty_frame()
    draw_head(px)
    draw_torso(px)
    draw_cannon_arm(px, extended=(variant == 0))
    draw_left_arm(px)
    draw_legs_idle(px)
    return pixels_to_image(px)

def make_shoot_run(phase):
    px = empty_frame()
    dy = 1 if phase in (1, 3) else 0
    draw_head(px, dy=dy)
    draw_torso(px, dy=dy)
    draw_cannon_arm(px, extended=True, dy=dy)
    draw_left_arm(px, dy=dy)
    draw_legs_run(px, phase)
    return pixels_to_image(px)

def make_hurt(variant=0):
    px = empty_frame()
    dx = -2 + variant  # knockback shift
    draw_head(px, dx=dx, visor_color=S, eye_color=S)  # visor dark
    draw_torso(px, dx=dx)
    draw_cannon_arm(px, dx=dx, dy=3, hanging=True)
    draw_left_arm(px, dx=dx)
    # Stumble legs
    fill(px, 6+dx, 22, 11+dx, 30, A)
    fill(px, 6+dx, 22, 7+dx, 30, S)
    fill(px, 5+dx, 29, 12+dx, 31, A)
    fill(px, 13+dx, 23, 19+dx, 31, A)
    fill(px, 13+dx, 23, 14+dx, 31, S)
    fill(px, 12+dx, 29, 20+dx, 31, A)
    return pixels_to_image(px)

def make_dead(phase):
    px = empty_frame()
    if phase == 0:
        # Still standing, staggering
        draw_head(px, dx=-1, visor_color=DC, eye_color=S)
        draw_torso(px, dx=-1)
        draw_cannon_arm(px, dx=-1, hanging=True)
        draw_left_arm(px)
        draw_legs_idle(px)

    elif phase == 1:
        # Falling backward
        draw_head(px, dx=-3, dy=2, visor_color=DC, eye_color=S)
        draw_torso(px, dx=-3, dy=2)
        # Arms fall
        fill(px, 18, 16, 24, 21, A)
        fill(px, 18, 16, 19, 21, S)
        fill(px, 2, 16, 6, 20, A)
        fill(px, 2, 16, 3, 20, S)
        # Legs buckling
        fill(px, 5, 23, 10, 29, A)
        fill(px, 5, 23, 6, 29, S)
        fill(px, 4, 28, 11, 30, A)
        fill(px, 13, 24, 19, 31, A)
        fill(px, 13, 24, 14, 31, S)

    elif phase == 2:
        # Body tilted, partially fallen
        # Horizontal torso at y:15-22
        fill(px, 3, 16, 21, 23, A)
        fill(px, 3, 16, 4, 23, S)
        fill(px, 20, 16, 21, 20, P)
        # Head angled
        fill(px, 8, 12, 20, 16, A)
        fill(px, 8, 12, 9, 16, S)
        fill(px, 9, 13, 19, 15, DC)  # dim visor
        # Legs below
        fill(px, 6, 23, 11, 28, A)
        fill(px, 6, 23, 7, 28, S)
        fill(px, 15, 22, 21, 27, A)
        fill(px, 15, 22, 16, 27, S)

    elif phase == 3:
        # Nearly horizontal - on the ground
        fill(px, 2, 19, 22, 25, A)
        fill(px, 2, 19, 3, 25, S)
        fill(px, 4, 15, 16, 19, A)   # head tilted flat
        fill(px, 4, 15, 5, 19, S)
        fill(px, 5, 16, 15, 18, DC)  # visor nearly off
        # Legs behind
        fill(px, 19, 20, 26, 24, A)
        fill(px, 19, 20, 20, 24, S)

    elif phase == 4:
        # Crumpled
        fill(px, 2, 22, 24, 28, A)
        fill(px, 2, 22, 3, 28, S)
        fill(px, 5, 18, 15, 22, A)
        fill(px, 5, 18, 6, 22, S)
        fill(px, 6, 19, 14, 21, S)   # visor dark (fully shadow color)

    elif phase == 5:
        # Static - dark heap (all armor desaturated)
        px = empty_frame()
        fill(px, 2, 24, 24, 30, D)
        fill(px, 2, 24, 3, 30, (15, 22, 30, 255))  # very dark shadow
        fill(px, 5, 20, 15, 24, D)
        fill(px, 5, 20, 6, 24, (15, 22, 30, 255))

    return pixels_to_image(px)

# ─── Sprite sheet assembly ───────────────────────────────────────────────────────

def build_player_sheet():
    """
    192×256 sprite sheet, 6 cols × 8 rows of 32×32
    Row 0: IDLE  (3 frames)
    Row 1: RUN   (4 frames)
    Row 2: JUMP  (1 frame)
    Row 3: FALL  (1 frame)
    Row 4: SHOOT_IDLE (2 frames)
    Row 5: SHOOT_RUN  (4 frames)
    Row 6: HURT  (2 frames)
    Row 7: DEAD  (6 frames)
    """
    sheet = Image.new('RGBA', (192, 256), (0, 0, 0, 0))

    def place(frame_img, col, row):
        sheet.paste(frame_img, (col * 32, row * 32))

    # Row 0 — IDLE
    place(make_idle(0), 0, 0)
    place(make_idle(1), 1, 0)
    place(make_idle(2), 2, 0)

    # Row 1 — RUN
    for i in range(4):
        place(make_run(i), i, 1)

    # Row 2 — JUMP
    place(make_jump(), 0, 2)

    # Row 3 — FALL
    place(make_fall(), 0, 3)

    # Row 4 — SHOOT_IDLE
    place(make_shoot_idle(0), 0, 4)
    place(make_shoot_idle(1), 1, 4)

    # Row 5 — SHOOT_RUN
    for i in range(4):
        place(make_shoot_run(i), i, 5)

    # Row 6 — HURT
    place(make_hurt(0), 0, 6)
    place(make_hurt(1), 1, 6)

    # Row 7 — DEAD
    for i in range(6):
        place(make_dead(i), i, 7)

    out = os.path.join(SPRITES_OUT, 'player.png')
    sheet.save(out)
    print(f'[OK] Player sheet → {out}  ({sheet.size[0]}×{sheet.size[1]})')
    return sheet

# ─── Bullet sprite ───────────────────────────────────────────────────────────────

def build_bullet():
    """8×4 horizontal bullet — cyan with bright core"""
    img = Image.new('RGBA', (8, 4), (0, 0, 0, 0))
    for x in range(8):
        for y in range(4):
            if x >= 6:
                img.putpixel((x, y), (255, 255, 255, 255))   # bright tip
            elif x >= 3:
                img.putpixel((x, y), C)                       # cyan body
            elif x >= 1 and 1 <= y <= 2:
                img.putpixel((x, y), (64, 208, 240, 180))     # soft trail
    out = os.path.join(EFFECTS_OUT, 'bullet.png')
    img.save(out)
    print(f'[OK] Bullet → {out}')

# ─── Muzzle flash ────────────────────────────────────────────────────────────────

def build_muzzle_flash():
    """12×8 muzzle flash — 2 frames in one image (6×8 each)"""
    img = Image.new('RGBA', (12, 8), (0, 0, 0, 0))
    # Frame 0: bright flash
    for x in range(6):
        for y in range(8):
            if x <= 1 and 2 <= y <= 5:
                img.putpixel((x, y), (255, 255, 255, 255))
            elif x <= 3 and 1 <= y <= 6:
                img.putpixel((x, y), (200, 240, 255, 220))
            elif x <= 5 and 2 <= y <= 5:
                img.putpixel((x, y), C)
    # Frame 1: dimmer flash
    for x in range(6, 12):
        for y in range(8):
            if x <= 7 and 2 <= y <= 5:
                img.putpixel((x, y), (64, 208, 240, 180))
    out = os.path.join(EFFECTS_OUT, 'muzzle_flash.png')
    img.save(out)
    print(f'[OK] Muzzle flash → {out}')

# ─── Intro panel extraction ──────────────────────────────────────────────────────

def extract_intro_panels():
    """
    intro.png is 1536×1024 with 3 portrait panels side by side.
    Dark separators at x=512 and x=1024. Logo area starts ~y=818.
    Each panel: 512×818 → saved as 512×818 PNG for Phaser to scale.
    """
    src = os.path.join(ARTCONCEPTS, 'intro.png')
    img = Image.open(src).convert('RGB')

    # Panel bounds (empirically verified: dark cols at 500-513, 1023-1026)
    panels = [
        (0,   0, 511, 820),   # Panel 01
        (512, 0, 1023, 820),  # Panel 02
        (1024, 0, 1535, 820), # Panel 03
    ]

    for i, (x1, y1, x2, y2) in enumerate(panels):
        panel = img.crop((x1, y1, x2+1, y2+1))
        out = os.path.join(ARTCONCEPTS, f'intro_0{i+1}.png')
        panel.save(out)
        print(f'[OK] intro_0{i+1}.png → {out}  ({panel.size[0]}×{panel.size[1]})')

# ─── Main ─────────────────────────────────────────────────────────────────────────

# ─── Intro sharp landscape crops (512×320 → 384×240 at 0.75) ────────────────────

def build_intro_sharp():
    """
    Extract a 512×320 landscape crop from each portrait intro panel.
    At game scale 0.75 this maps exactly to 384×240 — zero black bars.
    y offsets chosen to frame the most dramatic visual content of each panel.
    """
    CROPS = [
        # (panel index, y_start) — crop is always 512 wide × 320 tall
        (1,  30),   # Panel 01: top-down → header "01" + red moon scene
        (2,  40),   # Panel 02: header "02" + machines/skull banner
        (3, 120),   # Panel 03: skips dark top → capsule with DR4W fully visible
    ]
    for (i, y0) in CROPS:
        src = os.path.join(ARTCONCEPTS, f'intro_0{i}.png')
        out = os.path.join(ARTCONCEPTS, f'intro_0{i}_sharp.png')
        img = Image.open(src).convert('RGB')
        crop = img.crop((0, y0, 512, y0 + 320))
        crop.save(out)
        print(f'[OK] intro_0{i}_sharp.png  ({crop.size[0]}×{crop.size[1]}, y={y0}-{y0+320})')


# ─── Intro background (blurred landscape crop) ──────────────────────────────────

def build_intro_bgs():
    """
    For each portrait intro panel (512×821), produce a full-bleed landscape
    background (384×240) by:
      1. Cover-scaling to 384px wide (scale=0.75)
      2. Cropping the vertical center to 240px tall
      3. Applying a heavy Gaussian blur (radius 10)
      4. Darkening with a semi-transparent overlay
    Used as the rear layer behind the sharp centered portrait card.
    """
    GAME_W, GAME_H = 384, 240

    for i in range(1, 4):
        src = os.path.join(ARTCONCEPTS, f'intro_0{i}.png')
        out = os.path.join(ARTCONCEPTS, f'intro_0{i}_bg.png')

        img = Image.open(src).convert('RGB')
        w, h = img.size

        # Cover scale: fill 384px width (panel is 512 wide)
        scale = GAME_W / w          # 384/512 = 0.75
        new_w = GAME_W              # 384
        new_h = round(h * scale)   # 821*0.75 ≈ 616

        img_s = img.resize((new_w, new_h), Image.LANCZOS)

        # Crop vertical center to GAME_H
        y_off = (new_h - GAME_H) // 2
        img_c = img_s.crop((0, y_off, GAME_W, y_off + GAME_H))

        # Heavy blur
        img_b = img_c.filter(ImageFilter.GaussianBlur(radius=10))

        # Darken: overlay semi-transparent black
        overlay = Image.new('RGB', (GAME_W, GAME_H), (0, 0, 0))
        img_out = Image.blend(img_b, overlay, alpha=0.55)

        img_out.save(out)
        print(f'[OK] intro_0{i}_bg.png → {out}')


# ─── Real sprite extraction from reference art ──────────────────────────────────

def build_player_sheet_from_ref():
    """
    Extract real character sprites from sprites.png (1024×1536 reference art).
    4 columns × ~6 rows; sprites found at precise y-bands via pixel analysis.
    Assembles into 192×256 atlas (6 cols × 8 rows, 32×32 frames).

    Animation mapping:
      Row 0  IDLE       3 f → ref r0c0, r0c1, r0c2
      Row 1  RUN        4 f → ref r1c0, r1c1, r1c2, r1c3
      Row 2  JUMP       1 f → ref r3c0
      Row 3  FALL       1 f → ref r3c2
      Row 4  SHOOT_IDLE 2 f → ref r3c3, r0c3
      Row 5  SHOOT_RUN  4 f → ref r2c0, r2c1, r2c2, r2c3
      Row 6  HURT       2 f → ref r4c0, r4c1
      Row 7  DEAD       6 f → r4c0, r4c1, dead, dead, dead, dead
    """
    ref_path = os.path.join(ARTCONCEPTS, 'sprites.png')
    if not os.path.exists(ref_path):
        print('[WARN] sprites.png not found, falling back to programmatic sheet')
        return build_player_sheet()

    src = Image.open(ref_path).convert('RGBA')

    # Y-ranges for each sprite row (found by non-bg pixel analysis)
    COL_W = 256
    SEGS = [
        (68,  234),   # seg 0 — IDLE variants
        (259, 425),   # seg 1 — RUN part 1
        (454, 620),   # seg 2 — SHOOT_RUN / RUN extended
        (647, 810),   # seg 3 — JUMP / SHOOT
        (835, 1002),  # seg 4 — HURT
    ]
    DEAD_SEG = (1318, 1407)  # col 3 only

    def is_bg(r, g, b):
        return r > 90 and b < 45 and g > 60 and r > b * 3.5

    def extract_sprite(seg_i, col):
        y0, y1 = SEGS[seg_i]
        x0 = col * COL_W
        cell = src.crop((x0, y0, x0 + COL_W, y1)).convert('RGBA')
        px = cell.load()
        cw, ch = cell.size
        for y in range(ch):
            for x in range(cw):
                r, g, b, a = px[x, y]
                if is_bg(r, g, b):
                    px[x, y] = (0, 0, 0, 0)
        # Crop to non-transparent bbox
        minx, miny, maxx, maxy = cw, ch, 0, 0
        for y in range(ch):
            for x in range(cw):
                if px[x, y][3] > 10:
                    minx=min(minx,x); miny=min(miny,y)
                    maxx=max(maxx,x); maxy=max(maxy,y)
        if maxx < minx:
            return None
        return cell.crop((minx, miny, maxx + 1, maxy + 1))

    def extract_dead():
        y0, y1 = DEAD_SEG
        x0 = 3 * COL_W
        cell = src.crop((x0, y0, x0 + COL_W, y1)).convert('RGBA')
        px = cell.load()
        cw, ch = cell.size
        for y in range(ch):
            for x in range(cw):
                r, g, b, a = px[x, y]
                if is_bg(r, g, b):
                    px[x, y] = (0, 0, 0, 0)
        minx, miny, maxx, maxy = cw, ch, 0, 0
        for y in range(ch):
            for x in range(cw):
                if px[x, y][3] > 10:
                    minx=min(minx,x); miny=min(miny,y)
                    maxx=max(maxx,x); maxy=max(maxy,y)
        if maxx < minx:
            return None
        return cell.crop((minx, miny, maxx + 1, maxy + 1))

    def fit_to_frame(sprite, max_w=30, max_h=28, bottom_align=True):
        """Scale sprite to fit within max_w×max_h, place in 32×32 cell."""
        if sprite is None:
            return Image.new('RGBA', (32, 32))
        sw, sh = sprite.size
        scale = min(max_w / sw, max_h / sh)
        nw = max(1, round(sw * scale))
        nh = max(1, round(sh * scale))
        scaled = sprite.resize((nw, nh), Image.LANCZOS)
        frame = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
        x = (32 - nw) // 2
        y = (32 - nh) if bottom_align else (32 - nh) // 2
        frame.paste(scaled, (x, y), scaled)
        return frame

    sheet = Image.new('RGBA', (192, 256), (0, 0, 0, 0))

    def place(frame_img, col, row):
        sheet.paste(frame_img, (col * 32, row * 32))

    # Row 0 — IDLE (3 frames)
    for col in range(3):
        place(fit_to_frame(extract_sprite(0, col)), col, 0)

    # Row 1 — RUN (4 frames)
    for col in range(4):
        place(fit_to_frame(extract_sprite(1, col)), col, 1)

    # Row 2 — JUMP (1 frame)
    place(fit_to_frame(extract_sprite(3, 0), bottom_align=False), 0, 2)

    # Row 3 — FALL (1 frame)
    place(fit_to_frame(extract_sprite(3, 2), bottom_align=False), 0, 3)

    # Row 4 — SHOOT_IDLE (2 frames): shooting pose + standing with arm
    place(fit_to_frame(extract_sprite(3, 3), max_w=30, max_h=26), 0, 4)
    place(fit_to_frame(extract_sprite(0, 3), max_w=30, max_h=28), 1, 4)

    # Row 5 — SHOOT_RUN (4 frames): dynamic run poses
    for col in range(4):
        place(fit_to_frame(extract_sprite(2, col)), col, 5)

    # Row 6 — HURT (2 frames)
    place(fit_to_frame(extract_sprite(4, 0), max_h=26), 0, 6)
    place(fit_to_frame(extract_sprite(4, 1), max_h=26), 1, 6)

    # Row 7 — DEAD (6 frames): hurt → fall → dead (flat)
    dead_sprite = extract_dead()
    place(fit_to_frame(extract_sprite(4, 0), max_h=24), 0, 7)
    place(fit_to_frame(extract_sprite(4, 1), max_h=22), 1, 7)
    # Dead flat pose — wide, so constrain width more
    for col in range(2, 6):
        place(fit_to_frame(dead_sprite, max_w=30, max_h=14, bottom_align=True), col, 7)

    out = os.path.join(SPRITES_OUT, 'player.png')
    sheet.save(out)
    print(f'[OK] Player sheet (from ref) → {out}  ({sheet.size[0]}×{sheet.size[1]})')
    return sheet


if __name__ == '__main__':
    print('=== DR4W: Iron Hunt — Asset Generator ===\n')

    print('>> Generating player sprite sheet from reference art...')
    build_player_sheet_from_ref()

    print('\n>> Generating effect sprites...')
    build_bullet()
    build_muzzle_flash()

    print('\nDone.')
