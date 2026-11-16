"""Generates the extra icons used by the Hero WaaS slide (new icons, not replacements) with the same rules as build2.py:
Hugeicons glyph, square canvas, stroke 0.6 + 0.03 * size px, colour/gradient baked in.
Usage: python tools/icons/hero-icons.py
"""
import json
import os
import re

SP = os.path.dirname(os.path.abspath(__file__)).replace(os.sep, '/') + '/'
ROOT = os.path.abspath(SP + '../../').replace(os.sep, '/') + '/'
HUGE = json.load(open(SP + 'node_modules/@iconify-json/hugeicons/icons.json', encoding='utf-8'))['icons']

GRAD = [('0', '#002ba8'), ('1', '#6e0cc3')]

# file name -> (hugeicons glyph, canvas px, colour or None for gradient)
ICONS = {
    'icon-hero-fridge': ('fridge', 42, None),
    'icon-hero-drop': ('droplet', 16, '#0233c3'),
    'icon-hero-leaf': ('leaf-01', 24, None),
    'icon-hero-layers': ('layers-01', 24, None),
    'icon-hero-bottle': ('milk-bottle', 42, None),
    'icon-hero-snow': ('snowflake', 42, None),
    'icon-hero-calendar-check': ('calendar-check-01', 42, None),
}


def unwrap(body):
    m = re.match(r'^<g [^>]*>(.*)</g>$', body, re.S)
    if m:
        body = m.group(1)
    return re.sub(r' stroke-width="[\d.]+"', '', body)


for name, (glyph, size, color) in ICONS.items():
    s = size * 1.12
    off = (size - s) / 2
    sw = round((0.6 + 0.03 * size) * 24 / s, 3)
    stroke = color
    defs = ''
    if color is None:
        stops = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in GRAD)
        defs = f'<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="0">{stops}</linearGradient></defs>'
        stroke = 'url(#g)'
    body = unwrap(HUGE[glyph]['body']).replace('currentColor', stroke)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}" fill="none">'
           f'<svg x="{off:.3f}" y="{off:.3f}" width="{s:.3f}" height="{s:.3f}" viewBox="0 0 24 24" fill="none" stroke="{stroke}" '
           f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{defs}{body}</svg></svg>')
    open(ROOT + f'public/figma-assets/{name}.svg', 'w', encoding='utf-8').write(svg)
    print('ok', name)
