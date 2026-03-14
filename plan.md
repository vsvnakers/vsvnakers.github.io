# VSVnakers 博客改造计划

**更新时间**: 2026-03-14
**框架**: VitePress (现代化、轻量、可爱)
**状态**: 迁移完成，待安装依赖和测试

---

## ✅ 已完成的任务

### 1. 清理 Hugo 文件
- ✅ 删除 `themes/` 目录（PaperMod、hugo-theme-stack）
- ✅ 删除 `hugo.toml`
- ✅ 删除 `content/log/` 日志目录
- ✅ 删除 `layouts/` 目录
- ✅ 删除 `.gitmodules`
- ✅ 删除 `.hugo_build.lock`

### 2. 初始化 VitePress 项目
- ✅ 创建 `package.json`
- ✅ 创建 `.vitepress/config.mts` 配置文件
- ✅ 创建 `index.md` 首页

### 3. 迁移内容
- ✅ `docs/posts/` - 博客文章（LRU, FIFO, 2D Convolution, Neovim 等）
- ✅ `docs/resume/` - 个人简历
- ✅ `docs/study/` - 学习资源
- ✅ `docs/tools/` - 工具推荐

### 4. 更新 GitHub Actions
- ✅ 更新 `.github/workflows/deploy.yml` 为 VitePress 部署流程

---

## 📦 一、环境安装（必须先完成）

在另一个终端执行：

```bash
# 1. 安装 Node.js（LTS 版本，22.x）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 验证安装
node -v
npm -v
```

---

## 🚀 二、后续步骤

### Step 1: 安装依赖

```bash
cd /mnt/e/vsvnakers.github.io
npm install
```

### Step 2: 本地测试

```bash
npm run dev
# 访问 http://localhost:5173/
```

### Step 3: 构建测试

```bash
npm run build
# 检查是否有错误
```

### Step 4: 提交并推送

```bash
git add -A
git commit -m "chore: 迁移到 VitePress，移除 Hugo 和日志栏目"
git push origin main
```

---

## 📁 三、项目结构

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
└── plan.md              # 本计划文件
```

---

## 🎨 四、VitePress 特性

| 特性 | 说明 |
|------|------|
| 🚀 极速 | 基于 Vite，热更新秒开 |
| ✨ 美观 | 默认主题简洁可爱 |
| 📱 响应式 | 完美支持移动端 |
| 🌓 深色模式 | 自动切换 |
| 🔍 搜索 | 本地搜索支持 |
| 📝 Markdown 增强 | 支持组件、公式、图表 |

---

## ⚠️ 注意事项

1. **必须先安装 Node.js** - VitePress 需要 Node.js 18+
2. **本地测试后再推送** - 确保 `npm run build` 成功
3. **gh-pages 分支** - GitHub Actions 会自动部署

---

## 📝 当前任务状态

- [x] 清理 Hugo 文件
- [x] 初始化 VitePress 项目
- [x] 创建配置文件
- [x] 创建首页
- [x] 迁移 Markdown 内容
- [x] 更新 GitHub Actions
- [ ] 安装 Node.js ⚠️ **需要你执行**
- [ ] 安装依赖 `npm install` ⚠️ **需要你执行**
- [ ] 本地测试 `npm run dev`
- [ ] 构建测试 `npm run build`
- [ ] 提交并推送

---

## 🔗 参考资料

- [VitePress 官方文档](https://vitepress.dev/zh/guide/getting-started)
- [VitePress 主题配置](https://vitepress.dev/zh/reference/default-theme-config)
