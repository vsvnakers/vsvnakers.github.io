import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VSVnakers',
  description: 'VSVnakers 的个人博客',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: 'https://github.com/vsvnakers.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;600;700&display=swap',
      rel: 'stylesheet'
    }]
  ],

  themeConfig: {
    logo: {
      src: 'https://github.com/vsvnakers.png',
      alt: 'VSVnakers'
    },

    nav: [
      { text: 'Blog', link: '/posts/' },
      { text: 'Study', link: '/study/' },
      { text: 'Tools', link: '/tools/' },
      { text: 'About', link: '/resume/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vsvnakers' },
    ],

    footer: {
      copyright: '© 2025 VSVnakers'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: 'Search',
          placeholder: 'Search posts...',
          noResults: 'No results found'
        }
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-dark',
      dark: 'github-dark'
    }
  },

  ignoreDeadLinks: true,
  srcExclude: ['plan.md', 'README.md', 'auto_push.py', 'skills/**']
})
