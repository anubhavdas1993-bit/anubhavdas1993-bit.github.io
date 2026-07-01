# How to edit your site

Plain-English guide for updating your portfolio — no coding needed. Every change
is made by editing a simple text file on **github.com**, then clicking **Commit**.
About two minutes later the site rebuilds and publishes itself. That's the whole loop:

> **Edit a file → Commit → wait ~2 minutes → it's live.**

If something ever looks wrong after an edit, open the **Actions** tab on your GitHub
repo. A green tick means it published. A red ✗ means a small typo — click it and the
log points at the line to fix (usually a missing `---` or a bad date).

---

## ✍️ Add a blog post

1. On github.com, open the folder **`src/content/writing/`**.
2. Click **Add file → Create new file**.
3. Name it like **`2026-08-my-topic.md`** (year-month, then a short title, ending in `.md`).
4. Paste this and fill it in:

```markdown
---
title: "Your title here"
dek: "One sentence under the title."
date: 2026-08-15
readingMinutes: 7
draft: false
---

Write your post here as normal paragraphs.

## A subheading

> A line starting with a > becomes an amber pull-quote.
```

5. Click **Commit changes**. Done — it appears on your Writing page.

> There's a ready-made copy at `src/content/writing/_template.md` you can duplicate.
> An example post already lives there (`2026-06-energy-sovereignty.md`) that you can copy, edit, or delete.
>
> **Two kinds of post:** simple text essays are Markdown files here in `src/content/writing/` (easy, no coding).
> Rich data articles with custom charts (like "The math behind the crisis-surcharge") are hand-built pages in
> `src/pages/writing/` and are best changed with help.

**Hide a post without deleting it:** set `draft: true`. Set it back to `false` to show it again.

---

## 💼 Update your experience / a job

Each role is one file in **`src/content/experience/`** (e.g. `1-zaffra.md`).
Open it, edit the text, commit. The most useful fields:

- `role`, `company`, `context` — the titles and the one-line firm descriptor.
- `start`, `end`, `location` — dates and place.
- `highlights:` — your bullet points. Each bullet is a line starting with `  - "..."`.
  Keep the quotes around each bullet.

To **add a new role**, copy an existing file, rename it (e.g. `6-newco.md`), and give it
an `order:` number (lower numbers show first, so `order: 1` is most recent).

---

## ✉️ Change contact details or page intros

- **Contact links + email:** `src/pages/contact.astro` (near the top, the `email` and `channels`).
- **Page intros** (the big line under each page title): the `masthead__dek` text in
  `src/pages/work.astro`, `src/pages/writing/index.astro`, `src/pages/contact.astro`.
- **Education & "Beyond the desk":** the lists near the top of `src/pages/work.astro`.

---

## 🖼️ Swap the homepage photos

Run `node scripts/optimize-images.mjs` locally to regenerate the optimized images in
`public/road/`, or replace the `.webp` files there directly (keep the same file names).

---

## 🚫 What NOT to touch (ask for help first)

These are code, not content. Editing them can break the build:

- `src/lib/road.ts` — the homepage narrative. It's deliberately kept as code; change it carefully.
- Anything ending in `.astro`, `.ts`, `.css`, `.js`, or `astro.config.mjs`.

## 3 rules that keep the site from breaking

1. Keep the `---` lines at the top of content files (they fence the settings block).
2. Blog dates look like `2026-08-15` (year-month-day).
3. Don't delete a required field (`title`, `date` for posts; `role`, `company`, `start` for roles).
