# 夏洛熙的 AI 资讯

一个分享 AI 资讯的静态博客：按天更新的快讯 + 深度长文。基于 Astro，部署到 Cloudflare Pages。

## 本地预览

```bash
npm install
npm run dev
```

## 日常更新

**发快讯**：在 `src/content/news/` 新建以日期命名的文件，如 `2026-11-13.yaml`

```yaml
items:
  - title: 标题
    category: 产品        # 研究 / 产品 / 动态 / 文章
    summary: 一两句摘要（可选）
    url: https://原文链接（可选）
    source: 来源名称（可选，不填显示域名）
    image: https://封面图地址（可选）
```

**写长文**：在 `src/content/posts/` 新建 `.md` 文件

```md
---
title: 标题
description: 一句话简介
date: 2026-11-13
---

正文……
```

站名、简介、页脚链接在 `src/site.ts` 里改；正式域名在 `astro.config.mjs` 里改。

## 部署到 Cloudflare Pages

- 构建命令：`npm run build`
- 输出目录：`dist`
