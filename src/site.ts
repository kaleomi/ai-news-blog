// 站点基本信息，都在这里改
export const SITE = {
  name: '夏洛熙的 AI 资讯',
  author: '夏洛熙',
  tagline: '每周一期，读完就跟上了 AI',
  description: '每周整理一次：新模型、新产品、论文和值得读的文章。',
  // 导航栏右侧的外链，不需要就留空数组
  links: [] as { label: string; href: string }[],
  // 页脚的社交链接
  socials: [{ label: 'GitHub', href: 'https://github.com/kaleomi' }],
};

export const CATEGORIES = ['研究', '产品', '动态', '文章'] as const;
export type Category = (typeof CATEGORIES)[number];
