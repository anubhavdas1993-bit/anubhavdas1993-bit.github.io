// ─────────────────────────────────────────────────────────────────────────────
// build-images-commons.mjs — bake real, freely-licensed imagery from Wikimedia
// Commons into src/lib/images.json. No API key required.
//
//   node scripts/build-images-commons.mjs
//
// Each of the three routes (v1/v2/v3) gets its OWN distinct photo per section,
// all drawn from the same locked subjects/terms (research lab, Mumbai, Berlin,
// Amsterdam harbour, City of London, industrial energy at dusk). Output shape:
//   { _note, v1: {intro,idea,early,valley,scale,close}, v2: {...}, v3: {...} }
//
// Pin a specific file for one route+section (exact Commons filename, no "File:"):
//   PIN_v2_valley="Petroleumhaven Amsterdam Netherlands.jpg" node scripts/build-images-commons.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_PATH = resolve(__dirname, '../src/lib/images.json');
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = 'AnubhavPortfolio/1.0 (the-road landing; anubhavdas1993@gmail.com)';
const VARIANTS = ['v1', 'v2', 'v3'];

// Each section: hand-written alt + an ordered list of search queries. We walk the
// queries collecting good landscape photos until we have one distinct image per
// route (3 total), so every route shows a different photo of the same subject.
const SECTIONS = {
  intro: {
    alt: 'A research laboratory interior, glassware and instruments on the bench, where the technology has to work before anything else can.',
    queries: ['chemistry laboratory glassware', 'science research laboratory interior', 'laboratory flasks experiment'],
  },
  idea: {
    alt: 'A crowded Mumbai scene, the dense ground where an idea first meets a market that wants something bespoke from everyone.',
    queries: ['Mumbai street crowd', 'Mumbai local train commuters', 'Mumbai market street city'],
  },
  early: {
    alt: "Berlin's cityscape, the early-stage city where pilots are pushed to become products.",
    queries: ['Berlin skyline cityscape', 'Berlin aerial city', 'Berlin city street dusk'],
  },
  valley: {
    alt: 'An industrial harbour, tanks and cranes along dark water, the valley floor where first-of-a-kind plants are financed or die.',
    queries: ['Petroleumhaven Amsterdam', 'Amsterdam Westpoort harbour industrial', 'Amsterdam port cranes ships'],
  },
  scale: {
    alt: 'The City of London financial district, towers at dusk, where proven assets finally look like infrastructure.',
    queries: ['City of London skyline financial district', 'City of London skyscrapers Gherkin', 'London financial district towers'],
  },
  close: {
    alt: 'An industrial energy landscape at dusk, stacks and steam against the sky, the road still ahead.',
    queries: ['power plant sunset', 'power station industrial dusk', 'industrial chimney sunset landscape'],
  },
};

const seenGlobal = new Set(); // avoid the same photo in two places

function stripHtml(s) {
  if (!s) return '';
  return s.replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').trim();
}

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', origin: '*', ...params })}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

function isGood(ii) {
  if (!ii) return false;
  if (!/image\/(jpeg|png)/.test(ii.mime || '')) return false;
  if (!ii.width || !ii.height) return false;
  if (ii.width < 1600) return false;
  if (ii.width < ii.height * 1.25) return false; // landscape only
  return true;
}

function meta(page, ii, alt) {
  const em = ii.extmetadata || {};
  const artist = stripHtml(em.Artist?.value) || 'Wikimedia Commons';
  const lic = stripHtml(em.LicenseShortName?.value) || '';
  return {
    src: ii.thumburl || ii.url,
    alt,
    credit: { name: lic ? `${artist} (${lic})` : artist, profile: ii.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}` },
    placeholder: false,
  };
}

async function infoFor(file) {
  const data = await api({ action: 'query', titles: `File:${file}`, prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '2400' });
  const p = Object.values(data.query.pages)[0];
  return { page: p, ii: p?.imageinfo?.[0] };
}

async function candidates(queries) {
  const found = [];
  for (const q of queries) {
    const data = await api({
      action: 'query', generator: 'search', gsrsearch: q, gsrnamespace: '6', gsrlimit: '30',
      prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '2400',
    });
    const pages = data.query?.pages ? Object.values(data.query.pages) : [];
    pages.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    for (const p of pages) {
      if (seenGlobal.has(p.title)) continue;
      if (found.some((f) => f.page.title === p.title)) continue;
      if (isGood(p.imageinfo?.[0])) found.push({ page: p, ii: p.imageinfo[0] });
      if (found.length >= 3) return found;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  return found;
}

async function main() {
  const out = { _note: 'GENERATED FILE. Real imagery from Wikimedia Commons (freely licensed); each route v1/v2/v3 gets a distinct photo per section. Regenerate: node scripts/build-images-commons.mjs', v1: {}, v2: {}, v3: {} };

  for (const [key, cfg] of Object.entries(SECTIONS)) {
    process.stdout.write(`  ${key.padEnd(7)} `);
    const picks = [];
    for (const v of VARIANTS) {
      const pin = process.env[`PIN_${v}_${key}`];
      if (pin) { const { page, ii } = await infoFor(pin); if (ii) picks.push({ page, ii }); }
    }
    const need = 3 - picks.length;
    if (need > 0) {
      const cands = await candidates(cfg.queries);
      for (const c of cands) { if (picks.length >= 3) break; picks.push(c); }
    }
    if (picks.length < 3) throw new Error(`only found ${picks.length}/3 for "${key}"`);
    picks.forEach((p, i) => {
      seenGlobal.add(p.page.title);
      out[VARIANTS[i]][key] = meta(p.page, p.ii, cfg.alt);
    });
    console.log(picks.map((p, i) => `${VARIANTS[i]}:${p.page.title.replace(/^File:/, '').slice(0, 28)}`).join('  '));
  }

  await writeFile(IMAGES_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`\n  Wrote ${IMAGES_PATH}\n`);
}

main().catch((e) => { console.error(`\n  Failed: ${e.message}\n`); process.exit(1); });
