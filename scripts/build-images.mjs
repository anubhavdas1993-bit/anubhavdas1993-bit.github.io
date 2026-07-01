// ─────────────────────────────────────────────────────────────────────────────
// build-images.mjs — bake real, warm city imagery from the Unsplash API into
// src/lib/images.json at build time. The access key is read from the
// UNSPLASH_ACCESS_KEY environment variable and NEVER written to disk.
//
//   UNSPLASH_ACCESS_KEY=xxxx node scripts/build-images.mjs
//
// Honors Unsplash policy: triggers each photo's download_location endpoint and
// records the photographer credit (name + profile with referral UTM).
// Alt text is preserved from the existing images.json (it is hand-written voice).
//
// Optional: pin a specific photo per section by id, e.g.
//   UNSPLASH_PIN_valley=abc123XYZ  node scripts/build-images.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_PATH = resolve(__dirname, '../src/lib/images.json');

const KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!KEY) {
  console.error(
    '\n  UNSPLASH_ACCESS_KEY is not set. Set it and re-run:\n' +
      '    UNSPLASH_ACCESS_KEY=your_key node scripts/build-images.mjs\n'
  );
  process.exit(1);
}

const API = 'https://api.unsplash.com';
const HEADERS = { Authorization: `Client-ID ${KEY}`, 'Accept-Version': 'v1' };
const REFERRAL = '?utm_source=anubhav_portfolio&utm_medium=referral';

// section key -> LOCKED Unsplash search term (from the brief)
const TERMS = {
  intro: 'research laboratory interior',
  idea: 'Mumbai India street city',
  early: 'Berlin city',
  valley: 'Amsterdam harbour industrial port',
  scale: 'London City financial district',
  close: 'industrial energy landscape at dusk',
};

async function pickPhoto(key, term) {
  const pin = process.env[`UNSPLASH_PIN_${key}`];
  if (pin) {
    const r = await fetch(`${API}/photos/${pin}`, { headers: HEADERS });
    if (!r.ok) throw new Error(`pinned photo ${pin} -> HTTP ${r.status}`);
    return r.json();
  }
  const url =
    `${API}/search/photos?query=${encodeURIComponent(term)}` +
    `&orientation=landscape&per_page=10&content_filter=high`;
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`search "${term}" -> HTTP ${r.status} ${await r.text()}`);
  const data = await r.json();
  if (!data.results?.length) throw new Error(`no results for "${term}"`);
  // Prefer landscape, reasonably wide, well-liked.
  const ranked = data.results
    .filter((p) => p.width >= p.height)
    .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  return (ranked[0] ?? data.results[0]);
}

async function triggerDownload(photo) {
  const loc = photo?.links?.download_location;
  if (!loc) return;
  try {
    await fetch(loc, { headers: HEADERS });
  } catch (e) {
    console.warn(`  ! download trigger failed for ${photo.id}: ${e.message}`);
  }
}

function sizedUrl(photo) {
  // Build off urls.raw so we control sizing + format; warm grading is done in CSS.
  const raw = photo.urls?.raw ?? photo.urls?.full;
  const join = raw.includes('?') ? '&' : '?';
  return `${raw}${join}w=2400&q=80&auto=format&fit=crop`;
}

async function main() {
  const current = JSON.parse(await readFile(IMAGES_PATH, 'utf8'));
  const out = { _note: current._note };

  for (const [key, term] of Object.entries(TERMS)) {
    process.stdout.write(`  ${key.padEnd(7)} "${term}" ... `);
    const photo = await pickPhoto(key, term);
    await triggerDownload(photo);
    out[key] = {
      src: sizedUrl(photo),
      alt: current[key]?.alt ?? `${term}.`,
      credit: {
        name: photo.user?.name ?? 'Unknown',
        profile: (photo.user?.links?.html ?? 'https://unsplash.com') + REFERRAL,
      },
      placeholder: false,
    };
    console.log(`ok  (${photo.user?.name}, id ${photo.id})`);
  }

  await writeFile(IMAGES_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`\n  Wrote ${IMAGES_PATH}\n  Credits baked. Key was never written to disk.\n`);
}

main().catch((e) => {
  console.error(`\n  Failed: ${e.message}\n`);
  process.exit(1);
});
