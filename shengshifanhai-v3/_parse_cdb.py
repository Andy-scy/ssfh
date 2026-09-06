# -*- coding: utf-8 -*-
"""Parse CDB homepage HTML for logo candidates."""
import re, sys, os

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_logos_raw')
html = open(os.path.join(RAW, 'cdb_http.html'), encoding='utf-8', errors='ignore').read()
print('html len', len(html))

imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
print('total img:', len(imgs))
for s in imgs:
    low = s.lower()
    if any(k in low for k in ('logo', 'cdb', 'head', 'top', 'brand')):
        print('CAND', s)
# og:image
for m in re.findall(r'og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.I):
    print('OG', m)
# css background url with logo
for m in re.findall(r'url\(["\']?([^"\')]+)["\']?\)', html, re.I)[:20]:
    if 'logo' in m.lower():
        print('CSSBG', m)
print('done')
