# -*- coding: utf-8 -*-
"""Download CDB logo, Sino-Ocean homepage; extract PICC logo from PDF."""
import sys, os, re, urllib.request, ssl, fitz

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
        data = urllib.request.urlopen(req, timeout=20, context=ctx).read()
        with open(os.path.join(RAW, name), 'wb') as f:
            f.write(data)
        print(name, 'OK', len(data))
        return data
    except Exception as e:
        print(name, 'FAIL', type(e).__name__, str(e)[:70])
        return None

dl('http://www.cdb.com.cn/images/logo.png', 'cdb.png')
ocean_html = dl('https://www.sinooceangroup.com/zh-cn/index.html', 'ocean_page.html')
if ocean_html:
    text = ocean_html.decode('utf-8', 'ignore')
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', text, re.I)
    for s in imgs:
        if 'logo' in s.lower():
            print('OCEAN CAND', s)
    if imgs:
        print('OCEAN first imgs:', imgs[:6])

# 从 PDF 提取人保财险 logo（第3页）
doc = fitz.open(r'C:\Users\andy1\Documents\xwechat_files\wxid_6p805y72xpo22_226b\msg\file\2026-09\盛世泛海公司简介2025.pdf')
page = doc[2]
for i, info in enumerate(page.get_images(full=True)):
    pix = fitz.Pixmap(doc, info[0])
    if pix.width == 441 and pix.height == 289:
        out = os.path.join(RAW, 'picc.png')
        pix.save(out)
        print('picc.png OK', pix.width, pix.height)
print('done')
