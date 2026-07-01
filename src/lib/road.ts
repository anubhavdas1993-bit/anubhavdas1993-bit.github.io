// ─────────────────────────────────────────────────────────────────────────────
// THE ROAD — single content source shared by /v1, /v2, /v3.
// Copy is LOCKED and verbatim from docs/superpowers/reference/landing-brief.md.
// Do not paraphrase, shorten, or reuse earlier drafts. No em dashes. No CTA copy.
//
// The ONE emphasised phrase per stage is wrapped in [square brackets] in the
// `body` string; the renderer strips the brackets and colours that run amber.
// Amber appears in EXACTLY three places sitewide: stage numbers, the bracketed
// phrase, and the glowing line + its head. Everything else is warm off-white
// (prose) or muted warm grey monospace (kill-lists, receipts).
// ─────────────────────────────────────────────────────────────────────────────

import imageData from './images.json';

export type ImageMeta = {
  src: string;
  alt: string;
  /** Photographer credit, present only on real (baked) Unsplash images. */
  credit: { name: string; profile: string } | null;
  /** True while still a dev placeholder (not a baked Unsplash city image). */
  placeholder: boolean;
};

export type Stage = {
  key: string;
  num: string;          // "01".."04" — amber
  title: string;        // sentence-case display title
  side: 'left' | 'right';
  killsLabel: string;   // "What kills it"
  kills: string[];      // kill-list items, verbatim, muted grey mono
  workedLabel: string;  // "What I worked on" / "What I do"
  body: string;         // prose with the single [bracketed] amber phrase
  receipt: string;      // muted grey mono receipt line
};

// images.json is keyed by variant -> section -> ImageMeta, so each route
// (v1/v2/v3) shows a DIFFERENT photo of the same locked subjects.
const imagesByVariant = imageData as Record<string, Record<string, ImageMeta>>;

export const intro = {
  ident: 'Anubhav Das',
  title: 'The Road',
  body:
    "Deep tech, climate, industrial innovation: it doesn't fail in the lab. " +
    "The technology has to work, that's the entry fee, but it's almost never the " +
    "reason these companies die. They die on the way to the market. I've worked " +
    "that problem from four seats: founder, early-stage investor, operator in the " +
    "hardest part of the climb, late-stage. Same lesson each time, in a different " +
    "accent. This is the road, and where I worked it.",
};

export const stages: Stage[] = [
  {
    key: 'idea',
    num: '01',
    title: 'The idea',
    side: 'right',
    killsLabel: 'What kills it',
    kills: [
      'no team yet',
      'founder-market fit unproven',
      'science is not a company',
      'nobody who pays identified',
      'every customer wants something bespoke',
    ],
    workedLabel: 'What I worked on',
    body:
      "I built a company and sold it, and the trap I walked into is the same one " +
      "that catches hard tech. Every customer wanted a bespoke solution, and " +
      "[bespoke feels like serving them when it's actually how you fail to scale]. " +
      "The discipline I learned the hard way: split it. An MVP everyone can buy, " +
      "and a bespoke layer that carries the commercial reality on top. Done right, " +
      "the bespoke customer stops being a customer and becomes a partner, sometimes " +
      "an investor in the business, and when they've put money in, their conviction " +
      "runs higher, because now they need you to win. The product was never the " +
      "hard part. The shape of the deal was.",
    receipt: 'Co-founder and operator, built and exited.',
  },
  {
    key: 'early',
    num: '02',
    title: 'Early stage',
    side: 'left',
    killsLabel: 'What kills it',
    kills: [
      'pilot is not a product',
      'first-customer risk',
      'a market instead of a buyer',
      'no decision-maker named',
      'scale shown on metrics that can vanish',
    ],
    workedLabel: 'What I worked on',
    body:
      "Once we'd backed the technology, I sat with founders on the commercial side. " +
      "The technical depth was the reason they were in the room; [it was almost " +
      "never the reason they won]. Two things separated the ones that made it. They " +
      "could name the exact person who'd use it and the exact person who'd decide. " +
      "And they weren't proving scale on numbers that could disappear, contract " +
      "revenue that looks like growth right up until the contract doesn't renew. " +
      "The platform businesses were the seductive ones, brilliant in theory and " +
      "notorious to scale, especially in B2B. What I learned to want, early, was a " +
      "structured view of how the thing actually compounds, or at least the founder " +
      "having a real vision of that structure. Early and wrong looked identical " +
      "until you forced those questions.",
    receipt: 'Analyst, hands-on with founders, Wermuth, Plus VC, EU innovation programmes.',
  },
  {
    key: 'valley',
    num: '03',
    title: 'The valley',
    side: 'right',
    killsLabel: 'What kills it',
    kills: [
      'the buyer and the financier each waiting for the other to move',
      'mispricing the long-term value of the customer',
      'regulation that shifts under the business',
      'moving targets',
      'first-plant capex no venture or infra fund is sized for',
    ],
    workedLabel: 'What I do',
    body:
      "I left the investor's seat to work this directly, on first-of-a-kind " +
      "synthetic fuel. We had a regulation-backed alternative, and [the obvious " +
      "lever, the fear of high fines, was the thing that moved them least]. The " +
      "penalty set the stage; it never closed the deal. What closed it was the " +
      "upside: security of supply and energy independence, not depending on a " +
      "volatile resource someone else controls, and underneath that, insulation " +
      "from a spot market that swings, with pricing that rewarded whoever committed " +
      "first. The thing we thought we were selling and the thing they were actually " +
      "buying were different things, and you only learn that in the room. The " +
      "deadlock didn't break on cost or compliance. It broke on structure, the " +
      "carrots assembled in the right order. Scaling hard technology is never one " +
      "thing. It's a commercial reality built piece by piece around a molecule " +
      "that, by then, is the least interesting part.",
    receipt: 'Market Intelligence and AI Lead, eSAF.',
  },
  {
    key: 'scale',
    num: '04',
    title: 'Proven scale',
    side: 'left',
    killsLabel: 'What kills it',
    kills: [
      'cost-curve defense',
      'policy durability',
      'commoditization',
      'the next technology',
      'refinancing risk',
    ],
    workedLabel: 'What I worked on',
    body:
      "This is where the founder changes job. The deep-tech founder becomes the CEO " +
      "of a business, and the work stops being the technology and becomes the engine " +
      "around it. What surprised me most: [once real cash flow is coming in, " +
      "financing always appears]. It stops being venture or equity and becomes debt, " +
      "project finance, structures built on predictable returns, cut the cost, " +
      "bundle the projects, turn one proven asset into a repeatable one. The game " +
      "changes from managing an innovation to running a business, and by then it's a " +
      "flywheel that just needs turning. Boring, predictable, reliable cash. Boring " +
      "turned out to be exactly what winning looks like, and a measure of how far " +
      "the start of the road still has to go.",
    receipt: 'Investment Associate, late-stage climate PE.',
  },
];

