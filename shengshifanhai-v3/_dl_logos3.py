# -*- coding: utf-8 -*-
"""Fetch Sino-Ocean logo via seeklogo; convert SVG; build cleanup of all logos."""
import sys, os, re, urllib.request, ssl

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
BASE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(BASE, '_logos_raw')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9'}

def dl(url, name, referer=None):
    headers = dict(UA)
    if referer:
        headers['Referer'] = referer
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=25, context=ctx).read()
        with open(os.path.join(RAW, name), 'wb') as f:
            f.write(data)
        print(name, 'OK', len(data))
        return data
    except Exception as e:
        print(name, 'FAIL', type(e).__name__, str(e)[:70])
        return None

# 1. seeklogo 页面 → 直链 PNG
page = dl('https://seeklogo.com/vector-logo/338966/sino-ocean-group', 'ocean_seek.html')
if page:
    txt = page.decode('utf-8', 'ignore')
    urls = re.findall(r'(https://seeklogo\.com/images/[A-Za-z]/[^"\' ]+)', txt)
    seen = []
    for u in urls:
        if u not in seen and re.search(r'sino.?ocean', u, re.I):
            seen.append(u)
    for u in seen[:4]:
        print('SEEK', u)
    if seen:
        ext = os.path.splitext(seen[0])[1] or '.png'
        dl(seen[0], 'ocean_logo' + ext, referer='https://seeklogo.com/')

# 2. 远洋官网 CSS 背景 logo 备选
hp = os.path.join(RAW, 'ocean_page.html')
if os.path.exists(hp):
    txt = open(hp, encoding='utf-8', errors='ignore').read()
    for m in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', txt):
        if 'logo' in m.lower():
            print('OCEAN CSSBG', m)

# 3. 远洋官网常用路径猜测
for p in ('images/logo.png', 'images/logo.svg', 'images/icon/logo.png'):
    dl('https://www.sinooceangroup.com/zh-cn/' + p, 'ocean_try_' + os.path.basename(p))
print('done')
