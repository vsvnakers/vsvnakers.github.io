# VSVnakers 博客改造计划

**更新时间**: 2026-03-14
**框架**: VitePress (现代化、轻量、可爱)
**状态**: ✅ 已完成迁移并部署

---

## ✅ 已完成的任务

### 1. 清理 Hugo 文件
- ✅ 删除 `themes/` 目录
- ✅ 删除 `hugo.toml`
- ✅ 删除 `content/log/` 日志目录
- ✅ 删除 `layouts/` 目录
- ✅ 删除 `.gitmodules`
- ✅ 删除 `.hugo_build.lock`
- ✅ 删除 `archetypes/`
- ✅ 删除 `public/` 和 `static/` 旧构建文件

### 2. 初始化 VitePress 项目
- ✅ 创建 `package.json`
- ✅ 创建 `.vitepress/config.mts` 配置文件
- ✅ 创建 `index.md` 首页
- ✅ 安装依赖

### 3. 迁移内容
- ✅ `docs/posts/` - 博客文章（LRU, FIFO, 2D Convolution, Neovim 等）
- ✅ `docs/resume/` - 个人简历
- ✅ `docs/study/` - 学习资源
- ✅ `docs/tools/` - 工具推荐

### 4. 更新 GitHub Actions
- ✅ 更新 `.github/workflows/deploy.yml` 为 VitePress 部署流程

### 5. 测试并部署
- ✅ 本地构建成功
- ✅ 提交并推送到 GitHub
- ✅ 自动部署到 GitHub Pages

---

## 📁 项目结构

```
vsvnakers.github.io/
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions 部署配置
├── .vitepress/
│   └── config.mts       # VitePress 配置文件
├── docs/
│   ├── posts/           # 博客文章
│   │   ├── LRU.md
│   │   ├── FIFO.md
│   │   ├── 2D Convolution.md
│   │   ├── Neovim.md
│   │   └── index.md
│   ├── resume/
│   │   └── index.md
│   ├── study/
│   │   └── index.md
│   └── tools/
│       ├── index.md
│       └── tt.md
├── index.md             # 首页
├── package.json
├── package-lock.json
└── plan.md              # 本计划文件
```

---

## 🎨 VitePress 特性

| 特性 | 说明 |
|------|------|
| 🚀 极速 | 基于 Vite，热更新秒开 |
| ✨ 美观 | 默认主题简洁可爱 |
| 📱 响应式 | 完美支持移动端 |
| 🌓 深色模式 | 自动切换 |
| 🔍 搜索 | 本地搜索支持 |
| 📝 Markdown 增强 | 支持组件、公式、图表 |

---

## 🚀 常用命令

```bash
# 本地开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

---

## 📝 任务状态

- [x] 安装 Node.js
- [x] 清理 Hugo 文件
- [x] 初始化 VitePress 项目
- [x] 创建配置文件
- [x] 创建首页
- [x] 迁移 Markdown 内容
- [x] 更新 GitHub Actions
- [x] 安装依赖
- [x] 本地测试
- [x] 构建测试
- [x] 提交并推送

---

## 🔗 链接

- **网站**: https://vsvnakers.github.io/
- **GitHub**: https://github.com/vsvnakers/vsvnakers.github.io

---

## 🔗 参考资料

- [VitePress 官方文档](https://vitepress.dev/zh/guide/getting-started)
- [VitePress 主题配置](https://vitepress.dev/zh/reference/default-theme-config)
