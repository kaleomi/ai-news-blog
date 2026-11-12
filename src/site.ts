// 站点基本信息，都在这里改
export const SITE = {
  name: '夏洛熙的 AI 资讯',
  author: '夏洛熙',
  tagline: '每天读完这一页，就跟上了 AI',
  description: '模型、产品、论文和值得一读的文章，按天整理。',
  // 导航栏右侧的外链，不需要就留空数组
  links: [] as { label: string; href: string }[],
  // 页脚的社交链接
  socials: [{ label: 'GitHub', href: 'https://github.com/kaleomi' }],
};

export const CATEGORIES = ['研究', '产品', '动态', '文章'] as const;
export type Category = (typeof CATEGORIES)[number];
