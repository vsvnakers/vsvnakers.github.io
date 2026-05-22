---
layout: home
hero:
  name: VSVnakers
  text: 计算机学习者
  tagline: 记录技术学习、项目实践与思考
  image:
    src: https://github.com/vsvnakers.png
    alt: VSVnakers
  actions:
    - theme: brand
      text: 博客
      link: /posts/
    - theme: alt
      text: 关于
      link: /resume/
features:
  - icon: ✍️
    title: 博客
    details: 技术笔记与学习心得
    link: /posts/
  - icon: 📖
    title: 学习资源
    details: 整理的学习路线与资料
    link: /study/
  - icon: 🔧
    title: 工具
    details: 好用的开发工具推荐
    link: /tools/
---

<ClientOnly>
  <div class="vercount-container">
    <div class="vercount-item">
      <div class="vercount-label">访问量</div>
      <div class="vercount-value" id="vercount-views">—</div>
    </div>
    <div class="vercount-item">
      <div class="vercount-label">访客数</div>
      <div class="vercount-value" id="vercount-visitors">—</div>
    </div>
  </div>
</ClientOnly>

<script setup>
import { onMounted } from 'vue'

const VERCOUNT_API = 'https://vercount.vercel.app/api/v1'
const SITE_ID = 'vsvnakers-home'

onMounted(() => {
  fetch(`${VERCOUNT_API}/pageview?siteId=${SITE_ID}`)
    .then(res => res.json())
    .then(data => {
      if (data.views) animateNumber('vercount-views', data.views)
      if (data.visitors) animateNumber('vercount-visitors', data.visitors)
    })
    .catch(() => {
      animateNumber('vercount-views', 1314)
      animateNumber('vercount-visitors', 520)
    })
})

function animateNumber(elementId, target) {
  const el = document.getElementById(elementId)
  if (!el) return
  const duration = 1500
  const start = performance.now()

  function update(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 4)
    el.textContent = Math.floor(target * eased).toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
    else el.textContent = target.toLocaleString()
  }

  requestAnimationFrame(update)
}
</script>
