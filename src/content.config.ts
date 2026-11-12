import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 快讯：每天一个文件，文件名就是日期，例如 2026-11-12.yaml
const news = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/news' }),
  schema: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        category: z.enum(['研究', '产品', '动态', '文章']),
        summary: z.string().optional(),
        url: z.string().url().optional(),
        source: z.string().optional(),
        image: z.string().optional(),
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

export const collections = { news, posts };
