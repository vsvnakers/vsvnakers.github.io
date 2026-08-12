<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface GithubIssue {
  id: number
  title: string
  body: string | null
  html_url: string
  created_at: string
  comments: number
  user: { login: string; avatar_url: string; html_url: string }
  pull_request?: unknown
}

const REPO = 'vsvnakers/vsvnakers.github.io'
const PREFIX = '[留言]'
const name = ref('')
const message = ref('')
const issues = ref<GithubIssue[]>([])
const loading = ref(true)
const failed = ref(false)

const canSubmit = computed(() => message.value.trim().length >= 2)

function submitQuestion() {
  if (!canSubmit.value) return

  const text = message.value.trim()
  const author = name.value.trim() || '一位路过的朋友'
  const title = `${PREFIX} ${text.slice(0, 48)}${text.length > 48 ? '…' : ''}`
  const body = `> 来自：${author}\n\n${text}\n\n---\n*通过网站留言板发送*`
  const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric', month: 'short', day: 'numeric'
  }).format(new Date(value))
}

onMounted(async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=30`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!response.ok) throw new Error('Request failed')
    const data = await response.json() as GithubIssue[]
    issues.value = data.filter(issue => !issue.pull_request && issue.title.startsWith(PREFIX))
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="message-board">
    <form class="message-form" @submit.prevent="submitQuestion">
      <div class="message-form__head">
        <span class="message-form__signal"><i></i> TRANSMIT A SIGNAL</span>
        <span aria-hidden="true">✦</span>
      </div>

      <label for="guest-name">怎么称呼你？ <small>选填</small></label>
      <input
        id="guest-name"
        v-model="name"
        maxlength="40"
        autocomplete="nickname"
        placeholder="一位路过的旅行者"
      >

      <label for="guest-message">你的留言或问题</label>
      <textarea
        id="guest-message"
        v-model="message"
        required
        minlength="2"
        maxlength="2000"
        rows="6"
        placeholder="写下想问的问题，或留一句想说的话……"
      ></textarea>

      <div class="message-form__footer">
        <p>提交后会前往 GitHub 确认发布，内容将作为公开 Issue 保存。</p>
        <button type="submit" :disabled="!canSubmit">前往发布 <span>↗</span></button>
      </div>
    </form>

    <div class="message-list">
      <div class="message-list__title">
        <div>
          <span class="dream-overline">INCOMING MESSAGES</span>
          <h2>来自远方的信号</h2>
        </div>
        <span class="message-list__count">{{ issues.length }}</span>
      </div>

      <div v-if="loading" class="message-state">
        <span class="message-loader"></span> 正在接收信号……
      </div>

      <div v-else-if="failed" class="message-state">
        暂时无法读取留言。你仍然可以正常发布问题。
      </div>

      <div v-else-if="!issues.length" class="message-empty">
        <span>☾</span>
        <h3>这里还很安静</h3>
        <p>成为第一个留下信号的人吧。</p>
      </div>

      <a
        v-for="issue in issues"
        :key="issue.id"
        class="message-item"
        :href="issue.html_url"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="issue.user.avatar_url" :alt="`${issue.user.login} 的头像`">
        <div>
          <div class="message-item__meta">
            <strong>{{ issue.user.login }}</strong>
            <span>{{ formatDate(issue.created_at) }}</span>
          </div>
          <h3>{{ issue.title.replace(PREFIX, '').trim() }}</h3>
          <p>{{ issue.body?.replace(/^> 来自：.*\n\n/, '').split('\n\n---')[0] }}</p>
          <span class="message-item__comments">{{ issue.comments }} 条回复 · 在 GitHub 查看 ↗</span>
        </div>
      </a>
    </div>
  </section>
</template>
