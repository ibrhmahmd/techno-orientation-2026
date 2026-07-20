# 2026 Academic Orientation Presentation

Precision Engine v3.0 — 22-slide presentation for Techno Kids & Techno Future Academy.

**Live:** [GitHub Pages](https://ibrhmahmd.github.io/techno-orientation-2026/)

## Quick Start

Slides are loaded dynamically from individual files. **You need a local server:**

```bash
# Python
cd techno-orientation-2026
python -m http.server 8000
# Open http://localhost:8000

# Node.js
npx serve .
# Open http://localhost:3000

# VS Code
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

## File Structure

```
├── index.html                 ← Shell (loads slides dynamically)
├── slides/                    ← Individual slide files (single source of truth)
│   ├── s01_title.html
│   ├── s02_skill_gap.html
│   └── ... (22 files)
├── style/
│   ├── base.css              ← Design tokens + reset
│   ├── cards.css             ← Card components
│   ├── grids.css             ← Grid layouts
│   ├── tree-flow.css         ← Tree flowchart system
│   ├── icons.css             ← Icon styling
│   ├── media.css             ← Responsive breakpoints
│   ├── animations.css        ← Reveal animations
│   └── print.css             ← Print stylesheet
├── assets/                    ← Images, logos (27 PNGs)
└── parts/                     ← Header/footer shell fragments
```

## Editing Slides

1. Open the individual slide file in `slides/` (e.g., `slides/s06_software.html`)
2. Make your changes
3. Refresh the browser — changes appear automatically

**No rebuild needed.** Edit one file, see changes immediately.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `PageDown` | Next slide |
| `←` `↑` `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## Design System

See `doc_templates/design-system-guide.md` in the [main curriculum repo](https://github.com/ibrhmahmd/Techno-Futues-Documetation) for colors, typography, and component specs.

## Export

PDF and PPTX export scripts live in the parent `techno_documentation` repo under `presentations/2026-academic-orientation/`.
