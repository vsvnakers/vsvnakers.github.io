import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import { useData } from 'vitepress'

export default {
  ...DefaultTheme,
  setup() {
    const { isDark } = useData()

    // 暗黑模式切换动画 - 只在客户端执行
    onMounted(() => {
      document.documentElement.classList.add('dark-mode-transition')

      const updateDarkMode = () => {
        const html = document.documentElement
        if (isDark.value) {
          html.classList.add('dark')
          html.classList.remove('light')
        } else {
          html.classList.add('light')
          html.classList.remove('dark')
        }
      }

      updateDarkMode()
    })
  }
}
