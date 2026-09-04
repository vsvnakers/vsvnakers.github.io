import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { tokenizeSearchText } from '../scripts/search-tokenizer.mjs'

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
      { text: '玩耍', link: '/play/' },
      { text: '留言', link: '/guestbook/' },
      { text: '关于', link: '/resume/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vsvnakers' }
    ],
    search: {
      provider: 'local',
      options: {
        disableDetailedView: true,
        miniSearch: {
          options: {
            tokenize: tokenizeSearchText
          },
          searchOptions: {
            combineWith: 'AND',
            boost: { title: 8, titles: 4, text: 1 },
            prefix: (_term, index, terms) => index === terms.length - 1,
            fuzzy: (term) => /^[a-z\d]/i.test(term) && term.length >= 5 ? 0.15 : false,
            maxFuzzy: 1,
            weights: { fuzzy: 0.25, prefix: 0.7 }
          }
        },
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            resetButtonTitle: '清空搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关内容',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'ESC'
            }
          }
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
    theme: { light: 'github-light', dark: 'github-dark' },
    math: true
  },
  mermaid: {
    suppressErrorRendering: true
  },
  ignoreDeadLinks: true,
  srcExclude: ['plan.md', 'README.md', 'auto_push.py', 'skills/**', '.paper-daily-source/**']
}))
