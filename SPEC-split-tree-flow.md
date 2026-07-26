# SPEC: Split `tree-flow.css` into `tree.css` + `sw-track.css`

## Status: DRAFT

## Context

`style/tree-flow.css` is **1109 lines** — the largest CSS file in the project. It contains
two unrelated subsystems bundled together:

1. **Generic tree/flow/timeline components** (lines 1–302) — reusable across any slide
2. **Software track diagram** (lines 304–1109) — slide-6-specific styles for the
   `.sw-*` namespace

Splitting these into separate files improves maintainability without changing any behavior.

---

## Scope

| In scope | Out of scope |
|----------|-------------|
| Create `style/tree.css` with generic tree/flow/timeline rules | CSS variable extraction |
| Create `style/sw-track.css` with software-track rules | Renaming `media.css` |
| Remove `tree-flow.css` | Dead variable cleanup |
| Update `index.html` load order | `!important` fixes |
| Verify no visual regression | Inline `<style>` moves |

---

## File Assignments

### `style/tree.css` (~302 lines)

Source: `tree-flow.css` lines 1–302.

| Lines | Section | Selector patterns |
|-------|---------|-------------------|
| 6–11 | Shared heading font | `.tree-node .node-label`, `.flow-node`, `.timeline-age` |
| 13–61 | Vertical tree | `.tree`, `.tree::before`, `.tree-node`, `.tree-node::before`, `.tree-node .node-label`, `.tree-node .node-sub`, `.tree-node .node-tags` |
| 63–84 | Enhanced tree nodes | `.tree-node.xl`, `.tree-node.highlight` |
| 86–175 | Horizontal flow | `.flow-row`, `.flow-node`, `.flow-node small`, `.flow-node.accent`, `.flow-node.compact`, `.flow-arrow`, `.flow-arrow.dim`, `.flow-node.bold`, `.flow-node.highlight`, `.flow-node.icon-plate` |
| 177–204 | Flow subgraph | `.flow-subgraph`, `.flow-subgraph-label`, `.flow-subgraph-inner` |
| 206–246 | Timeline tree | `.timeline-tree`, `.timeline-age`, `.timeline-content` |
| 248–302 | Organic tree + animation | `.tree-organic`, `.tree-organic .org-node`, `.tree-organic svg.org-connectors`, `@keyframes dash-flow` |

### `style/sw-track.css` (~807 lines)

Source: `tree-flow.css` lines 304–1109.

| Lines | Section | Selector patterns |
|-------|---------|-------------------|
| 304–471 | Software track shared styles | `.sw-track-flow`, `.sw-entry-sequence`, `.sw-entry-node`, `.sw-entry-arrow`, `.sw-node-label`, `.sw-node-discovery`, `.sw-node-foundation`, `.sw-node-bridge`, `.sw-node-card`, `.sw-node-web`, `.sw-node-python`, `.sw-node-problem`, `.sw-node-project`, `.sw-node-final`, `.sw-node-logo`, `.sw-node-logo-sm`, `.sw-node-icon`, `.sw-node-name`, `.sw-node-level`, `.sw-node-sub` |
| 473–561 | 4-column horizontal tree | `.sw-tree`, `.sw-tree.sw-tree-h`, `.sw-col`, `.sw-col-entry`, `.sw-col-intro`, `.sw-col-spec`, `.sw-col-db`, `.sw-col-branch`, `.sw-col-branches`, `.sw-spec-group` |
| 562–618 | Branch junction | `.sw-branch-junction`, `.sw-branch-circle`, `.sw-branch-h-line`, `.sw-branch-v-lines`, `.sw-branch-v-line` |
| 620–694 | Track containers | `.sw-track`, `.sw-track-header`, `.sw-track-icon`, `.sw-track-title`, `.sw-track-flow`, `.sw-flow-node`, `.sw-flow-arrow`, `.sw-flow-arrow-split` |
| 696–796 | Track branches + variants | `.sw-track-branches`, `.sw-spec-container`, `.sw-branch-col-label`, `.sw-branch-frontend/backend/pyweb/gamedev`, `.sw-node-backend`, `.sw-node-gamedev`, `.sw-track-backend`, `.sw-track-gamedev`, `.sw-track-database` |
| 798–983 | Convergence + checkpoint | `.sw-convergence-zone`, `.sw-conv-*`, `.sw-conv-db-col`, `.sw-node-database`, `.sw-checkpoint`, `.sw-checkpoint-diamond`, `.sw-connector-to-checkpoint`, `.sw-flow-arrow-down` |
| 985–1109 | Responsive (software track) | `@media (max-width: 1400px)`, `@media (max-width: 1100px)`, `@media (max-width: 900px)`, `@media (max-width: 600px)` — only the `.sw-*` rules |

**Note on responsive rules (985–1109):** Some breakpoints contain mixed rules.
The `.sw-*` rules go to `sw-track.css`. Any generic `.flow-node`, `.flow-arrow`,
`.tree` rules that appear in those breakpoints stay in `tree.css`. Specifically:

- At `1400px`: `.sw-entry-sequence`, `.sw-node-card`, `.sw-node-logo`, `.sw-node-name`
  → all `.sw-*`, goes to `sw-track.css`
- At `1100px`: `.sw-tree`, `.sw-entry-sequence`, `.sw-node-card`, `.sw-node-logo`,
  `.sw-node-logo-sm`, `.sw-node-name`, `.sw-node-level`, `.sw-node-label`,
  `.sw-col-branch`, `.sw-col-branches`
  → all `.sw-*`, goes to `sw-track.css`
- At `900px`: `.sw-tree`, `.sw-entry-sequence`, `.sw-col-branch`, `.sw-col-branches`,
  `.sw-tree-h`, `.sw-track-flow`, `.sw-flow-arrow`, `.sw-flow-arrow-split`,
  `.sw-spec-container`
  → all `.sw-*`, goes to `sw-track.css`
- At `600px`: `.sw-entry-sequence`, `.sw-entry-arrow`, `.sw-node-card`, `.sw-node-logo`,
  `.sw-node-logo-sm`, `.sw-node-name`, `.sw-node-level`, `.sw-node-sub`, `.sw-node-label`
  → all `.sw-*`, goes to `sw-track.css`

All responsive rules in lines 985–1109 are exclusively `.sw-*` selectors.
**No generic tree/flow rules exist in the responsive section.** This makes the split clean.

---

## HTML Changes

### `index.html` — update stylesheet links

**Before:**
```html
<link rel="stylesheet" href="style/tree-flow.css">
```

**After:**
```html
<link rel="stylesheet" href="style/tree.css">
<link rel="stylesheet" href="style/sw-track.css">
```

Both files load after `grids.css` and before `icons.css` to preserve cascade order.

### Delete `style/tree-flow.css`

After both new files are verified, remove the original.

---

## Verification Checklist

| # | Check | Method |
|---|-------|--------|
| 1 | No CSS rules lost | Diff line count: `tree.css` lines + `sw-track.css` lines ≈ 1109 |
| 2 | No visual regression | Open `index.html` in browser, navigate to slide 6, compare before/after |
| 3 | Generic trees still work | Check any slide using `.tree`, `.flow-row`, `.flow-node`, `.timeline-tree` |
| 4 | Load order correct | Both new `<link>` tags replace the single old one in same position |
| 5 | No 404s | Browser dev tools → Network tab → no failed CSS loads |

---

## Risk Assessment

**Risk: Low.** This is a mechanical file split with no style changes.
- No selectors are modified, renamed, or removed
- No specificity changes
- No cascade reordering (both files load in the same position as the original)
- The only change is which `.css` file each rule lives in
