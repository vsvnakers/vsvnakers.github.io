import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import PostList from './components/PostList.vue'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
  setup() {
    onMounted(() => {
      // Force dark mode
      document.documentElement.classList.add('dark')
      // Persist preference
      localStorage.setItem('vitepress-theme-appearance', 'dark')
    })
  }
} satisfies Theme
