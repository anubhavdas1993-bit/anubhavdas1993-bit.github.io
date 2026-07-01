import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosting: root user page — repo `anubhavdas1993-bit.github.io`, served at root.
export default defineConfig({
  site: 'https://anubhavdas1993-bit.github.io',
  base: '/',
  output: 'static',
  integrations: [sitemap()],
});
