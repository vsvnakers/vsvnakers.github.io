---
title: 工具
description: 实际使用场景明确的软件与开发资源
sidebar: false
---

# 工具

这个页面只收录用途明确、值得再次使用的工具。与单纯的收藏夹不同，每一项都会说明适用场景和选择它的理由。

## 文档翻译

### [BabelDOC](https://app.immersivetranslate.com/babel-doc)

面向 PDF 和技术文档的双语翻译工具，适合阅读论文、手册与长篇外文资料。

**适合场景**

- 希望保留原文版式，并对照阅读译文；
- 文档中包含公式、表格或多栏排版；
- 需要处理比浏览器网页更复杂的 PDF。

**使用建议**

技术名词和代码标识符仍需结合原文确认。翻译适合降低首次阅读成本，不应代替对关键段落的核对。

- 项目仓库：[funstory-ai/BabelDOC](https://github.com/funstory-ai/BabelDOC)

## 数据可视化

### [Veusz](https://veusz.github.io/download/)

面向科学数据的二维、三维绘图工具，支持通过图形界面调整图表，也能使用脚本复现绘图流程。

**适合场景**

- 绘制实验曲线、散点图与误差线；
- 需要比电子表格更精细的坐标轴和排版控制；
- 希望将绘图配置保存下来，之后继续修改或复用。

**选择理由**

它兼顾了 GUI 的即时反馈和脚本化的可重复性，适合不值得单独搭建一套 Python 绘图工程的小型数据任务。

- 项目仓库：[veusz/veusz](https://github.com/veusz/veusz)

## 网站维护

### VitePress

本站使用的静态站点生成器。文章以 Markdown 保存，构建后可以直接部署到 GitHub Pages。

```bash
npm run dev      # 本地预览
npm run build    # 生成静态页面
npm run preview  # 检查构建结果
```

- 官方文档：[vitepress.dev](https://vitepress.dev/)

### GitHub Actions 与 Pages

用于自动构建和部署本站。向 `main` 分支推送后，工作流会安装依赖、执行构建，并把静态产物发布到 `gh-pages`。

这套流程的价值是：内容、模板和部署配置都保存在同一个仓库中，网站可以从任意一次提交重新生成。

## 收录标准

一个工具进入这里之前，至少应该满足一项：

- 明显节省重复劳动；
- 能改善结果的可验证性或可复现性；
- 在某个特定场景中比常见替代品更顺手；
- 已经实际使用过，并且知道它的局限。

如果你有适合系统学习或技术写作的工具推荐，可以在[留言板](/guestbook/)告诉我。
