// Downloads the approved hero images and writes optimized WebP into public/road/,
// plus a 1200x630 social-share image at public/og-image.jpg.
// Run:  node scripts/optimize-images.mjs
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const map = {
  intro: 'photo-1778078983840-a36cd3ebd892',
  s1: 'photo-1706961121517-a4d78c3ce3cc',
  s2: 'photo-1618754087664-96688bcf29a3',
  s3: 'photo-1759611325490-1e05282fbedb',
  s4: 'photo-1654292541857-9d5a6d8f3ef3',
  close: 'photo-1610028290816-5d937a395a49',
};

await mkdir('public/road', { recursive: true });
let introBuf;
for (const [key, id] of Object.entries(map)) {
  const res = await fetch(`https://images.unsplash.com/${id}?w=2560&q=80&auto=format&fit=crop`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (key === 'intro') introBuf = buf;
  const out = await sharp(buf).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer();
  await writeFile(`public/road/${key}.webp`, out);
  console.log(`road/${key}.webp  ${(out.length / 1024).toFixed(0)} KB`);
}
const og = await sharp(introBuf).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
await writeFile('public/og-image.jpg', og);
console.log(`og-image.jpg  ${(og.length / 1024).toFixed(0)} KB`);
