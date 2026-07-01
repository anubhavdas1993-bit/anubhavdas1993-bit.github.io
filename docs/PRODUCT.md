# PRODUCT.md — Anubhav Das, portfolio

**What it is:** A bespoke, motion-rich personal portfolio for Anubhav Das — climate-tech investor and deep-tech operator. The site itself is the proof of the thesis "I underwrite by building, not by reading." It is not a résumé dump; it is an argument, told as a scroll.

**Register:** Brand (design IS the product). A visitor's *impression* is the deliverable. Every page must feel authored and crafted, never templated.

**Primary audience:** Investors, founders, and hiring partners in climate / deep tech who are scanning to answer one question — *is this person the real thing?* The work page in particular is read by a recruiter scanning experience, so clarity there beats cinema.

**The core narrative ("The Road"):** Hard technology rarely dies in the lab — it dies on the way to the market. Anubhav has worked that road from four seats: founder, early-stage investor, operator in the hardest part of the climb, late-stage. The landing tells that road as a scrollytelling journey; the other pages (work, writing, contact) hang off it.

**Voice (three physical words):** warm · deliberate · load-bearing. Warm like dusk light on industrial landscape; deliberate like a person who has sat in the room; load-bearing in that every sentence carries weight, nothing decorative.

**Hard content rules (locked):**
- **No deal/dollar figures anywhere.** Experience is shown by scope, never by amount.
- **No em dashes or en dashes** in copy (hairline markers / commas instead).
- **No CTA-speak** ("Get in touch!", "Let's chat"). The tone is quiet and confident.
- Copy on the landing is **LOCKED and verbatim** — it lives in `src/lib/road.ts` / the approved `prototypes/01-valley/the-road.html` and changes only deliberately.

**Pages (target):** Landing ("The Road") · Work (experience, recruiter-clear) · Writing (blog) · Contact. Connected by a global nav.

**Tech / hosting:** Static Astro, deployed free to GitHub Pages (public repo, root user page `<username>.github.io`). Editable content lives in Astro Content Collections so profile/blog updates are one-file edits. See `DESIGN.md` for the locked visual system.
