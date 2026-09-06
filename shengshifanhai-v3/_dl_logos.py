# -*- coding: utf-8 -*-
"""Download client logo candidates."""
import sys, os, urllib.request, ssl

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
OUT = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(OUT, '_logos_raw')
os.makedirs(RAW, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

UA = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

def dl(url, name, referer=None):
    out = os.path.join(RAW, name)
    headers = dict(UA)
    if referer:
        headers['Referer'] = referer
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=20, context=ctx).read()
        with open(out, 'wb') as f:
            f.write(data)
        print(name, 'OK', len(data))
    except Exception as e:
        print(name, 'FAIL', type(e).__name__, str(e)[:70])

# 已定位
dl('https://www.cas.cn/images/z19_logo.png', 'cas.png')
dl('https://www.cea.gov.cn/cea/resource/cms/2018/10/img_pc_site/dzj_logo_text.png', 'cea.png')

# 国开行：换镜像/子页重试
dl('https://www.cdb.com.cn/zhxx/gywm/', 'cdb_page.html')
dl('http://www.cdb.com.cn/', 'cdb_http.html')

# 远洋集团备用域名
dl('https://www.sinooceanland.com/', 'ocean_page.html')

# 阿玛尼（worldvectorlogo CDN，常见 slug 尝试）
for slug in ('armani', 'armani-1', 'armani-exchange', 'emporio-armani'):
    dl('https://cdn.worldvectorlogo.com/logos/%s.svg' % slug, slug + '.svg')

print('done')
