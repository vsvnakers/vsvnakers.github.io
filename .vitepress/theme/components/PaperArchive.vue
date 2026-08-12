<script setup lang="ts">
import { computed, ref } from 'vue'
import { data as papers } from '../../../papers/papers.data'

const visibleDays = ref(10)

const groups = computed(() => {
  const result = new Map<string, typeof papers>()
  for (const paper of papers) {
    const group = result.get(paper.date) ?? []
    group.push(paper)
    result.set(paper.date, group)
  }
  return [...result.entries()].slice(0, visibleDays.value)
})

const hasMore = computed(() => {
  return new Set(papers.map(paper => paper.date)).size > visibleDays.value
})
</script>

<template>
  <div class="paper-archive">
    <section v-for="[date, dailyPapers] in groups" :key="date" class="paper-day">
      <div class="paper-day__heading">
        <time :datetime="date">{{ date }}</time>
        <span>{{ dailyPapers.length }} PAPERS</span>
      </div>

      <div class="paper-day__grid">
        <article v-for="paper in dailyPapers" :key="paper.url" class="paper-card">
          <div class="paper-card__meta">
            <span>{{ paper.domain }}</span>
            <span>{{ paper.level }}</span>
          </div>
          <h2><a :href="paper.url">{{ paper.title }}</a></h2>
          <p>{{ paper.description }}</p>
          <div class="paper-card__tags">
            <i v-for="tag in paper.tags.slice(0, 3)" :key="tag">{{ tag }}</i>
          </div>
          <div class="paper-card__links">
            <a :href="paper.url">中文解读 →</a>
            <a :href="paper.originalUrl" target="_blank" rel="noreferrer">arXiv ↗</a>
          </div>
        </article>
      </div>
    </section>

    <button v-if="hasMore" class="paper-more" type="button" @click="visibleDays += 10">
      加载更早的论文
    </button>
  </div>
</template>
