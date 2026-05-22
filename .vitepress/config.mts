import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VSVnakers',
  description: 'VSVnakers 的个人博客',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: 'https://github.com/vsvnakers.png' }],
    ['link', { rel: 'stylesheet', href: '/custom.css' }]
  ],

  themeConfig: {
    logo: {
      src: 'https://github.com/vsvnakers.png',
      alt: 'VSVnakers'
    },

    nav: [
      { text: '博客', link: '/posts/' },
      { text: '学习', link: '/study/' },
      { text: '工具', link: '/tools/' },
      { text: '关于', link: '/resume/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vsvnakers' },
    ],

    footer: {
      copyright: '© 2025 VSVnakers'
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
          placeholder: '搜索文章...',
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

  ignoreDeadLinks: true,

  srcExclude: ['plan.md', 'README.md', 'auto_push.py', 'skills/**']
})
