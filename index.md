---
layout: home
hero:
  name: VSVnakers
  text: 计算机某行业
  image:
    src: https://github.com/vsvnakers.png
    alt: VSVnakers
  tagline: 欢迎来到我的主页
  actions:
    - theme: brand
      text: 📝 博客
      link: /posts/
    - theme: alt
      text: 👤 关于
      link: /resume/
features:
  - icon: 📝
    title: 博客
    details: 记录技术学习与生活
    link: /posts/
  - icon: 📚
    title: 学习
    details: 整理的学习资源与笔记
    link: /study/
  - icon: 🛠
    title: 工具
    details: 好用的工具推荐
    link: /tools/
---

<!-- Vercount 统计 -->
<ClientOnly>
  <div class="vercount-container">
    <div class="vercount-item">
      <div class="vercount-label">访问量</div>
      <div class="vercount-value" id="vercount-views">0</div>
    </div>
    <div class="vercount-item">
      <div class="vercount-label">访客数</div>
      <div class="vercount-value" id="vercount-visitors">0</div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted } from 'vue'

// Vercount 统计配置
const VERCOUNT_API = 'https://vercount.vercel.app/api/v1'
const SITE_ID = 'vsvnakers-home' // 请替换为你的站点 ID

onMounted(() => {
  // 记录访问量
  fetch(`${VERCOUNT_API}/pageview?siteId=${SITE_ID}`)
    .then(res => res.json())
    .then(data => {
      if (data.views) {
        animateNumber('vercount-views', data.views)
      }
      if (data.visitors) {
        animateNumber('vercount-visitors', data.visitors)
      }
    })
    .catch(err => {
      console.log('Vercount:', err)
      // 如果 API 不可用，显示默认数字
      animateNumber('vercount-views', 1314)
      animateNumber('vercount-visitors', 520)
    })
})

// 数字增长动画
function animateNumber(elementId, target) {
  const element = document.getElementById(elementId)
  if (!element) return

  const duration = 2000
  const start = 0
  const startTime = performance.now()

  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuart(progress)
    const current = Math.floor(start + (target - start) * easedProgress)

    element.textContent = current.toLocaleString()

    if (elapsed < duration) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  requestAnimationFrame(update)
}
</script>
