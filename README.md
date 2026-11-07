# 2026 Academic Orientation Presentation

Precision Engine v3.0: a 23-slide presentation for Techno Kids & Techno Future Academy.

**Live:** [GitHub Pages](https://ibrhmahmd.github.io/techno-orientation-2026/)

## Quick Start

Plain static files, no build step. Slides are fetched at runtime, so you need a local server:

```bash
python3 -m http.server 8000   # http://localhost:8000
npx serve .                   # http://localhost:3000
```

Or, in VS Code, use the Live Server extension: right-click `index.html` → "Open with Live Server".

## File Structure

```text
├── index.html          ← Shell: SLIDES list, stylesheets, loader script
├── slides/             ← One HTML file per slide (s01_title.html … s22_closing.html)
├── style/              ← CSS, loaded in the order set in index.html
├── assets/             ← Logos, images, icons/ (SVG mask icons)
└── DESIGN_SYSTEM.md    ← Colours, typography, component rules
```

## Editing Slides

1. Edit the slide file in `slides/` (e.g. `slides/s06_software.html`).
2. Refresh the browser.

Adding or removing a slide file? Update the `SLIDES` array in `index.html` to match. See `AGENTS.md` for the rules on slide ids and sections.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `PageDown` | Next slide |
| `←` `↑` `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## Design System

See [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md). Tokens are CSS custom properties in `style/base.css`.

## Export

Exported PDFs go in `export/` (git-ignored).
