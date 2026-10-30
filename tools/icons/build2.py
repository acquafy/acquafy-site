"""Replaces the site's icons with Hugeicons (one consistent stroke family) keeping each icon's colour.

Stroke thickness follows the user's rule: 1.5px at a 30px icon, 1.2px at 20px  ->  px = 0.6 + 0.03 * size.
"""
import json, os, re
from collections import Counter

SP = os.path.dirname(os.path.abspath(__file__)).replace(os.sep, '/') + '/'
ROOT = os.path.abspath(SP + '../../').replace(os.sep, '/') + '/'
NM = SP + 'node_modules/@iconify-json/'
ASSETS = ROOT + 'public/figma-assets/'
ORIG = ROOT + 'public/icon-audit/original/'

HUGE = json.load(open(NM + 'hugeicons/icons.json', encoding='utf-8'))['icons']
PREV = {e['file'][:-4]: e['lucide'] for e in json.load(open(SP + 'prev_report.json', encoding='utf-8'))}

# previous glyph group -> Hugeicons name
MAP = {
    'activity': 'activity-03', 'arrow-right': 'arrow-right-02', 'atom': 'atom-02', 'award': 'award-05',
    'badge-percent': 'badge-percent', 'bell': 'notification-01', 'bell-ring': 'bell-ring', 'bluetooth': 'bluetooth',
    'book-open': 'book-open-01', 'bottle': 'milk-bottle', 'box': 'package', 'boxes': 'boxes', 'brain': 'lucide:brain',
    'building-2': 'building-02', 'calendar': 'calendar-04', 'calendar-sync': 'calendar-sync', 'chart-column': 'chart-column',
    'chart-growth': 'chart-up', 'check': 'tick-02', 'chevron-right': 'arrow-right-01', 'chevron-up': 'arrow-up-01',
    'circle-check': 'checkmark-circle-01', 'circle-dollar-sign': 'dollar-circle', 'circle-play': 'play-circle',
    'circle-user': 'user-circle', 'circle-x': 'cancel-circle', 'clock': 'clock-01', 'cloud': 'cloud',
    'cloud-download': 'cloud-download', 'cloud-globe': 'cloud-server', 'coffee': 'coffee-02', 'cpu-ai': 'artificial-intelligence-04',
    'crown': 'iconoir:crown-circle', 'cycle-dollar': 'exchange-dollar', 'droplet-arrows': 'droplet', 'droplet-circle': 'droplet',
    'droplet-cycle': 'water-energy', 'droplet-ripple': 'droplet', 'droplet-sparkle': 'iconoven:clean-water',
    'filter-housing': 'water-pump', 'filters-3': '@rack4', 'filters-4': '@rack4', 'flask-conical': 'chemistry-02',
    'gem': 'diamond-02', 'gift': 'gift', 'globe': 'globe-02', 'globe-grid': 'earth', 'globe-leaf': '@user_globe',
    'globe-nodes': '@globenodes', 'graduation-cap': 'graduation-cap', 'handshake': 'handshake', 'headphones': 'headphones',
    'headset': 'headset', 'house': 'home-03', 'languages': 'languages', 'layers': 'layers-01',
    'layout-dashboard': 'dashboard-browsing', 'layout-grid': 'dashboard-square-01', 'leaf-cycle': 'eco-energy',
    'lightbulb': 'bulb', 'lock': 'square-lock-01', 'mail': 'mail-01', 'map': 'map', 'map-pin': 'location-01',
    'map-pinned': 'location-04', 'megaphone': 'megaphone-02', 'message-circle-more': 'bubble-chat',
    'message-square': 'comment-02', 'message-square-more': 'chat', 'monitor': 'computer', 'monitor-play': 'modern-tv',
    'phone-call': 'call-02', 'plane': 'airplane-01', 'plug': 'plug-01', 'plug-zap': 'plug-01', 'puzzle': 'puzzle',
    'qr-code': '@user_qr', 'recycle': 'recycle-02', 'router': 'router-01', 'scan-qr-code': '@user_qr2',
    'screen-dollar-arrows': 'money-exchange-01', 'settings': 'settings-01', 'shield': 'shield-01',
    'shield-check': 'lucide:shield-check', 'shield-droplet': '@shielddrop', 'shirt': 'shirt-01', 'shopping-bag': 'shopping-bag-01',
    'shopping-cart': 'shopping-cart-01', 'sliders-vertical': 'settings-04', 'smartphone': 'smart-phone-01',
    'sparkles': 'ai-magic', 'sprout': 'plant-01', 'square-plus': 'add-square', 'star': 'star', 'tablet': 'tablet-01',
    'trending-up': 'trending-up', 'truck': 'truck', 'users': 'user-multiple-03', 'users-3': 'user-group-03',
    'waypoints': 'atom-01', 'wifi': 'wifi-01', 'wrench': 'repair', 'x': 'cancel-01',
}
# per-file corrections where the structure differs from the group
OVR = {
    'icon-agua-pura': 'majesticons:lidquid-drop-waves-2-line', 'icon-agua-pura-30px': 'majesticons:lidquid-drop-waves-2-line',
    'ts-icon-preserv-agua': 'majesticons:lidquid-drop-waves-2-line', 'icon-water-20': 'tabler:drop-circle',
    'checkin-icon-support': 'user-multiple-03', 'icon-squeeze': 'bottle-wine', 'icon-mapa': 'earth',
    'icon-integration': '@globenodes',
    'icon-filter-a': '@rack4',
}
# glyphs that sit best when sized by the longest canvas side
BY_MAX = {'arrow-right-02', 'arrow-right-01', 'arrow-up-01', 'tick-02', 'cancel-01', 'wifi-01', 'cloud', 'smart-phone-01',
          'tablet-01', 'bottle-wine', 'milk-bottle', 'airplane-01', 'languages'}

