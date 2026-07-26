# AGENTS.md

Static HTML/CSS presentation — no build tools, no package manager, no tests.

## Quick Start

Must use a local server (file:// protocol won't work for fetch-based slide loading):

```bash
npx serve .          # http://localhost:3000
python -m http.server 8000
```

VS Code: Live Server extension (port 5501).

## Architecture

- `index.html` — Shell that fetches and assembles slides dynamically
- `slides/` — 22 individual slide files (single source of truth for content)
- `style/` — 8 CSS files (base, cards, grids, tree-flow, icons, media, animations, print)
- `assets/` — PNGs (logos, images)
- `DESIGN_SYSTEM.md` — Color palette, typography, component rules

## Critical Invariants

**Slide loader (`index.html:65-88`)** — The `SLIDES` array must exactly match files in `slides/`. Adding/removing a slide file requires updating this array.

**Slide numbering is auto-generated** — Do not hardcode slide numbers in HTML. The loader injects `.slide-number` spans at runtime. The title slide (`#s1`) is excluded.

**Slide structure** — Every slide is `<section class="slide" id="sN" data-section="...">` with a `.slide-content` inner div. The `data-section` attribute drives section color theming via CSS.

**CSS load order matters** — Cascading order in `index.html` must be preserved: base → cards → grids → tree-flow → icons → media → animations → print.

## Pending Work

`SPEC-split-tree-flow.md` — Plan to split `style/tree-flow.css` (1109 lines) into `tree.css` (generic) + `sw-track.css` (slide-6-specific). Check this spec before modifying `tree-flow.css`.

## Design System

Colors and tokens defined in `style/base.css:10-38` as CSS custom properties. See `DESIGN_SYSTEM.md` for the design philosophy. Key rule: no 1px borders for sectioning — use tonal layering instead.

## Common Pitfalls

- Editing a slide file without updating the `SLIDES` array = broken loading
- Hardcoding slide numbers = numbers break when slides are added/removed
- Using file:// protocol = fetch errors
- Modifying `tree-flow.css` without checking the split spec
