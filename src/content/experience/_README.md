# experience/ — one Markdown file per role

Underscore-prefixed files (like this one) are NOT loaded as entries.
Schema is defined in `src/content.config.ts`.

```yaml
---
role: "Market Intelligence & AI Lead"
company: "Zaffra"
start: "2022-11"          # YYYY-MM
end: "Present"            # optional, defaults to "Present"
location: "Berlin"        # optional
order: 1                  # lower = shown first
summary: "One-line framing of the role."   # optional
highlights:               # bullet points
  - "Owned the techno-economic & GHG/LCA models for commercial-scale eSAF."
  - "Led firm-wide AI adoption; shipped internal tools used daily."
---
```
