# Anubhav Das — portfolio

The personal site of Anubhav Das, climate-tech investor and deep-tech operator.
A bespoke, motion-rich portfolio built as a static site and hosted free on GitHub Pages.

**Live:** https://anubhavdas1993-bit.github.io

## Editing the site (no coding)

To add a blog post or update your profile, see **[docs/CONTENT-EDITING.md](docs/CONTENT-EDITING.md)** —
a plain-English guide. In short: edit a text file on GitHub, commit, and the site republishes itself
in about two minutes.

## Tech

- **[Astro](https://astro.build)** static site (zero-JS by default; GSAP for the landing motion)
- Self-hosted fonts (Fraunces + JetBrains Mono), optimized WebP imagery
- Content in Markdown collections under `src/content/`
- Auto-deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
```

## Structure

```
src/
  pages/        routes: index (landing), work, writing, contact, 404
  components/   TheRoad (landing), SiteNav, SiteFooter
  content/      experience/ and writing/ — the editable content
  layouts/      Base.astro (the HTML shell)
  lib/          road.ts — the locked landing narrative
  styles/       global.css — the design tokens + base
public/         images, favicon, résumé PDF, robots.txt
docs/           PRODUCT.md, DESIGN.md (design system), CONTENT-EDITING.md
```
