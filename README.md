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

部署工作流会从私有仓库 `vsvnakers/paper-daily` 拉取 DeepSeek 生成的论文解读，并发布到 `/papers/`。`paper-daily` 每天北京时间 08:00 生成论文后会立即触发本站同步；本站也会在每天 11:00 补跑一次，并支持手动触发。

跨仓库同步需要在本站仓库的 Actions secrets 中配置 `PAPER_DAILY_TOKEN`，该令牌只需拥有 `vsvnakers/paper-daily` 的 Contents 读取权限。若令牌缺失，部署会明确失败，不再静默发布旧论文。

本地同步使用：

```bash
npm run sync-papers
```

该命令默认读取 `D:/paper-daily/essay_read`。自动部署时会临时生成 `papers/daily/`；需要补齐历史内容时，也可以在本地同步后提交这些 Markdown 文件。