LUCIDE = json.load(open(NM + 'lucide/icons.json', encoding='utf-8'))['icons']
ICONOIR = json.load(open(NM + 'iconoir/icons.json', encoding='utf-8'))['icons']

# filter racks: tubes under a cap bar, laid out symmetrically around x=12
RACK4 = (
    '<rect x="1.25" y="2" width="21.5" height="3.5" rx="1"/>'
    '<path d="M6.5 2v3.5M12 2v3.5M17.5 2v3.5"/>'
    + ''.join(f'<path d="M{x} 5.5v13.5a1.5 1.5 0 0 0 3 0V5.5"/>' for x in (2.25, 7.75, 13.25, 18.75))
)
RACK3 = (
    '<path d="M4 7V4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5V7"/>'
    '<rect x="1" y="7" width="22" height="3.5" rx="1"/><path d="M8.5 7v3.5M15.5 7v3.5"/>'
    + ''.join(f'<path d="M{x} 10.5v9a2.5 2.5 0 0 0 5 0v-9"/>' for x in (2.5, 9.5, 16.5))
)
# every CTA-button arrow shares one canvas and is shown at 18px, so the stroke follows the 18px rule
BUTTON_ARROWS = {'icon-arrow-' + n for n in ['accent', 'blue-b', 'blue-c', 'white-solid', 'white-a', 'blue-outline-a', 'blue-outline-b',
                 'blue-outline-c', 'blue-outline-btn', 'blue-a', 'white-b', 'white-small', 'white-hover', 'white-solid-btn',
                 'blue-solid', 'blue-small', 'white-bk', 'b']}

