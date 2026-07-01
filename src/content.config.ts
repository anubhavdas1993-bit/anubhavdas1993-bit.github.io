import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Editable content lives here as Markdown + frontmatter, decoupled from
// presentation. Updating a role or post = editing one file's frontmatter.
// Underscore-prefixed files (e.g. _template.md) are excluded from loading.

const experience = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    context: z.string().optional(),    // the one-line firm descriptor
    stage: z.string().optional(),      // which part of "the road" this seat sits on
    start: z.string(),                 // "YYYY-MM" or display date
    end: z.string().default('Present'),
    location: z.string().optional(),
    order: z.number().default(0),      // lower = shown first (1 = most recent)
    summary: z.string().optional(),
    highlights: z.array(z.string()).default([]),
  }),
});

// The blog. Adding a post = dropping one Markdown file into src/content/writing/.
const writing = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),                     // the standfirst / one-line summary
    date: z.coerce.date(),               // "YYYY-MM-DD" — enables sort + display
    readingMinutes: z.number().optional(),
    draft: z.boolean().default(false),   // true = written but hidden from the index
    heroImage: z.string().optional(),
    heroCredit: z.string().optional(),
  }),
});

export const collections = { experience, writing };
