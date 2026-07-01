# DESIGN.md — "The Road" design system (locked)

The single source of visual truth. Reference build: `prototypes/01-valley/the-road.html` (approved).
Every page inherits this system. Amber restraint is a hard law, not a preference.

## The one law: amber lives in EXACTLY three places
`--amber #F5A623` may appear only as:
1. the **stage numbers** (01–04),
2. the **one accent phrase per stage** (italic, inside the prose),
3. the **road** (its fill line + the glowing bead head).

Amber is never a border, never a background, never a link color, never a button. Selection highlight and
focus ring are paper/parchment, **not** amber. If a new element "needs" amber, it doesn't get it — rework it.

## Color tokens
```
--ink:      #0C0A07   /* warm near-black, amber-tinted — the world */
--ink-2:    #100C08   /* footer / deepest panels */
--paper:    #EDE6D9   /* warm off-white — body text */
--paper-dim:#C9C0B2
--muted:    #9A9082   /* warm-grey — JetBrains Mono data/labels */
--muted-2:  #6F665B   /* fainter mono */
--amber:    #F5A623   /* the ONLY accent (see the law) */
--ghost:    rgba(237,230,217,.16)  /* road ghost thread — non-amber */
```
It is a single warm graded world: photographs are colour-graded warm/sepia and darkened so text sits on them
legibly; the valley section is the darkest point.

## Typography (locked identity — do not swap)
- **Display / prose:** Fraunces (variable: opsz, wght, SOFT, WONK). Italic + `WONK` is used for the amber accent phrase and the valley title.
- **Data / labels / mono:** JetBrains Mono (300/400/500).
- This pairing is the committed brand identity; it is intentionally kept even though both are common picks.
  Identity-preservation wins over novelty here.
- Display heading: `clamp()` down to phone, tight tracking (~ -0.045em) on the big "The road."
- Body prose capped ~40–48ch; mono labels use wide tracking (.26–.32em), uppercase, small.

## Layout
- Single-page **scrollytelling**: full-bleed 100vh scenes — intro, four stages, a centered quiet close, then the footer.
- One text panel per scene, **single side, alternating** (intro left · s1 right · s2 left · valley right · s4 left · close center).
- A directional read-scrim sits on the **text side only** so copy always clears a hard contrast floor over the photo.
- Max content width ~1480px; fluid gutter `clamp(22px, 6vw, 104px)`.

## The signature: the road
An SVG "comet road" overlaid on the scenes (desktop only). A faint full-height **ghost thread** + an **amber fill**
that draws down as you scroll, led by a **glowing bead head** at the reader's position. It is a smooth Catmull-Rom
curve that rides the *empty* (image) side opposite the text, and swings to its extreme low point at the valley (the dip).
On mobile the road is hidden — mobile stays clean and legible.

## Motion
- GSAP + ScrollTrigger drive the road draw + quiet one-direction reveals (opacity + small y). Lenis may add smooth scroll.
- Reveals **enhance an already-visible default** (`gsap.from`) — content is never gated behind a class, so no-JS / reduced-motion / crawlers still see everything.
- Valley: the world dims and the bead halo swells. No layout flip.
- Ease-out curves only. No bounce, no elastic.

## Accessibility (non-negotiable)
- `prefers-reduced-motion: reduce` → the road draws to a static parked state, all content shown, no scroll-jank. Verified every build.
- One `<h1>` per page. Skip-link to `#main`. Focus-visible ring in paper, not amber.
- Photos are atmospheric behind heavy scrims; meaning is carried by text, so decorative images use empty alt.
- `forced-colors` (Windows high-contrast): road/scrims drop out, the accent phrase falls back to italic + underline.
- Body text clears ≥4.5:1 on its graded backdrop; mono labels are sized/spaced to stay legible.

## Imagery
- Subjects (locked): research/chemistry lab (intro) · Mumbai street/commuter crowd or idea scene · Berlin/early cityscape ·
  industrial petroleum harbour / container port (valley, darkest) · City of London financial district (scale) ·
  industrial energy landscape at dusk (close).
- Production must **self-host + resize** these (WebP/AVIF, ≤~1920px, width/height set, LCP image preloaded). Every `<img>`
  keeps a graceful fallback (a warm graded gradient panel) so a failed image never shows a broken icon.

## Content architecture (maintainability)
- Editable content lives in `src/content/**` collections (`experience`, `projects`, `site`, `writing`) as Markdown + frontmatter.
- The landing's locked narrative is the deliberate exception: it stays in `src/lib/road.ts` (handle with care, not casual edits).

## Bans (in addition to the amber law)
No em/en dashes · no dollar/deal figures · no CTA language · no side-stripe borders · no gradient text · amber never leaks
outside its three homes.
