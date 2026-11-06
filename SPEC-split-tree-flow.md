# SPEC: Split `tree-flow.css` into `tree.css` + `track-diagram.css`

## Status: Implemented

## Context

After the dead-code deletion in commit 7ea9cd5, `style/tree-flow.css` was **874 lines** holding
two separate things:

1. **Generic tree/flow/timeline components** (lines 1–218)
2. **Track diagram module** (lines 219–874): every `.sw-*` rule. It is used by both
   `slides/s06_software.html` and `slides/s07_robotics.html`, so it is a shared module
   and not specific to slide 6.

The split is a pure move. No selector, value or rule order changes.

## Scope

| In scope | Out of scope |
|----------|-------------|
| Create `style/tree.css` (original lines 1–218) | CSS variable extraction |
| Create `style/track-diagram.css` (original lines 219–874) | Renaming `.sw-*` selectors |
| Delete `style/tree-flow.css` | `!important` fixes |
| Replace the `<link>` in `index.html` | Doc updates (AGENTS.md, CLAUDE.md, README.md) |

Each new file starts with one added header comment line. Everything below it is copied
byte-for-byte from the original.

## File Assignments

### `style/tree.css` (original lines 1–218)

| Original lines | Section | Selectors |
|----------------|---------|-----------|
| 1–4 | File banner | — |
| 6–11 | Shared heading font | `.tree-node .node-label`, `.flow-node`, `.timeline-age` |
| 13–61 | Vertical tree | `.tree`, `.tree-node` and children (`.node-label`, `.node-sub`, `.node-tags`) |
| 63–84 | Enhanced tree nodes | `.tree-node.xl`, `.tree-node.highlight` |
| 86–175 | Horizontal flow | `.flow-row`, `.flow-node` (+ `small`, `.accent`, `.compact`, `.bold`, `.highlight`, `.icon-plate`), `.flow-arrow`, `.flow-arrow.dim` |
| 177–216 | Timeline tree | `.timeline-tree`, `.timeline-age`, `.timeline-content` |

### `style/track-diagram.css` (original lines 219–874)

| Original lines | Section | Selectors |
|----------------|---------|-----------|
| 219–381 | Shared styles | `.sw-track-flow`, `.sw-entry-sequence`, `.sw-entry-node`, `.sw-entry-arrow`, `.sw-node-label`, `.sw-node-discovery/foundation/bridge`, `.sw-node-card`, `.sw-node-web/python/problem/project/final`, `.sw-node-logo`, `.sw-node-logo-sm`, `.sw-node-icon`, `.sw-node-name`, `.sw-node-level` |
| 383–470 | 4-column tree | `.sw-tree`, `.sw-tree-h`, `.sw-col`, `.sw-col-entry/intro/spec/db`, `.sw-col-branch`, `.sw-col-branches`, `.sw-spec-group` |
| 472–528 | Branch junction | `.sw-branch-junction`, `.sw-branch-circle`, `.sw-branch-h-line`, `.sw-branch-v-lines`, `.sw-branch-v-line` |
| 530–604 | Track containers | `.sw-track`, `.sw-track-header`, `.sw-track-icon`, `.sw-track-title`, `.sw-track-flow`, `.sw-flow-node`, `.sw-flow-arrow` |
| 606–656 | Track branches + variants | `.sw-spec-container`, `.sw-node-backend`, `.sw-node-gamedev`, `.sw-track-backend`, `.sw-track-gamedev`, `.sw-track-database` |
| 658–672 | Convergence zone | `.sw-node-database` |
| 675–746 | Checkpoint | `.sw-checkpoint`, `.sw-checkpoint-diamond`, `.sw-checkpoint-icon/label/sub`, `.sw-connector-to-checkpoint` |
| 748–874 | Responsive | `@media` at 1400px, 1100px, 900px, 600px |

### `@media` blocks

All four `@media` blocks sit at the end of the file (lines 752–874) and contain **only
`.sw-*` rules**. The generic section has no `@media` blocks. No block mixes generic and
`.sw-*` rules, so the cut at line 218/219 is clean. Likewise, no `.sw-*` rule appears in
lines 1–218 and no non-`.sw-*` rule appears in lines 219–874.

## HTML Change

In `index.html`, the single link is replaced in the same position (after `grids.css`,
before `icons.css`), so cascade order is unchanged:

```html
<link rel="stylesheet" href="style/tree.css">
<link rel="stylesheet" href="style/track-diagram.css">
```

## Verification

| # | Check | Method |
|---|-------|--------|
| 1 | Rules unchanged | Strip the first line of each new file, concatenate (tree then track-diagram), and diff against `git show 7ea9cd5:style/tree-flow.css` → no diff |
| 2 | No visual regression | Pixel-diff screenshots of every slide before/after, especially s06 and s07 |
| 3 | No 404s | Browser dev tools → Network → both CSS files load |
