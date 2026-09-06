# -*- coding: utf-8 -*-
"""Last attempts for Sino-Ocean logo: site CSS + Baidu Baike page."""
import sys, os, re, urllib.request, ssl

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, '_logos_raw')
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9'}

def get(url, timeout=20):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout, context=ctx).read()

base = 'https://www.sinooceangroup.com/zh-cn/'
for css in ('css/global.css', 'css/main.css'):
    try:
        t = get(base + css).decode('utf-8', 'ignore')
        hits = [u for u in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', t) if 'logo' in u.lower()]
        if hits:
            for h in hits:
                print(css, 'HIT', h)
                full = base + h.lstrip('./') if not h.startswith('http') else h
                data = get(full)
                name = 'ocean_css_' + os.path.basename(h)
                open(os.path.join(RAW, name), 'wb').write(data)
                print('saved', name, len(data))
        else:
            print(css, 'no logo ref, len', len(t))
    except Exception as e:
        print(css, 'FAIL', type(e).__name__, str(e)[:60])

try:
    t = get('https://baike.baidu.com/item/%E9%9C%87%E6%B3%BD%E9%9B%86%E5%9B%A2' if False else 'https://baike.baidu.com/item/%E8%BF%9C%E6%B4%8B%E9%9B%86%E5%9B%A2').decode('utf-8', 'ignore')
    imgs = re.findall(r'(https?://bkimg\.cdn\.bcebos\.com/[^"\'\s\\]+)', t)
    print('baike imgs:', len(imgs))
    for u in imgs[:6]:
        print('BKIMG', u[:120])
except Exception as e:
    print('baike FAIL', type(e).__name__, str(e)[:70])
print('done')
