// 站点基本信息，都在这里改
export const SITE = {
  name: '夏洛熙的学习笔记',
  author: '夏洛熙',
  tagline: '保持好奇，认真记录',
  description: '夏洛熙的个人学习记录：整理人工智能的新发现，留下阅读、实践与思考的痕迹。',
  // 导航栏右侧的外链，不需要就留空数组
  links: [] as { label: string; href: string }[],
  // 页脚的社交链接
  socials: [{ label: 'GitHub', href: 'https://github.com/kaleomi' }],
};

export const CATEGORIES = ['研究', '产品', '动态', '文章'] as const;
export type Category = (typeof CATEGORIES)[number];
