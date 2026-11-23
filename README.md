# 夏洛熙的学习笔记

一份个人学习记录：每周整理人工智能领域的阅读与思考，外加深度长文。基于 Astro，支持 Cloudflare Pages 或服务器 Nginx 静态部署。

## 本地预览

```bash
npm install
npm run dev
```

## 发一期周报

在 `src/content/weekly/` 新建一个文件，文件名用期数，例如 `003.md`：

```md
---
issue: 3                       # 期数，网址会是 /weekly/3/
title: 本期标题
from: 2026-11-20               # 本期覆盖的起止日期
to: 2026-11-26
items:
  - title: 条目标题
    category: 产品             # 研究 / 产品 / 动态 / 文章
    featured: true             # 放进「本周重点」（可选）
    date: 2026-11-21           # 发生日期（可选）
    summary: 一两句摘要（可选）
    url: https://原文链接（可选）
    source: 来源名称（可选，不填显示域名）
---

这里写「本周观察」，几段话说说这周的主线。
```

期数最大的一期会显示在首页，其余自动进入「往期」。还没写完的一期在开头加 `draft: true`，就不会发布。

## 写长文

在 `src/content/posts/` 新建 `.md` 文件：

```md
---
title: 标题
description: 一句话简介
date: 2026-11-26
---

正文……
```

站名、简介、页脚链接在 `src/site.ts` 里改；正式域名在 `astro.config.mjs` 里改。

## 部署到 Cloudflare Pages

- 构建命令：`npm run build`
- 输出目录：`dist`

## 更新 Ubuntu 服务器

正式地址为 `https://www.xialuoxi.com`。已有 Nginx 和 HTTPS 配置的服务器，可在拉取源码后执行：

```bash
cd /opt/ai-news-blog-source
git pull --ff-only
sudo bash scripts/deploy.sh
```

部署脚本会安装锁定的依赖、构建并更新 `/var/www/ai-news-blog/` 下的静态文件，不改动 Nginx 域名和证书配置。服务器需要先安装 Node.js 24 和 Nginx。默认正式地址可以用 `SITE_URL` 环境变量覆盖。

如果之前按部署说明在服务器手工修改过 `src/site.ts`，先保存这份修改，再拉取（修改会保留在 Git stash 中，不自动恢复旧名称）：

```bash
git stash push -m before-ui-update -- src/site.ts
git pull --ff-only
sudo bash scripts/deploy.sh
```
