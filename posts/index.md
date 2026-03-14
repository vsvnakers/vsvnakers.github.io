---
title: 博客
layout: page
---

# 📝 博客文章

<script setup>
import { data } from './posts.data.ts'
</script>

<div v-for="post in data" :key="post.url" class="post-item">
  <a :href="post.url" class="post-link">
    <h3>{{ post.frontmatter.title || '无标题' }}</h3>
    <p v-if="post.frontmatter.date" class="post-date">{{ post.frontmatter.date }}</p>
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
  display: block;
}

.post-link:hover h3 {
  color: var(--vp-c-brand);
}

.post-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0.25rem 0 0;
}
</style>
