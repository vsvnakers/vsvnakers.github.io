import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'VSVnakers',
  description: '在紫色夜空下记录代码、系统与灵感',
  lang: 'zh-CN',
  appearance: 'dark',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0c0818' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }]
  ],
  themeConfig: {
    siteTitle: 'VSVnakers',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '论文', link: '/papers/' },
      { text: '学习', link: '/study/' },
      { text: '工具', link: '/tools/' },
      { text: '留言', link: '/guestbook/' },
      { text: '关于', link: '/resume/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vsvnakers' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: { noResultsText: '没有找到相关内容' }
        }
      }
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    footer: {
      message: 'Built with curiosity and a little stardust.',
      copyright: '© 2026 VSVnakers'
    }
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  },
  ignoreDeadLinks: true,
  srcExclude: ['plan.md', 'README.md', 'auto_push.py', 'skills/**', '.paper-daily-source/**']
}))
