import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Editable content lives here as Markdown + frontmatter, decoupled from
// presentation. Updating a role/project = editing one file's frontmatter.
// Underscore-prefixed files (e.g. _README.md) are excluded from loading.

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

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    size: z.string().optional(),       // e.g. "$1.6B"
    stage: z.string().optional(),      // e.g. "Series B"
    role: z.string().optional(),       // e.g. "Lead"
    geography: z.string().optional(),
    vertical: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    summary: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// The blog. Adding a post = dropping one Markdown file into src/content/writing/.
// Everything the article page needs comes from this frontmatter; the prose is
// plain Markdown below it. `draft: true` hides a post from the live index.
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

export const collections = { experience, projects, site, writing };
