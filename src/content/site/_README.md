# site/ — singletons (about, contact, meta)

Underscore-prefixed files (like this one) are NOT loaded as entries.
Schema is defined in `src/content.config.ts`. One file per singleton, e.g.
`about.md`, `contact.md`. Body Markdown is rendered where the section needs prose.

```yaml
---
title: "About"
description: "Optional summary used for meta / SEO."
---

Body copy goes here (rendered as Markdown).
```
