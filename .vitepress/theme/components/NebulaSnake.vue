<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { advanceSnake, isOpposite, spawnFood } from '../snake-logic.mjs'

type Direction = 'up' | 'down' | 'left' | 'right'
type Status = 'idle' | 'playing' | 'paused' | 'over'
type Point = { x: number; y: number }

const GRID_SIZE = 18
const initialSnake = (): Point[] => [
  { x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }
]

const snake = ref<Point[]>(initialSnake())
const food = ref<Point>({ x: 13, y: 9 })
const direction = ref<Direction>('right')
const queuedDirection = ref<Direction>('right')
const status = ref<Status>('idle')
const score = ref(0)
const best = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

const speedLevel = computed(() => 1 + Math.floor(score.value / 5))
const tickDelay = computed(() => Math.max(72, 155 - score.value * 4))

function scheduleTick() {
  if (timer) clearTimeout(timer)
  if (status.value === 'playing') timer = setTimeout(tick, tickDelay.value)
}

function finishGame() {
  status.value = 'over'
  if (timer) clearTimeout(timer)
  timer = undefined
  best.value = Math.max(best.value, score.value)
  localStorage.setItem('violet-snake-best', String(best.value))
}

function tick() {
  direction.value = queuedDirection.value
  const result = advanceSnake(snake.value, direction.value, food.value, GRID_SIZE)
  if (result.collision) {
    finishGame()
    return
  }

  snake.value = result.snake
  if (result.ate) {
    score.value += 1
    const nextFood = spawnFood(snake.value, GRID_SIZE)
    if (!nextFood) {
      finishGame()
      return
    }
    food.value = nextFood
  }
  scheduleTick()
}

function startGame() {
  if (timer) clearTimeout(timer)
  snake.value = initialSnake()
  food.value = spawnFood(snake.value, GRID_SIZE) ?? { x: 13, y: 9 }
  direction.value = 'right'
  queuedDirection.value = 'right'
  score.value = 0
  status.value = 'playing'
  scheduleTick()
}

function setDirection(next: Direction) {
  if (status.value === 'idle' || status.value === 'over') startGame()
  if (status.value !== 'playing' || isOpposite(direction.value, next)) return
  queuedDirection.value = next
}

function togglePause() {
  if (status.value === 'idle' || status.value === 'over') {
    startGame()
    return
  }
  status.value = status.value === 'paused' ? 'playing' : 'paused'
  scheduleTick()
}

function handleKey(event: KeyboardEvent) {
  const keyMap: Record<string, Direction> = {
    ArrowUp: 'up', w: 'up', W: 'up',
    ArrowDown: 'down', s: 'down', S: 'down',
    ArrowLeft: 'left', a: 'left', A: 'left',
    ArrowRight: 'right', d: 'right', D: 'right'
  }
  if (keyMap[event.key]) {
    event.preventDefault()
    setDirection(keyMap[event.key])
  } else if (event.code === 'Space') {
    event.preventDefault()
    togglePause()
  }
}

