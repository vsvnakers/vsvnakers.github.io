<script setup lang="ts">
import { recommendedResources } from '../../../tools/resources'
</script>

<template>
  <div class="resource-grid">
    <a
      v-for="resource in recommendedResources"
      :key="resource.url"
      class="resource-card"
      :href="resource.url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="resource-card__meta">
        <span>{{ resource.category }}</span>
        <small>{{ resource.domain }}</small>
      </div>
      <div class="resource-card__body">
        <h3>{{ resource.title }}</h3>
        <p>{{ resource.description }}</p>
      </div>
      <div class="resource-card__note">{{ resource.note }}</div>
      <strong aria-hidden="true">浏览 ↗</strong>
    </a>
  </div>
</template>
