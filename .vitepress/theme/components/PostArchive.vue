<script setup lang="ts">
import { data as posts } from '../../../posts/posts.data'

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <div class="post-archive">
    <a v-for="post in posts" :key="post.url" class="post-card" :href="post.url">
      <div class="post-card__meta">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span>{{ post.readingTime }} 分钟阅读</span>
      </div>
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <div class="post-card__footer">
        <span class="post-card__tags">
          <i v-for="tag in post.tags" :key="tag">{{ tag }}</i>
        </span>
        <span class="post-card__more">阅读全文 →</span>
      </div>
    </a>
  </div>
</template>