export const close = {
  body:
    "Four seats, one lesson in four accents: hard technology lives or dies on the " +
    "commercial reality around it, not the merit inside it. So the question I keep " +
    "returning to is simple. There's a brilliant technology sitting somewhere on " +
    "this road right now, stuck at one of these stages, too early or too " +
    "capital-heavy or too far ahead of its market. Which stage is it stuck at, and " +
    "how do I help it through.",
};

export const footer = {
  name: 'Anubhav Das',
  place: 'Berlin',
  link: { label: 'See my journey in detail', href: '/work' },
  email: 'anubhavdas1993@gmail.com',
};

/** Variant config: only TYPE and MOTION change across v1/v2/v3. */
export type Variant = 'v1' | 'v2' | 'v3';

export const variants: Record<Variant, {
  label: string;
  serif: string;
  mono: string;
  fontHref: string;
  motion: string; // motion-style id read by the client script
}> = {
  v1: {
    label: 'Cinematic — Fraunces / JetBrains Mono',
    serif: "'Fraunces', Georgia, serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
    fontHref:
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@300;400;500&display=swap',
    motion: 'hold',
  },
  v2: {
    label: 'Didone — Bodoni Moda / Geist Mono',
    serif: "'Bodoni Moda', Georgia, serif",
    mono: "'Geist Mono', ui-monospace, monospace",
    fontHref:
      'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..700&family=Geist+Mono:wght@300;400;500&display=swap',
    motion: 'drift',
  },
  v3: {
    label: 'Book serif — Spectral / DM Mono',
    serif: "'Spectral', Georgia, serif",
    mono: "'DM Mono', ui-monospace, monospace",
    fontHref:
      'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap',
    motion: 'breathe',
  },
};

/** The image set for a given route (section key -> ImageMeta). */
export function imagesFor(variant: Variant): Record<string, ImageMeta> {
  return imagesByVariant[variant] ?? {};
}

/** Photographer credits present on a given route (attribution requirement). */
export function credits(variant: Variant): { name: string; profile: string }[] {
  const set = imagesFor(variant);
  const seen = new Set<string>();
  const out: { name: string; profile: string }[] = [];
  for (const img of Object.values(set)) {
    if (img?.credit && !seen.has(img.credit.name)) {
      seen.add(img.credit.name);
      out.push(img.credit);
    }
  }
  return out;
}
