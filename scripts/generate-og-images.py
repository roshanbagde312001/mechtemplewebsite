"""Generate 1200x630 social share images (Open Graph / Twitter cards) for every route.

Usage (from the project root, needs Python 3 with Pillow):
    npx tsx scripts/og-routes.ts > /tmp/og-routes.json
    python3 scripts/generate-og-images.py /tmp/og-routes.json

Font: Archivo (SIL Open Font License), from https://github.com/google/fonts/tree/main/ofl/archivo
"""
import json
import sys
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

W, H = 1200, 630
ACCENT = (255, 0, 51)
FONT = 'scripts/fonts/Archivo.ttf'
LOGO = 'public/assets/brand/logo.png'


def font(size, weight, width=112):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([weight, width])  # axes: Weight, Width
    return f


def wrap(draw, text, fnt, max_width):
    lines, line = [], ''
    for word in text.split():
        trial = f'{line} {word}'.strip()
        if draw.textlength(trial, font=fnt) <= max_width or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def card(job, site):
    bg = ImageOps.fit(Image.open(job['background']).convert('RGB'), (W, H), Image.LANCZOS, centering=(0.6, 0.45))
    bg = ImageEnhance.Brightness(ImageEnhance.Color(bg).enhance(0.75)).enhance(0.42)
    canvas = bg.convert('RGBA')

    # Left-to-right darkening for the text, and a red glow in the lower right.
    shade = Image.new('L', (W, 1))
    for x in range(W):
        shade.putpixel((x, 0), int(235 * max(0.0, 1 - x / (W * 0.85))))
    canvas.alpha_composite(Image.merge('RGBA', (*[Image.new('L', (W, H), 0)] * 3, shade.resize((W, H)))))
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((W * 0.55, H * 0.35, W * 1.35, H * 1.5), fill=150)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(Image.merge('RGBA', (Image.new('L', (W, H), ACCENT[0]), Image.new('L', (W, H), ACCENT[1]), Image.new('L', (W, H), ACCENT[2]), glow)))

    logo = Image.open(LOGO).convert('RGBA')
    logo = logo.resize((300, round(logo.height * 300 / logo.width)), Image.LANCZOS)
    canvas.alpha_composite(logo, (60, 48))

    draw = ImageDraw.Draw(canvas)
    heading = job['heading'].rstrip('.') + '.'
    size = 78
    while True:
        f = font(size, 700)
        lines = wrap(draw, heading, f, W - 140)
        if len(lines) <= 3 or size <= 50:
            break
        size -= 4
    line_h = int(size * 1.02)
    y = H - 96 - line_h * len(lines)
    label_font = font(22, 600, 100)
    draw.text((64, y - 46), job['label'].upper(), font=label_font, fill=ACCENT)
    for line in lines:
        draw.text((62, y), line, font=f, fill=(255, 255, 255))
        y += line_h
    draw.rectangle((64, H - 62, 124, H - 58), fill=ACCENT)
    draw.text((140, H - 74), site, font=font(24, 500, 100), fill=(230, 230, 230))

    canvas.convert('RGB').save(job['out'], quality=86, optimize=True, progressive=True)


def main():
    data = json.load(open(sys.argv[1]))
    for job in data['jobs']:
        card(job, data['site'])
        print('wrote', job['out'])


if __name__ == '__main__':
    main()
