<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../../posts/posts.data'

const sortedPosts = computed(() => {
  return posts
    .filter(p => !p.frontmatter.draft)
    .sort((a, b) => {
      const da = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
      const db = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
      return db - da
    })
})

const groupedPosts = computed(() => {
  const groups: Record<string, typeof sortedPosts.value> = {}
  for (const post of sortedPosts.value) {
    const date = post.frontmatter.date
    const year = date ? new Date(date).getFullYear().toString() : 'Other'
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return groups
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${m}/${day}`
}
</script>

<template>
  <div v-if="sortedPosts.length === 0" class="empty-state">
    <p>No posts yet.</p>
    <div class="hint">
      <p>Create a Markdown file in <code>posts/</code> to publish:</p>
      <p><code>posts/2025-05-22-my-post.md</code></p>
      <p style="margin-top: 0.75rem;">Add frontmatter:</p>
      <p><code>---</code></p>
      <p><code>title: Post Title</code></p>
      <p><code>date: 2025-05-22</code></p>
      <p><code>tags: [tag1, tag2]</code></p>
      <p><code>---</code></p>
    </div>
  </div>

  <div v-else>
    <div v-for="(yearPosts, year) in groupedPosts" :key="year">
      <h2 class="post-year">{{ year }}</h2>
      <ul class="post-list">
        <li v-for="post in yearPosts" :key="post.url" class="post-item">
          <a :href="post.url" class="post-link">
            <h3>{{ post.frontmatter.title }}</h3>
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.frontmatter.date) }}</span>
              <div v-if="post.frontmatter.tags?.length" class="post-tags">
                <span v-for="tag in post.frontmatter.tags" :key="tag" class="post-tag">{{ tag }}</span>
              </div>
            </div>
            <p v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
