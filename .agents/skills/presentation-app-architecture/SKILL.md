---
name: presentation-app-architecture
description: >
  Architecture guidelines for building and refactoring HTML-based presentation
  (slide deck) apps, specifically the Techno Orientation project. Covers build
  tooling, JS module structure, CSS architecture, and slide content strategy.
---

# Presentation App Architecture

## Stack
- **Build tool**: Vite (vanilla JS, no framework)
- **JS**: ES Modules (`src/modules/` directory)
- **CSS**: CSS `@layer` for globals, CSS Modules for isolated complex slides
- **Slides**: HTML partials for complex slides, data-driven JS templates for simple slides

## Folder Structure
src/
  main.js              ← entry point
  modules/
    loader.js          ← slide loading + SLIDES registry
    nav.js             ← nav dots + keyboard navigation
    scrollReveal.js    ← IntersectionObserver scroll reveal
    fitSlides.js       ← viewport scaling (transform: scale)
  data/
    slides.config.js   ← content data for simple slides
  templates/
    simpleSlide.js     ← renderXxx(data) → HTML string functions
  styles/
    main.css           ← @layer declarations + @imports
    tokens.css         ← CSS custom properties
    reset.css          ← box model reset
    layout.css         ← grids, slide scaffold
    components.css     ← cards, icons, tree-flow
    animations.css     ← reveal animations
    print.css          ← print styles
slides/                ← HTML partials (fetched at runtime)
assets/                ← static images

## Slide Classification Rule
- **Simple slide** (data-driven): Mostly repeating card/list patterns → `slides.config.js` + template
- **Complex slide** (HTML partial): Custom layouts, tree flows, embedded logos → keep as `.html` file

## CSS @layer Order (enforced in main.css)
@layer reset, tokens, layout, components, animations, print;

## Key Constraints
- App is presentation-only (no authoring UI)
- Must run with: npm run dev (Vite HMR) and npm run build
- Print CSS must render each .slide on a separate page
- fitSlides() must scale content via transform:scale at any resolution

## Migration Phases
1. Bootstrap Vite (package.json, vite.config.js) — zero behavior change
2. Extract inline <script> into src/modules/ — zero behavior change
3. CSS @layer consolidation — zero visual change (pixel-identical)
4. Data-driven simple slides — content moves to slides.config.js
5. (Optional) CSS Modules for largest/most complex slides
