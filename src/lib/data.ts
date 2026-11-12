import { getCollection } from 'astro:content';

const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function dayParts(id: string) {
  const [y, m, d] = id.split('-').map(Number);
  return { y, m, d, week: WEEK[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] };
}

export function hostOf(url?: string) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export async function getDays() {
  const days = await getCollection('news');
  return days
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.id))
    .sort((a, b) => (a.id < b.id ? 1 : -1));
}

export async function getPosts() {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => +b.data.date - +a.data.date);
}

export function fmtDate(d: Date) {
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
}
