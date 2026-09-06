# -*- coding: utf-8 -*-
"""Scrape official sites for client logo candidates."""
import re, os, sys, urllib.request, ssl

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
OUT = r'C:\VibeCoding\ZCode\shengshifanhai-v3\_logos_raw'
os.makedirs(OUT, exist_ok=True)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9'}

def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout, context=ctx).read()

SITES = {
    'cdb':    'https://www.cdb.com.cn/',
    'cas':    'https://www.cas.cn/',
    'cea':    'https://www.cea.gov.cn/',
    'ocean':  'https://www.sinoocean.com/',
}

for key, url in SITES.items():
    try:
        html = fetch(url).decode('utf-8', 'ignore')
    except Exception as e:
        try:
            html = fetch(url).decode('gbk', 'ignore')
        except Exception as e2:
            print(key, 'FETCH FAIL', type(e2).__name__, str(e2)[:70])
            continue
    print(key, 'html', len(html))
    # 收集 img src 与 og:image
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
    og = re.findall(r'property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.I)
    og += re.findall(r'content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.I)
    cands = []
    for s in imgs + og:
        s = s.strip()
        low = s.lower()
        if any(k in low for k in ('logo', 'brand', 'head_', 'top_', 'index_')):
            cands.append(s)
    # 兜底：前 6 张图
    if not cands:
        cands = [s for s in imgs if not s.lower().endswith(('.gif',))][:6]
    for s in cands[:8]:
        if s.startswith('//'):
            full = 'https:' + s
        elif s.startswith('/'):
            full = url.rstrip('/') + s
        elif s.startswith('http'):
            full = s
        else:
            full = url.rstrip('/') + '/' + s
        print('  CAND', full[:150])
print('done')
