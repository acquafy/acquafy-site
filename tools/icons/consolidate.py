"""Collapses byte-identical icon files (same glyph + colour + size) into one canonical file.

Writes tools/icons/aliases.json (duplicate -> canonical) and rewrites every code reference to the duplicate.
Re-runnable: build2.py skips alias files and deletes them from public/figma-assets.
Usage: python tools/icons/consolidate.py
"""
import collections
import hashlib
import json
import os
import re

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')).replace(os.sep, '/') + '/'
SKIP_DIRS = {'node_modules', '.next', 'tools', 'public', '.claude', '.git', 'worktrees'}
EXTS = ('.tsx', '.ts', '.css', '.json', '.js', '.mjs')

data = json.load(open(ROOT + 'app/icones/icon-data.json', encoding='utf-8'))
marks = json.load(open(ROOT + 'public/icon-audit/marks.json', encoding='utf-8'))
optimize = {f for o in marks['optimize'] for f in o['files']}
try:
    aliases = json.load(open(ROOT + 'tools/icons/aliases.json', encoding='utf-8'))
except Exception:
    aliases = {}

texts = {}
for dp, dn, fn in os.walk(ROOT):
    dn[:] = [d for d in dn if d not in SKIP_DIRS]
    for f in fn:
        if f.endswith(EXTS) and '.backup.' not in f and not f.startswith(('package-lock', 'tsconfig')):
            p = os.path.join(dp, f)
            texts[p] = open(p, encoding='utf-8', errors='ignore').read()


def pat(name):
    return re.compile(r'(?<![\w-])' + re.escape(name) + r'(?![\w-])')


def uses(name):
    return sum(len(pat(name).findall(t)) for t in texts.values())


groups = collections.defaultdict(list)
for e in data:
    if e['lucide'] and e['file'] in optimize and e['file'] not in aliases:
        path = ROOT + 'public/figma-assets/' + e['file']
        if os.path.exists(path):
            groups[hashlib.md5(open(path, 'rb').read()).hexdigest()].append(e['file'])

for files in groups.values():
    if len(files) < 2:
        continue
    canon = sorted(files, key=lambda n: (-uses(n), len(n), n))[0]
    for n in files:
        if n != canon:
            aliases[n] = canon

json.dump(aliases, open(ROOT + 'tools/icons/aliases.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

changed, refs, unused = 0, 0, 0
for dup, canon in aliases.items():
    n_dup = 0
    for p, t in list(texts.items()):
        t2, k = pat(dup).subn(canon, t)
        if k:
            texts[p] = t2
            n_dup += k
    refs += n_dup
    if n_dup == 0:
        unused += 1
for p, t in texts.items():
    old = open(p, encoding='utf-8', errors='ignore').read()
    if old != t:
        open(p, 'w', encoding='utf-8').write(t)
        changed += 1
print(f'{len(aliases)} duplicados -> {len(set(aliases.values()))} arquivos canônicos | {changed} arquivos de código alterados, {refs} referências | {unused} duplicados sem uso no código')