# globe with a ring of connected nodes (no ready-made icon has this): Hugeicons globe in the centre, ring of 10 nodes joined by arcs
def _globe_nodes():
    import math
    R, rn, n = 9.6, 1.35, 10
    parts = []
    for k in range(n):
        a = math.radians(-90 + 360 / n * k)
        x, y = 12 + R * math.cos(a), 12 + R * math.sin(a)
        parts.append(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{rn}"/>')
        gap = (rn + 0.5) / R
        a1, a2 = a + gap, a + math.radians(360 / n) - gap
        x1, y1, x2, y2 = 12 + R * math.cos(a1), 12 + R * math.sin(a1), 12 + R * math.cos(a2), 12 + R * math.sin(a2)
        parts.append(f'<path d="M{x1:.2f} {y1:.2f}A{R} {R} 0 0 1 {x2:.2f} {y2:.2f}"/>')
    g = unwrap(HUGE['globe-02']['body'])
    parts.append(f'<g transform="translate(12 12) scale(0.58) translate(-12 -12)" stroke-width="2.1">{g}</g>')
    return ''.join(parts)


def _shield_drop():
    sh = unwrap(HUGE['shield-01']['body'])
    dr = unwrap(HUGE['droplet']['body'])
    return sh + f'<g transform="translate(12 11.6) scale(0.46) translate(-12 -12)" stroke-width="2.6">{dr}</g>'

USER_SVG = open(SP + 'user_globe.svg', encoding='utf-8').read()
USER_QR = open(SP + 'user_qr.svg', encoding='utf-8').read()
USER_QR2 = open(SP + 'user_qr2.svg', encoding='utf-8').read()


def unwrap(body):
    m = re.match(r'^<g [^>]*>(.*)</g>$', body, re.S)
    if m:
        body = m.group(1)
    return re.sub(r' stroke-width="[\d.]+"', '', body)


def user_body(svg):
    """Inner elements of a downloaded SVG; strokes inherit from the outer svg, solid dots keep a fill."""
    inner = re.search(r'<svg\b[^>]*>(.*)</svg>', svg, re.S).group(1)
    inner = re.sub(r'<defs\b.*?</defs>', '', inner, flags=re.S)
    inner = re.sub(r'<g>\s*</g>', '', inner)
    inner = re.sub(r' clip-path="[^"]*"', '', inner)
    inner = re.sub(r' id="[^"]*"', '', inner)
    inner = re.sub(r' style="([^"]*)"', lambda m: ' fill="currentColor" stroke="none"' if 'fill:#000000' in m.group(1) and 'fill:none' not in m.group(1) else '', inner)
    return inner


def norm(c):
    c = c.strip().lower()
    if c == 'white': return '#ffffff'
    if c == 'black': return '#000000'
    if re.match(r'^#[0-9a-f]{3}$', c): return '#' + ''.join(ch * 2 for ch in c[1:])
    return c


def analyse(svg):
    root = re.search(r'<svg\b[^>]*>', svg).group(0)
    vb = re.search(r'viewBox="([\d.\s-]+)"', root)
    W = H = 24.0
    if vb:
        p = [float(x) for x in vb.group(1).split()]
        W, H = p[2], p[3]
    w = re.search(r'\swidth="([\d.]+)"', root); h = re.search(r'\sheight="([\d.]+)"', root)
    if w and h:
        W, H = float(w.group(1)), float(h.group(1))
    vals = []
    for mm in re.finditer(r'(?<![\w-])(?:stroke|fill)="([^"]+)"', svg):
        v = mm.group(1).strip()
        vm = re.match(r'var\(--[\w-]+,\s*(.+)\)$', v)
        if vm: v = vm.group(1).strip()
        if v.lower() in ('none', 'transparent', 'currentcolor'): continue
        if v.startswith('url(') or v.startswith('#') or v.lower() in ('white', 'black'):
            vals.append(v)
    cnt = Counter(norm(v) if not v.startswith('url(') else v for v in vals)
    color = cnt.most_common(1)[0][0] if cnt else None
    stops = None
    if color and color.startswith('url(#'):
        gid = color[5:-1]
        g = re.search(r'<(?:linearGradient|radialGradient)\b[^>]*id="' + re.escape(gid) + r'"[^>]*>(.*?)</(?:linearGradient|radialGradient)>', svg, re.S)
        stops = []
        if g:
            for s in re.finditer(r'<stop\b[^>]*>', g.group(1)):
                tag = s.group(0)
                off = re.search(r'offset="([^"]+)"', tag); col = re.search(r'stop-color="([^"]+)"', tag)
                if col: stops.append((off.group(1) if off else '0', norm(col.group(1))))
        if stops: color = None
        else: color = '#0569ff'; stops = None
    if not color and not stops:
        color = '#0569ff'
    return W, H, color, stops


BUTTON_ARROWS_ACTIVE = set()


def build(name, body, vb, W, H, color, stops):
    W = H = max(W, H)                 # every replaced icon has a square canvas, so FigmaIcon can show it in a square slot
    if name in BUTTON_ARROWS_ACTIVE:
        S = 26.0                      # the arrow ink spans ~14 of 24 units, so this fills most of the 18px slot
    elif name.startswith('@user'):
        S = W * 0.98                  # downloaded glyphs already fill their box
    elif name in ('@rack3', '@rack4', '@globenodes'):
        S = W * 1.0
    else:
        S = W * 1.12                  # library glyphs leave ~2 of 24 units of air
    S = round(S, 3)
    x = round((W - S) / 2, 3); y = round((H - S) / 2, 3)
    px = 0.6 + 0.03 * max(W, H)            # stroke in canvas units (= px at nominal size)
    if name in BUTTON_ARROWS_ACTIVE:
        px = 0.6 + 0.03 * 18             # the arrow is always shown at 18px
    sw = round(px * vb / S, 3)             # same stroke in the glyph's own units
    defs = ''; stroke = color
    if stops:
        stop_xml = ''.join(f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops)
        defs = f'<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="{vb}" y2="0">{stop_xml}</linearGradient></defs>'
        stroke = 'url(#g)'
    body = body.replace('currentColor', stroke)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:g}" height="{H:g}" viewBox="0 0 {W:g} {H:g}" fill="none">'
            f'<svg x="{x}" y="{y}" width="{S}" height="{S}" viewBox="0 0 {vb} {vb}" fill="none" stroke="{stroke}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{defs}{body}</svg></svg>')


def _marked_keep():
    """Files to keep as the original. Sticky: groups ticked MANTER ORIGINAL on /icones (public/icon-audit/marks.json)
    are added to tools/icons/keep-original.json, because a group disappears from the page once it is applied."""
    path = SP + 'keep-original.json'
    try:
        keep = set(json.load(open(path, encoding='utf-8')).get('files', []))
    except Exception:
        keep = set()
    try:
        d = json.load(open(ROOT + 'public/icon-audit/marks.json', encoding='utf-8'))
        keep |= {fn for g in d.get('keepOriginal', []) for fn in g['files']}
    except Exception:
        pass
    json.dump({'files': sorted(keep)}, open(path, 'w', encoding='utf-8'), indent=1)
    return {fn[:-4] for fn in keep}


