# AGENTS.md

Static HTML/CSS slide deck: no build tools, no package manager, no tests. Deployed as plain files to GitHub Pages.

## Serving

Slides load with `fetch`, so serve over HTTP (`file://` fails):

```bash
python3 -m http.server 8000
npx serve .
```

VS Code Live Server also works.

## Layout

- `index.html` is the shell: the `SLIDES` array, the `<link>` tags, and the inline loader script.
- `slides/` holds one file per slide. `sNN_` prefixes keep them in deck order.
- `style/` holds the CSS. `assets/` holds images, logos and `assets/icons/*.svg`.
- `DESIGN_SYSTEM.md` is the design philosophy. Tokens live in `:root` in `style/base.css`.

## Invariants

**`SLIDES` mirrors `slides/`.** The `SLIDES` array in `index.html` lists every file in `slides/`, exactly, in deck order. Add, remove or rename a slide file and the array changes with it.

**Slide ids are hand-written, stable and unique.** Each slide is `<section class="slide" id="sN" data-section="...">` with a `.slide-content` child. Ids (`s1`…`s22`, plus `s6b`) are written in the slide file, not generated. CSS targets them (`#s6` in `style/track-diagram.css`) and the nav dots link to `#id`, so a new slide gets a new id (like `s6b`) and existing ids keep theirs. Never renumber or duplicate an id.

**`data-section` is one of** `opening | curriculum | competition | results | closing`. Each maps to `--section-color` / `--section-color-light` in `style/base.css`; a new value needs a new rule there.

**CSS load order** in `index.html` is base → cards → grids → tree → track-diagram → compete → icons → media → animations → print. Keep it.

## Loader pipeline (inline in `index.html`)

1. `loadSlides()` fetches each `SLIDES` entry in turn into `#slides-container`, builds the nav dots in `#slide-nav`, then runs `initScrollReveal()`, `initNavHighlight()` and `initArrowNavigation()`.
2. `fitSlides()` scales each `.slide-content` with `transform: scale()` (max 1.3×) to fit the viewport, measuring the widest child. It re-runs after `document.fonts.ready` plus image decode, and on resize.
3. `fitSlides()` calls `drawRails(tree)` for each `.track-tree`, which draws the dashed SVG checkpoint rails from `data-rail` / `data-rail-to` attributes.

Let `fitSlides()` handle overflow: it already scales oversized content down, so leave out fixed heights and `overflow: hidden`.

## CSS modules

- `tree.css`: generic `.tree`, `.flow-*`, `.timeline-*` components.
- `track-diagram.css`: the `track-` prefix, shared by s06 and s07. Colour variants (`.track-node-*`) set only `--track-color`. `.track-tree-grid` lays the tree out with `grid-template-areas`.
- `compete.css`: the `compete-` prefix: competition boxes, checkpoint badges, rails and `+3 sessions` tags.

## Icons and images

- Icons are CSS mask icons: `<span class="track-icon track-icon-<name>">`, with `<name>` from `assets/icons/<name>.svg`.
- Slide files contain no inline `<svg>…</svg>`. VS Code Live Server injects its script before every `</svg>` but sets Content-Length for only one injection, which truncates the response. Use a mask icon or an `<img>`. SVG created at runtime by JS is fine.
- `assets/logo.png` is the dark logo used in the `.logo-slot` corners; `assets/logo-white.png` is for dark backgrounds.
- Keep images small: convert large photos to WebP (the slide-16 photo is a 138 KB WebP).
- `export/` is git-ignored and holds exported PDFs.

## Design rule

Section with tonal layering (background shifts), never 1px borders. See `DESIGN_SYSTEM.md`.
