---
layout: home
hero:
  name: VSVnakers
  text: Systems Programmer
  tagline: Rust · OS · Linux Kernel
  image:
    src: https://github.com/vsvnakers.png
    alt: VSVnakers
  actions:
    - theme: brand
      text: Blog
      link: /posts/
    - theme: alt
      text: About
      link: /resume/
features:
  - icon: ⚡
    title: Blog
    details: Technical notes and project insights
    link: /posts/
  - icon: 📖
    title: Study
    details: Curated learning paths and resources
    link: /study/
  - icon: 🔧
    title: Tools
    details: Development tools worth sharing
    link: /tools/
---

<ClientOnly>
  <div class="vercount-container">
    <div class="vercount-item">
      <div class="vercount-label">Views</div>
      <div class="vercount-value" id="vercount-views">—</div>
    </div>
    <div class="vercount-item">
      <div class="vercount-label">Visitors</div>
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

function animateNumber(id, target) {
  const el = document.getElementById(id)
  if (!el) return
  const duration = 1500
  const start = performance.now()
  function update(now) {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 4)
    el.textContent = Math.floor(target * eased).toLocaleString()
    if (p < 1) requestAnimationFrame(update)
    else el.textContent = target.toLocaleString()
  }
  requestAnimationFrame(update)
}
</script>
