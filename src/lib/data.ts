import { getCollection } from 'astro:content';

export function hostOf(url?: string) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export async function getIssues() {
  const issues = await getCollection('weekly', (w) => !w.data.draft);
  return issues.sort((a, b) => b.data.issue - a.data.issue);
}

export async function getPosts() {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => +b.data.date - +a.data.date);
}

export const issueUrl = (n: number) => `/weekly/${n}/`;

export function fmtDate(d: Date) {
  return `${d.getUTCFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
}

export function fmtDay(d: Date) {
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日`;
}

// 11月12日至19日 / 10月30日至11月5日
export function fmtRange(from: Date, to: Date) {
  const sameMonth = from.getUTCMonth() === to.getUTCMonth();
  return `${fmtDay(from)}至${sameMonth ? `${to.getUTCDate()}日` : fmtDay(to)}`;
}
