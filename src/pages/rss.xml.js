import rss from '@astrojs/rss';
import { SITE } from '../site';
import { getIssues, getPosts, issueUrl } from '../lib/data';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(context) {
  const issues = await getIssues();
  const posts = await getPosts();
  const items = [
    ...issues.map((w) => ({
      title: `第 ${w.data.issue} 期：${w.data.title}`,
      pubDate: w.data.to,
      link: issueUrl(w.data.issue),
      content:
        '<ul>' +
        w.data.items
          .map((it) => `<li><strong>${esc(it.title)}</strong>${it.summary ? `：${esc(it.summary)}` : ''}</li>`)
          .join('') +
        '</ul>',
    })),
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/posts/${p.id}/`,
    })),
  ].sort((a, b) => b.pubDate - a.pubDate);

  return rss({ title: SITE.name, description: SITE.description, site: context.site, items });
}
