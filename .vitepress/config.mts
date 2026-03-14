import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VSVnakers 主页',
  description: 'VSVnakers 的个人主页',
  lang: 'zh-CN',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: 'https://github.com/vsvnakers.png' }]
  ],

  themeConfig: {
    logo: {
      src: 'https://github.com/vsvnakers.png',
      alt: 'VSVnakers'
    },

    nav: [
      { text: '📝 博客', link: '/posts/' },
      { text: '👤 关于', link: '/resume/' },
      { text: '📚 学习', link: '/study/' },
      { text: '🛠 工具', link: '/tools/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vsvnakers' },
      { icon: 'email', link: 'mailto:vsvnakers@outlook.com' },
    ],

    footer: {
      message: 'Made with ❤️',
      copyright: 'Copyright © 2025-present VSVnakers'
    },

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: '搜索',
          placeholder: '输入关键词...',
          noResults: '未找到结果'
        }
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  ignoreDeadLinks: true
})
