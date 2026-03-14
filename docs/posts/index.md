---
title: 博客
layout: page
---

# 📝 博客文章

<script setup>
import { ref, computed } from 'vue'
import { data } from './posts.data.ts'
</script>

<div v-for="post in data" :key="post.path" class="post-item">
  <a :href="post.path" class="post-link">
    <h3>{{ post.frontmatter.title || post.path.replace('.md', '') }}</h3>
  </a>
</div>

<style>
.post-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-link {
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.post-link:hover h3 {
  color: var(--vp-c-brand);
}
</style>
