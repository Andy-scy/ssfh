# -*- coding: utf-8 -*-
"""Clean bitmap logos (trim white edges) + build a preview page for SVG candidates."""
import sys, os
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, '_logos_raw')
OUT = os.path.join(BASE, 'images', 'clients')
os.makedirs(OUT, exist_ok=True)

def trim_white(im, pad=14):
    """Trim near-white margins, keep small padding."""
    im = im.convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    gray = diff.convert('L').point(lambda x: 255 if x > 18 else 0)
    bbox = gray.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(im.width, r + pad); b = min(im.height, b + pad)
    return im.crop((l, t, r, b))

jobs = {
    'cas.png':  'cdb..',  # placeholder to keep dict uniform
}
for src, out in [('cas.png', 'cas.png'), ('cea.png', 'cea.png'), ('cdb.png', 'cdb.png'), ('picc.png', 'picc.png')]:
    p = os.path.join(RAW, src)
    im = Image.open(p)
    im = trim_white(im)
    # 高度归一到 150 以内，宽度不超 320
    scale = min(150 / im.height, 320 / im.width, 1.0)
    if scale < 1.0:
        im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
    im.save(os.path.join(OUT, out))
    print(out, im.size)

# 预览页：清洗后的位图 logo + 4 个 armani svg 候选
svgs = ['armani.svg', 'armani-1.svg', 'armani-exchange.svg', 'emporio-armani.svg']
html = ['<!DOCTYPE html><html><head><meta charset="utf-8"><style>',
        'body{font-family:sans-serif;background:#eef4ef;padding:30px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}',
        '.card{background:#fff;border-radius:14px;padding:24px;display:flex;align-items:center;justify-content:center;height:130px}',
        '.card img{max-height:110px;max-width:80%}',
        'p{grid-column:span 1;text-align:center;font-size:13px;margin:-10px 0 10px;color:#333}',
        '</style></head><body>']
for f in ['cas.png', 'cea.png', 'cdb.png', 'picc.png']:
    html.append('<div class="card"><img src="images/clients/%s"></div><p>%s</p>' % (f, f))
for f in svgs:
    html.append('<div class="card"><img src="_logos_raw/%s"></div><p>%s</p>' % (f, f))
html.append('</body></html>')
open(os.path.join(BASE, '_logo_preview.html'), 'w', encoding='utf-8').write(''.join(html))
print('preview written')
