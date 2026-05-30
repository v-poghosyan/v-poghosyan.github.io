# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal "digital garden" / blog built with [Quarto](https://quarto.org) (v1.5.x) and deployed to GitHub Pages at https://v-poghosyan.github.io. Content is authored as Jupyter notebooks (`.ipynb`) and Quarto markdown (`.qmd`), then rendered to static HTML. There is no Node/Python package manifest — the only build tool is the `quarto` CLI.

## Commands

```bash
quarto preview              # Live-reloading local dev server (use this while editing)
quarto render               # Render the whole site into _site/
quarto render posts/leetcode/lc11_container_with_most_water.ipynb   # Render a single file
quarto publish gh-pages     # Render and push to the gh-pages branch (deploys the live site)
```

- `_site/` (build output) and `.quarto/` are gitignored. Never hand-edit files in `_site/`.
- Deployment is via `quarto publish gh-pages` (the `gh-pages` branch is the published site). There is no GitHub Actions workflow — publishing is a manual local step.

## Content model

- **`posts/`** — published content. The homepage (`index.qmd`) renders a filterable table listing of everything under `posts/`, sorted by `date desc`, grouped by `categories`. Adding a post here makes it appear on the homepage.
- **`unpublished_posts/`** — drafts. These are still rendered by `quarto render` and reachable by direct URL, but they are **not** in the homepage listing (which only points at `posts/`). **Publishing a draft = moving its notebook directory from `unpublished_posts/<topic>/` to `posts/<topic>/`.** This move is the normal workflow (see recent git history).
- Each post lives in a topic folder, with its `.ipynb`/`.qmd` alongside an `assets/` subfolder for that post's images/media.

### Post frontmatter

A notebook post's metadata lives as YAML in the **first markdown cell** of the `.ipynb`. Match this existing shape when creating posts:

```yaml
---
title: "LC11: Container with Most Water"
author: "Vahram Poghosyan"
date: "2022-01-23"
categories: ["Leetcode", "Algorithms", "Dynamic Programming"]
format:
  html:
    code-fold: true
jupyter: python3
include-after-body:
  text: |
    <script type="application/javascript" src="../../javascript/light-dark.js"></script>
---
```

The `src` path in `include-after-body` is relative to the rendered post, so its depth must match the post's nesting (e.g. `../../javascript/light-dark.js` for `posts/<topic>/<post>.ipynb`).

### Freeze (notebook execution cache)

`posts/_metadata.yml` and `unpublished_posts/_metadata.yml` set `freeze: true`; the top-level `_quarto.yml` sets `execute: freeze: auto`. This means rendering does **not** re-execute notebooks from cached output stored in `_freeze/`. If you change code in a notebook and need fresh output, run the notebook (or use `quarto render --execute`) so the freeze cache updates.

## Theming and the light/dark image convention

- The site ships dual themes (`theme-light.scss`, `theme-dark.scss`, both extending Quarto's `flatly`), configured in `_quarto.yml`. SCSS changes apply site-wide.
- `javascript/light-dark.js` swaps image/iframe `src` based on the active theme using a **filename convention**: a file named `*.light.png` is automatically replaced with `*.dark.png` (and vice versa) when the user toggles dark mode. To make a theme-aware image, provide both `name.light.ext` and `name.dark.ext` and reference the `.light` variant in the post. The post must include `light-dark.js` via `include-after-body` (above) for the swap to work.

## Assets

Site-wide assets live in `assets/` (e.g. `assets/site/logo.png`, `favicon.png`, vendored `assets/font_awesome/`). Per-post media lives inside that post's own folder under an `assets/` (or similarly named) subdirectory, not in the top-level `assets/`.