onMounted(() => {
  best.value = Number(localStorage.getItem('violet-snake-best')) || 0
  window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <section class="snake-game">
    <header class="snake-game__head">
      <div>
        <span>ENDLESS · KEYBOARD & TOUCH</span>
        <h2>星轨贪吃蛇</h2>
        <p>用方向键或 WASD 追逐星光。穿过边界会从另一侧出现，别撞上自己的轨迹。</p>
      </div>
      <div class="snake-stats">
        <strong>{{ score }}<small>星光</small></strong>
        <strong>{{ best }}<small>最佳</small></strong>
        <strong>{{ speedLevel }}<small>速度</small></strong>
      </div>
    </header>

    <div class="snake-board" :style="{ '--grid-size': GRID_SIZE }">
      <i
        v-for="(part, index) in snake"
        :key="`${part.x}-${part.y}-${index}`"
        class="snake-part"
        :class="{ 'is-head': index === 0 }"
        :style="{ gridColumn: part.x + 1, gridRow: part.y + 1, opacity: Math.max(.42, 1 - index * .035) }"
      ></i>
      <b class="snake-food" :style="{ gridColumn: food.x + 1, gridRow: food.y + 1 }">✦</b>

      <div v-if="status !== 'playing'" class="snake-overlay">
        <span aria-hidden="true">{{ status === 'over' ? '☄' : '☾' }}</span>
        <strong v-if="status === 'over'">星轨相撞，本局 {{ score }} 分</strong>
        <strong v-else-if="status === 'paused'">已暂停</strong>
        <strong v-else>准备进入星轨</strong>
        <button @click="status === 'paused' ? togglePause() : startGame()">
          {{ status === 'paused' ? '继续' : status === 'over' ? '再玩一次' : '开始游戏' }}
        </button>
      </div>
    </div>

    <div class="snake-controls" aria-label="游戏方向控制">
      <button class="up" aria-label="向上" @click="setDirection('up')">↑</button>
      <button class="left" aria-label="向左" @click="setDirection('left')">←</button>
      <button class="pause" :aria-label="status === 'paused' ? '继续' : '暂停'" @click="togglePause">
        {{ status === 'paused' ? '▶' : 'Ⅱ' }}
      </button>
      <button class="right" aria-label="向右" @click="setDirection('right')">→</button>
      <button class="down" aria-label="向下" @click="setDirection('down')">↓</button>
    </div>
  </section>
</template>

<style scoped>
.snake-game {
  max-width: 780px;
  margin: 24px auto;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--dream-border);
  border-radius: 24px;
  background: linear-gradient(145deg, var(--dream-glass-line), transparent 38%), var(--dream-surface);
  box-shadow: var(--dream-shadow), inset 0 1px var(--dream-glass-line);
  backdrop-filter: blur(28px) saturate(155%);
}

.snake-game__head {
  display: flex;
  min-height: 126px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
}

.snake-game__head > div:first-child > span {
  color: var(--dream-purple);
  font: 700 10px/1.4 var(--vp-font-family-mono);
  letter-spacing: .14em;
}

.snake-game__head h2 {
  margin: 7px 0 4px;
  padding: 0;
  border: 0;
  color: var(--dream-text);
  font-size: 26px;
}

.snake-game__head p {
  max-width: 500px;
  margin: 0;
  color: var(--dream-muted);
  font-size: 13px;
  line-height: 1.6;
}

.snake-stats {
  display: flex;
  flex: none;
  gap: 18px;
}

.snake-stats strong {
  display: grid;
  color: var(--dream-text);
  font-size: 19px;
  text-align: center;
}

.snake-stats small {
  color: var(--dream-muted);
  font-size: 9px;
  font-weight: 500;
}

.snake-board {
  position: relative;
  display: grid;
  width: min(100%, 620px);
  aspect-ratio: 1;
  margin: 0 auto;
  overflow: hidden;
  grid-template-columns: repeat(var(--grid-size), 1fr);
  grid-template-rows: repeat(var(--grid-size), 1fr);
  border: 1px solid var(--dream-border);
  border-radius: 19px;
  background:
    linear-gradient(rgba(156, 113, 238, .055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(156, 113, 238, .055) 1px, transparent 1px),
    radial-gradient(circle at 50% 120%, rgba(126, 76, 232, .42), transparent 54%),
    rgba(9, 5, 23, .62);
  background-size: calc(100% / var(--grid-size)) calc(100% / var(--grid-size)), calc(100% / var(--grid-size)) calc(100% / var(--grid-size)), auto, auto;
}

:global(:root:not(.dark)) .snake-board {
  background:
    linear-gradient(rgba(112, 72, 168, .07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(112, 72, 168, .07) 1px, transparent 1px),
    radial-gradient(circle at 50% 120%, rgba(220, 164, 238, .45), transparent 54%),
    rgba(255, 251, 255, .7);
  background-size: calc(100% / var(--grid-size)) calc(100% / var(--grid-size)), calc(100% / var(--grid-size)) calc(100% / var(--grid-size)), auto, auto;
}

.snake-part {
  z-index: 2;
  margin: 10%;
  border-radius: 34%;
  background: linear-gradient(135deg, #d4b8ff, #7950dc);
  box-shadow: 0 0 12px rgba(168, 113, 255, .52);
}

.snake-part.is-head {
  margin: 4%;
  border-radius: 42%;
  background: linear-gradient(135deg, #fff1b8, #b98cff 55%, #7546d1);
  box-shadow: 0 0 20px rgba(255, 219, 139, .46), 0 0 28px rgba(168, 113, 255, .65);
}

.snake-food {
  z-index: 2;
  display: grid;
  place-items: center;
  color: #ffeab0;
  font-size: clamp(12px, 2vw, 22px);
  filter: drop-shadow(0 0 8px #b77aff);
  animation: food-pulse 1.1s ease-in-out infinite;
}

.snake-overlay {
  position: absolute;
  z-index: 4;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  color: var(--dream-text);
  background: rgba(13, 7, 30, .34);
  backdrop-filter: blur(5px);
}

:global(:root:not(.dark)) .snake-overlay { background: rgba(255, 250, 255, .3); }
.snake-overlay > span { color: var(--dream-purple-bright); font-size: 38px; filter: drop-shadow(0 0 16px var(--dream-purple)); }
.snake-overlay strong { font-size: 15px; }

.snake-overlay button,
.snake-controls button {
  border: 1px solid var(--dream-border);
  color: var(--dream-text);
  background: var(--dream-surface-strong);
  box-shadow: inset 0 1px var(--dream-glass-line);
  font-family: var(--vp-font-family-base);
  font-weight: 700;
  cursor: pointer;
}

.snake-overlay button {
  margin-top: 4px;
  padding: 10px 18px;
  border-color: transparent;
  border-radius: 11px;
  color: #fff;
  background: linear-gradient(135deg, #9565ef, #6d28d9);
}

.snake-controls {
  display: grid;
  width: 190px;
  margin: 18px auto 0;
  grid-template-columns: repeat(3, 54px);
  grid-template-rows: repeat(3, 46px);
  justify-content: center;
  gap: 6px;
}

.snake-controls button {
  border-radius: 12px;
  font-size: 18px;
  touch-action: manipulation;
}

.snake-controls button:active { transform: translateY(1px); background: var(--dream-glow); }
.snake-controls .up { grid-column: 2; }
.snake-controls .left { grid-row: 2; grid-column: 1; }
.snake-controls .pause { grid-row: 2; grid-column: 2; color: var(--dream-purple); font-size: 13px; }
.snake-controls .right { grid-row: 2; grid-column: 3; }
.snake-controls .down { grid-row: 3; grid-column: 2; }

.snake-overlay button:focus-visible,
.snake-controls button:focus-visible {
  outline: 3px solid var(--dream-purple-bright);
  outline-offset: 3px;
}

@keyframes food-pulse {
  50% { transform: scale(1.28) rotate(14deg); filter: drop-shadow(0 0 14px #cf9cff); }
}

@media (max-width: 600px) {
  .snake-game { padding: 18px; }
  .snake-game__head { min-height: 184px; flex-direction: column; }
  .snake-stats { align-self: stretch; justify-content: space-around; }
}
</style>
