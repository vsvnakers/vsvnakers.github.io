import DefaultTheme from 'vitepress/theme'
import { onMounted, watch } from 'vue'
import { useData } from 'vitepress'
import PostList from './components/PostList.vue'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
  setup() {
    const { isDark } = useData()
    onMounted(() => {
      // Force dark mode always
      document.documentElement.classList.add('dark')
      localStorage.setItem('vitepress-theme-appearance', 'dark')
    })
  }
} satisfies Theme
