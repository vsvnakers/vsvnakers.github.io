---
title: "从 0 配置 Neovim"
date: 2025-06-01T02:58:00+08:00
categories: ["博客"]
draft: false
---


# 🚀 从 0 配置 Neovim 成为 VSCode 替代开发环境（v0.9.5）

## ✅ 环境说明

* Neovim 版本：v0.9.5（Ubuntu 默认仓库版本）
* 系统平台：WSL / Ubuntu
* 插件管理器：`packer.nvim`

---

## 🧱 第一步：安装 Neovim

```bash
sudo apt update
sudo apt install neovim -y
```

确认版本：

```bash
nvim --version
```

输出应为：

```
NVIM v0.9.5
```

---

## 📦 第二步：安装 `git` 和 `node`（供 LSP 和插件使用）

```bash
sudo apt install git curl -y

# 安装 nodejs（供 pyright 使用）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

---

## 📁 第三步：安装插件管理器 `packer.nvim`

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim \
~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

---

## ⚙️ 第四步：创建 Neovim 配置文件

```bash
mkdir -p ~/.config/nvim
nvim ~/.config/nvim/init.lua
```

---

## 🧠 第五步：粘贴完整配置（适配 v0.9.5）

```lua
-- 基础设置
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true
vim.opt.termguicolors = true

-- 插件加载
require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'
  use 'nvim-lualine/lualine.nvim'
  use 'nvim-tree/nvim-tree.lua'
  use 'nvim-tree/nvim-web-devicons'
  use 'folke/tokyonight.nvim'
  use 'nvim-lua/plenary.nvim'
  use 'nvim-telescope/telescope.nvim'
  use { 'nvim-treesitter/nvim-treesitter', run = ':TSUpdate' }
  use 'neovim/nvim-lspconfig'
  use 'hrsh7th/nvim-cmp'
  use 'hrsh7th/cmp-nvim-lsp'
  use 'L3MON4D3/LuaSnip'
  use 'saadparwaiz1/cmp_luasnip'
end)

-- 启用主题
vim.cmd[[colorscheme tokyonight]]

-- UI 插件初始化
require('lualine').setup()
require('nvim-tree').setup()

-- Treesitter 配置
require('nvim-treesitter.configs').setup {
  highlight = { enable = true }
}

-- LSP 配置
local lspconfig = require('lspconfig')
lspconfig.pyright.setup {}
lspconfig.lua_ls.setup {}

-- 自动补全
local cmp = require'cmp'
cmp.setup({
  snippet = {
    expand = function(args)
      require('luasnip').lsp_expand(args.body)
    end
  },
  mapping = cmp.mapping.preset.insert({
    ['<Tab>'] = cmp.mapping.select_next_item(),
    ['<S-Tab>'] = cmp.mapping.select_prev_item(),
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
  }),
  sources = {
    { name = 'nvim_lsp' },
    { name = 'luasnip' }
  }
})
```

---

## 🧪 第六步：同步插件

重启 Neovim，然后执行：

```vim
:PackerSync
```


---

## 🔌 第七步：安装 LSP 依赖

```bash
npm install -g pyright
sudo apt install lua-language-server
```

---

## 🔥 常用命令

| 功能     | 命令                      |
| ------ | ----------------------- |
| 打开文件树  | `:NvimTreeToggle`       |
| 查找文件   | `:Telescope find_files` |
| 安装语法高亮 | `:TSInstall lua python` |
| 检查健康   | `:checkhealth`          |