KEEP_MARKED = _marked_keep()
report = []
for f in sorted(PREV):
    prev = PREV[f]
    orig = open(ORIG + f + '.svg', encoding='utf-8').read()
    W, H, color, stops = analyse(orig)
    if f in KEEP_MARKED:             # groups the user ticked MANTER ORIGINAL on /icones (synced to public/icon-audit/marks.json)
        import shutil
        shutil.copyfile(ORIG + f + '.svg', ASSETS + f + '.svg')
        report.append({'file': f + '.svg', 'lucide': None, 'color': color or 'gradient'})
        continue
    if prev in ('chart-growth', 'cloud-globe', 'screen-dollar-arrows') or f in ('icon-shield-integridade', 'mp-icon-shield', 'icon-rating', 'icon-rating-20anos', 'icon-star', 'icon-benefit-hydrogen', 'ts-icon-experiencia'):       # original is already a stroke icon the user likes: keep the original file
        import shutil
        shutil.copyfile(ORIG + f + '.svg', ASSETS + f + '.svg')
        report.append({'file': f + '.svg', 'lucide': None, 'color': color or 'gradient'})
        continue
    if prev is None:
        report.append({'file': f + '.svg', 'lucide': None, 'color': color or 'gradient'})
        continue
    name = OVR.get(f) or MAP[prev]
    BUTTON_ARROWS_ACTIVE.clear()
    if f in BUTTON_ARROWS:
        W, H = 18.0, 18.0
        BUTTON_ARROWS_ACTIVE.add(name)
    if name == '@user_globe':
        body, vb, label = user_body(USER_SVG), 512, 'globe_10735603.svg'
    elif name == '@user_qr':
        body, vb, label = user_body(USER_QR), 682.667, 'qr-code_3594823.svg'
    elif name == '@user_qr2':
        body, vb, label = user_body(USER_QR2), 512, 'qr-code_7420584.svg'
    elif name == '@globenodes':
        body, vb, label = _globe_nodes(), 24, 'globo com nós (Hugeicons globe-02 + anel de nós)'
    elif name == '@shielddrop':
        body, vb, label = _shield_drop(), 24, 'escudo com gota (Hugeicons shield-01 + droplet)'
    elif name == '@rack4':
        body, vb, label = RACK4, 24, 'filtros (estrutura própria, 4 tubos)'
    elif name == '@rack3':
        body, vb, label = RACK3, 24, 'filtros (estrutura própria, 3 tubos)'
    elif name.startswith(('majesticons:', 'tabler:', 'iconoven:')):
        lib, nm = name.split(':', 1)
        body, vb, label = unwrap(json.load(open(NM + f'{lib}/icons.json', encoding='utf-8'))['icons'][nm]['body']), 24, name
    elif name.startswith('lucide:'):
        body, vb, label = unwrap(LUCIDE[name[7:]]['body']), 24, name
    elif name.startswith('iconoir:'):
        body, vb, label = unwrap(ICONOIR[name[8:]]['body']), 24, name
    else:
        body, vb, label = unwrap(HUGE[name]['body']), 24, name
    open(ASSETS + f + '.svg', 'w', encoding='utf-8').write(build(name, body, vb, W, H, color, stops))
    report.append({'file': f + '.svg', 'lucide': label, 'color': color if color else 'gradient ' + ' → '.join(c for _, c in stops)})

# consolidated duplicates (tools/icons/aliases.json): the canonical file is used everywhere, so the duplicate is removed
try:
    ALIASES = json.load(open(SP + 'aliases.json', encoding='utf-8'))
except Exception:
    ALIASES = {}
for _dup in ALIASES:
    try:
        os.remove(ASSETS + _dup)
    except FileNotFoundError:
        pass
json.dump(sorted(r['file'] for r in report if r['lucide']), open(ROOT + 'lib/replaced-icons.json', 'w', encoding='utf-8'))
json.dump(report, open(SP + 'icon_report.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# data for the /icones review page, plus a version so the browser refreshes the SVGs
json.dump([{'file': e['file'], 'lucide': e['lucide'], 'color': e['color'], 'alias': ALIASES.get(e['file'])} for e in report], open(ROOT + 'app/icones/icon-data.json', 'w', encoding='utf-8'), ensure_ascii=False)
import time
json.dump({'v': int(time.time())}, open(ROOT + 'app/icones/icon-version.json', 'w', encoding='utf-8'))
print('done', len(report), 'replaced', sum(1 for r in report if r['lucide']))
