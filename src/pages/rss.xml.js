import rss from '@astrojs/rss';
import { SITE } from '../site';
import { getDays, getPosts } from '../lib/data';

export async function GET(context) {
  const posts = await getPosts();
  const days = (await getDays()).slice(0, 30);
  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/posts/${p.id}/`,
    })),
    ...days.flatMap((d) =>
      d.data.items.map((it) => ({
        title: `[${it.category}] ${it.title}`,
        description: it.summary ?? '',
        pubDate: new Date(`${d.id}T00:00:00Z`),
        link: it.url ?? '/',
      })),
    ),
  ].sort((a, b) => b.pubDate - a.pubDate);

  return rss({ title: SITE.name, description: SITE.description, site: context.site, items });
}
