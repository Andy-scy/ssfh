# -*- coding: utf-8 -*-
"""Deep grep Sino-Ocean homepage for logo assets."""
import sys, os, re

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_logos_raw')
txt = open(os.path.join(RAW, 'ocean_page.html'), encoding='utf-8', errors='ignore').read()

print('== all img tags ==')
for m in re.findall(r'<img[^>]*>', txt, re.I):
    print(m[:200])

print('\n== logo mentions ==')
for m in re.finditer(r'.{70}logo.{90}', txt, re.I):
    print(m.group(0).replace('\n', ' ')[:180])

print('\n== css links ==')
for m in re.findall(r'<link[^>]+href=["\']([^"\']+)["\']', txt, re.I):
    if 'css' in m.lower():
        print(m)
print('done')
