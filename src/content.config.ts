import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 周报：每期一个 Markdown 文件，例如 003.md
// 开头写本期信息和条目，正文写「本周观察」
const weekly = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/weekly' }),
  schema: z.object({
    issue: z.number().int().positive(),
    title: z.string(),
    from: z.coerce.date(),
    to: z.coerce.date(),
    draft: z.boolean().default(false),
    items: z.array(
      z.object({
        title: z.string(),
        category: z.enum(['研究', '产品', '动态', '文章']),
        featured: z.boolean().default(false),
        date: z.coerce.date().optional(),
        summary: z.string().optional(),
        url: z.string().url().optional(),
        source: z.string().optional(),
      }),
    ),
  }),
});

// 深度长文：每篇一个 Markdown 文件
const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { weekly, posts };
