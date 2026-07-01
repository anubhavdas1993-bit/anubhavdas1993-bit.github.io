# projects/ — one Markdown file per deal / case study

Underscore-prefixed files (like this one) are NOT loaded as entries.
Schema is defined in `src/content.config.ts`.

```yaml
---
name: "Greenfield bPtL sustainable aviation fuel"
size: "$1.6B"            # optional
stage: "Series B"        # optional
role: "Lead"             # optional
geography: "Sweden"      # optional
vertical: "eSAF"         # optional
order: 1                 # lower = shown first
featured: true           # surface in highlight reel
summary: "Modelled route economics & offtake across the full Fischer-Tropsch chain."
links:                   # optional
  - { label: "Case study", url: "https://example.com" }
---
```
