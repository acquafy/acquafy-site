# Icon build

`build2.py` rewrites every replaced icon in `public/figma-assets` (and `lib/replaced-icons.json`).
Originals live in `public/icon-audit/original`. Each file keeps its own colour (gradients included),
its own canvas, and the stroke from the rule 1.5px @ 30px / 1.2px @ 20px (`0.6 + 0.03 * size`).

Only the glyph is shared:

- `MAP` — previous glyph group -> icon (`name` = Hugeicons, `set:name` = another set, `@user_*` = SVG in this folder)
- `OVR`  — per-file exceptions
- `prev_report.json` — which original file belongs to which group

To swap a global icon: change its entry in `MAP` (or add files to `OVR`), then

    cd tools/icons && npm install && python build2.py

and refresh `app/icones/icon-data.json` from the generated report (see the end of `build2.py`, `icon_report.json`).
