---
title: 这个博客是怎么更新的
description: 快讯每天一个文件，长文每篇一个 Markdown。写完推到 GitHub，Cloudflare 自动发布。
date: 2026-11-12
---

这是一篇示例长文，同时也是这个博客的使用说明。读完可以直接删掉，或者改成你的第一篇文章。

## 发一条快讯

在 `src/content/news/` 里新建一个以日期命名的文件，比如 `2026-11-13.yaml`，照下面的格式写：

```yaml
items:
  - title: 标题
    category: 产品        # 研究 / 产品 / 动态 / 文章 四选一
    summary: 一两句摘要（可不写）
    url: https://原文链接（可不写）
```

同一天有多条，就在 `items` 下面接着往下加。

## 写一篇长文

在 `src/content/posts/` 里新建一个 `.md` 文件，文件名会成为网址的一部分。开头写上标题、简介和日期，下面就是正文，支持标准 Markdown。

> 暂时不想发布的稿子，在开头加一行 `draft: true`。

## 发布

把改动推到 GitHub，Cloudflare Pages 会自动重新构建，一两分钟后线上就更新了。
