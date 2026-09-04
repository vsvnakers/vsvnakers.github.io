<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { randomStarPosition } from '../game-logic.mjs'

const ROUND_SECONDS = 30
const score = ref(0)
const best = ref(0)
const time = ref(ROUND_SECONDS)
const playing = ref(false)
const position = ref({ x: 50, y: 48 })
let timer: ReturnType<typeof setInterval> | undefined

function moveStar() {
  position.value = randomStarPosition()
}

function finishGame() {
  playing.value = false
  if (timer) clearInterval(timer)
  timer = undefined
  best.value = Math.max(best.value, score.value)
  localStorage.setItem('violet-star-best', String(best.value))
}

function startGame() {
  if (timer) clearInterval(timer)
  score.value = 0
  time.value = ROUND_SECONDS
  playing.value = true
  moveStar()
  timer = setInterval(() => {
    time.value -= 1
    if (time.value <= 0) finishGame()
  }, 1000)
}

function catchStar() {
  if (!playing.value) return
  score.value += 1
  moveStar()
}

onMounted(() => {
  best.value = Number(localStorage.getItem('violet-star-best')) || 0
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="relax-game">
    <header class="relax-game__head">
      <div>
        <span>QUICK PLAY · 30 SEC</span>
        <h2>星尘捕捉</h2>
        <p>点亮不断出现的星星，三十秒后看看收集了多少星尘。</p>
      </div>
      <div class="game-stats">
        <strong>{{ score }}<small>本局</small></strong>
        <strong>{{ best }}<small>最佳</small></strong>
        <strong>{{ time }}<small>秒</small></strong>
      </div>
    </header>

    <div class="star-field">
      <span
        v-for="n in 18"
        :key="n"
        class="star-dust"
        :style="{ left: `${(n * 37) % 94}%`, top: `${(n * 53) % 88}%`, '--i': n }"
      >·</span>
      <button
        v-if="playing"
        class="catch-star"
        :style="{ left: `${position.x}%`, top: `${position.y}%` }"
        aria-label="捕捉星星"
        @click="catchStar"
      >✦</button>
      <div v-else class="game-overlay">
        <span aria-hidden="true">✦</span>
        <p>{{ time === 0 ? `收集了 ${score} 颗星尘` : '放空一下，只需要追逐星光。' }}</p>
        <button @click="startGame">{{ time === 0 ? '再玩一次' : '开始游戏' }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.relax-game {
  max-width: 780px;
  margin: 34px auto 24px;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--dream-border);
  border-radius: 24px;
  background: linear-gradient(145deg, var(--dream-glass-line), transparent 38%), var(--dream-surface);
  box-shadow: var(--dream-shadow), inset 0 1px var(--dream-glass-line);
  backdrop-filter: blur(28px) saturate(155%);
}

.relax-game__head {
  display: flex;
  min-height: 112px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
}

.relax-game__head > div:first-child > span {
  color: var(--dream-purple);
  font: 700 10px/1.4 var(--vp-font-family-mono);
  letter-spacing: .16em;
}

.relax-game__head h2 {
  margin: 7px 0 4px;
  padding: 0;
  border: 0;
  color: var(--dream-text);
  font-size: 26px;
}

.relax-game__head p {
  margin: 0;
  color: var(--dream-muted);
  font-size: 13px;
  line-height: 1.6;
}

.game-stats {
  display: flex;
  flex: none;
  gap: 18px;
}

.game-stats strong {
  display: grid;
  color: var(--dream-text);
  font-size: 19px;
  text-align: center;
}

.game-stats small {
  color: var(--dream-muted);
  font-size: 9px;
  font-weight: 500;
}

.star-field {
  position: relative;
  height: 380px;
  overflow: hidden;
  border: 1px solid var(--dream-border);
  border-radius: 19px;
  background:
    radial-gradient(circle at 50% 110%, rgba(145, 91, 255, .42), transparent 48%),
    radial-gradient(circle at 50% 45%, rgba(104, 65, 185, .14), transparent 58%),
    rgba(12, 7, 29, .38);
  isolation: isolate;
}

:global(:root:not(.dark)) .star-field {
  background:
    radial-gradient(circle at 50% 110%, rgba(255, 200, 220, .62), transparent 48%),
    radial-gradient(circle at 50% 40%, rgba(169, 126, 238, .18), transparent 58%),
    rgba(255, 251, 255, .54);
}

.star-field::before,
.star-field::after {
  position: absolute;
  inset: 20% -12%;
  content: '';
  border: 1px solid var(--dream-border);
  border-radius: 50%;
  transform: rotate(-12deg);
}

.star-field::after {
  inset: 30% -20%;
  opacity: .5;
  transform: rotate(16deg);
}

.star-dust {
  position: absolute;
  color: var(--dream-purple-bright);
  opacity: .55;
  animation: dust-pulse calc(2.1s + var(--i) * .08s) ease-in-out infinite;
}

.catch-star {
  position: absolute;
  z-index: 3;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .38);
  border-radius: 50%;
  color: #fff5cf;
  background: radial-gradient(circle, #bd8dff, #7440dc 62%, transparent 64%);
  box-shadow: 0 0 34px rgba(174, 119, 255, .8);
  font-size: 29px;
  cursor: pointer;
  transform: translate(-50%, -50%);
  animation: star-arrive 180ms ease-out;
}

.game-overlay {
  position: absolute;
  z-index: 4;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
}

.game-overlay > span {
  color: var(--dream-purple-bright);
  font-size: 42px;
  filter: drop-shadow(0 0 18px var(--dream-purple));
}

.game-overlay p { margin: 0; color: var(--dream-muted); }

.game-overlay button {
  padding: 11px 19px;
  border: 1px solid var(--dream-border);
  border-radius: 11px;
  color: #fff;
  background: linear-gradient(135deg, #9565ef, #6d28d9);
  font: 700 12px/1 var(--vp-font-family-base);
  cursor: pointer;
}

.catch-star:focus-visible,
.game-overlay button:focus-visible {
  outline: 3px solid var(--dream-purple-bright);
  outline-offset: 3px;
}

@keyframes star-arrive {
  from { opacity: 0; transform: translate(-50%, -50%) scale(.45) rotate(-25deg); }
}

@keyframes dust-pulse {
  50% { opacity: 1; transform: scale(1.7); }
}

@media (max-width: 600px) {
  .relax-game { padding: 18px; }
  .relax-game__head { min-height: 168px; flex-direction: column; }
  .game-stats { align-self: stretch; justify-content: space-around; }
  .star-field { height: 360px; }
}
</style>
