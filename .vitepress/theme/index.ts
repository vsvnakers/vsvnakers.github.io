import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { useData } from 'vitepress'
import PostList from './components/PostList.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
  setup() {
    const { isDark } = useData()

    onMounted(() => {
      document.documentElement.classList.add('dark-mode-transition')
    })
  }
} satisfies Theme
