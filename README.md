## VSVnakers 个人网站

基于 VitePress 的个人博客与学习资料站，部署于 GitHub Pages。

### 本地运行

```bash
npm run dev
```

### 构建

```bash
npm run build
```

构建产物位于 `.vitepress/dist`。向 `main` 分支推送后，GitHub Actions 会自动发布到 `gh-pages`。

### 每日论文

部署工作流会从公开仓库 `vsvnakers/paper-daily` 拉取 DeepSeek 生成的论文解读，并发布到 `/papers/`。工作流每天北京时间约 12:30 自动运行，也支持手动触发。

本地同步使用：

```bash
npm run sync-papers
```

该命令默认读取 `D:/paper-daily/essay_read`。生成的 `papers/daily/` 只用于构建，不提交到当前仓库。
