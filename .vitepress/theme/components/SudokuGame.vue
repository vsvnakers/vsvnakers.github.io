<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { createSudokuPuzzle, sudokuLayouts } from '../sudoku-logic.mjs'

type Difficulty = 'easy' | 'normal' | 'hard'
type Point = { row: number; col: number }

const size = ref(6)
const difficulty = ref<Difficulty>('normal')
const puzzle = ref<number[][]>([])
const solution = ref<number[][]>([])
const cells = ref<number[][]>([])
const selected = ref<Point>({ row: 0, col: 0 })
const wrongCells = ref(new Set<string>())
const hintedCells = ref(new Set<string>())
const hintsLeft = ref(3)
const elapsed = ref(0)
const best = ref(0)
const complete = ref(false)
const message = ref('选择空格，再用数字键填写。')
let timer: ReturnType<typeof setInterval> | undefined

const layout = computed(() => sudokuLayouts[size.value])
const numbers = computed(() => Array.from({ length: size.value }, (_, index) => index + 1))
const bestText = computed(() => best.value ? formatTime(best.value) : '—')

function key(row: number, col: number) {
  return `${row}-${col}`
}

function isGiven(row: number, col: number) {
  return Boolean(puzzle.value[row]?.[col])
}

function isRelated(row: number, col: number) {
  const active = selected.value
  const activeValue = cells.value[active.row]?.[active.col]
  return row === active.row || col === active.col || Boolean(activeValue && cells.value[row]?.[col] === activeValue)
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
}

function loadBest() {
  best.value = Number(localStorage.getItem(`violet-sudoku-${size.value}-${difficulty.value}`)) || 0
}

function newGame() {
  if (timer) clearInterval(timer)
  const generated = createSudokuPuzzle(size.value, difficulty.value)
  puzzle.value = generated.puzzle
  solution.value = generated.solution
  cells.value = generated.puzzle.map(row => [...row])
  selected.value = { row: 0, col: 0 }
  wrongCells.value = new Set()
  hintedCells.value = new Set()
  hintsLeft.value = 3
  elapsed.value = 0
  complete.value = false
  message.value = '选择空格，再用数字键填写。'
  loadBest()
  timer = setInterval(() => { elapsed.value += 1 }, 1000)
}

function selectCell(row: number, col: number) {
  selected.value = { row, col }
}

function setCell(value: number) {
  const { row, col } = selected.value
  if (complete.value || isGiven(row, col)) return
  cells.value[row][col] = value
  const nextWrong = new Set(wrongCells.value)
  nextWrong.delete(key(row, col))
  wrongCells.value = nextWrong
  message.value = ''
  checkCompletion()
}

function checkCompletion() {
  const filled = cells.value.every(row => row.every(Boolean))
  const correct = filled && cells.value.every((row, y) => row.every((value, x) => value === solution.value[y][x]))
  if (!correct) return

  complete.value = true
  if (timer) clearInterval(timer)
  timer = undefined
  if (!best.value || elapsed.value < best.value) {
    best.value = elapsed.value
    localStorage.setItem(`violet-sudoku-${size.value}-${difficulty.value}`, String(best.value))
    message.value = '新的最佳记录！'
  } else {
    message.value = '全部正确，星阵已经点亮。'
  }
}

function checkBoard() {
  const wrong = new Set<string>()
  let remaining = 0
  cells.value.forEach((row, y) => row.forEach((value, x) => {
    if (!value) remaining += 1
    else if (value !== solution.value[y][x]) wrong.add(key(y, x))
  }))
  wrongCells.value = wrong
  message.value = wrong.size
    ? `发现 ${wrong.size} 处不协调的数字。`
    : remaining
      ? `目前都正确，还剩 ${remaining} 格。`
      : '全部正确！'
  checkCompletion()
}

function useHint() {
  if (!hintsLeft.value || complete.value) return
  const active = selected.value
  let target = !isGiven(active.row, active.col) && cells.value[active.row][active.col] !== solution.value[active.row][active.col]
    ? active
    : null

  if (!target) {
    for (let row = 0; row < size.value && !target; row += 1) {
      for (let col = 0; col < size.value; col += 1) {
        if (!isGiven(row, col) && cells.value[row][col] !== solution.value[row][col]) {
          target = { row, col }
          break
        }
      }
    }
  }
  if (!target) return

  selected.value = target
  cells.value[target.row][target.col] = solution.value[target.row][target.col]
  hintedCells.value = new Set(hintedCells.value).add(key(target.row, target.col))
  hintsLeft.value -= 1
  message.value = `星光提示已填入，还剩 ${hintsLeft.value} 次。`
  checkCompletion()
}

function handleKey(event: KeyboardEvent) {
  if (/^[1-9]$/.test(event.key)) {
    const value = Number(event.key)
    if (value <= size.value) setCell(value)
    event.preventDefault()
    return
  }
  if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
    setCell(0)
    event.preventDefault()
    return
  }

  const movement: Record<string, Point> = {
    ArrowUp: { row: -1, col: 0 }, ArrowDown: { row: 1, col: 0 },
    ArrowLeft: { row: 0, col: -1 }, ArrowRight: { row: 0, col: 1 }
  }
  const step = movement[event.key]
  if (!step) return
  selected.value = {
    row: (selected.value.row + step.row + size.value) % size.value,
    col: (selected.value.col + step.col + size.value) % size.value
  }
  event.preventDefault()
}

onMounted(newGame)
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <section class="sudoku-game">
    <header class="sudoku-head">
      <div>
        <span>LOGIC · CUSTOM GRID</span>
        <h2>星阵数独</h2>
        <p>调整格子数量与难度，让每一行、每一列和每个宫里的数字都不重复。</p>
      </div>
      <div class="sudoku-stats">
        <strong>{{ formatTime(elapsed) }}<small>本局</small></strong>
        <strong>{{ bestText }}<small>最佳</small></strong>
      </div>
    </header>

    <div class="sudoku-toolbar">
      <label>格子数量
        <select v-model.number="size" @change="newGame">
          <option :value="4">4 × 4</option>
          <option :value="6">6 × 6</option>
          <option :value="9">9 × 9</option>
        </select>
      </label>
      <label>难度
        <select v-model="difficulty" @change="newGame">
          <option value="easy">轻松</option>
          <option value="normal">普通</option>
          <option value="hard">挑战</option>
        </select>
      </label>
      <button class="new-game" @click="newGame">生成新题</button>
    </div>

    <div class="sudoku-layout">
      <div
        class="sudoku-board"
        :style="{ '--size': size }"
        tabindex="0"
        aria-label="数独棋盘，可用数字键输入、方向键移动"
        @keydown="handleKey"
      >
        <button
          v-for="(_, index) in size * size"
          :key="index"
          class="sudoku-cell"
          :class="{
            'is-given': isGiven(Math.floor(index / size), index % size),
            'is-selected': selected.row === Math.floor(index / size) && selected.col === index % size,
            'is-related': isRelated(Math.floor(index / size), index % size),
            'is-wrong': wrongCells.has(key(Math.floor(index / size), index % size)),
            'is-hint': hintedCells.has(key(Math.floor(index / size), index % size)),
            'box-right': (index % size + 1) % layout.boxCols === 0 && index % size < size - 1,
            'box-bottom': (Math.floor(index / size) + 1) % layout.boxRows === 0 && Math.floor(index / size) < size - 1
          }"
          :aria-label="`第 ${Math.floor(index / size) + 1} 行第 ${index % size + 1} 列，${cells[Math.floor(index / size)]?.[index % size] || '空白'}`"
          @click="selectCell(Math.floor(index / size), index % size)"
        >{{ cells[Math.floor(index / size)]?.[index % size] || '' }}</button>

        <div v-if="complete" class="sudoku-complete">
          <i v-for="n in 18" :key="n" :style="{ left: `${(n * 29) % 96}%`, '--delay': `${(n % 6) * .12}s` }">✦</i>
          <span>✦</span>
          <strong>星阵完成</strong>
          <small>{{ formatTime(elapsed) }} · {{ message }}</small>
          <button @click="newGame">再来一局</button>
        </div>
      </div>

      <aside class="sudoku-panel">
        <div class="number-pad" aria-label="数独数字键盘">
          <button v-for="number in numbers" :key="number" @click="setCell(number)">{{ number }}</button>
          <button class="erase" aria-label="清除当前格" @click="setCell(0)">⌫</button>
        </div>
        <p>{{ message }}</p>
        <button class="panel-action" @click="checkBoard">检查答案</button>
        <button class="panel-action hint" :disabled="!hintsLeft" @click="useHint">提示 · {{ hintsLeft }}</button>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.sudoku-game {
  max-width: 900px;
  margin: 24px auto;
  padding: 28px;
  overflow: hidden;
  border: 1px solid var(--dream-border);
  border-radius: 24px;
  background: linear-gradient(145deg, var(--dream-glass-line), transparent 38%), var(--dream-surface);
  box-shadow: var(--dream-shadow), inset 0 1px var(--dream-glass-line);
  backdrop-filter: blur(28px) saturate(155%);
}

.sudoku-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
}

.sudoku-head > div:first-child > span {
  color: var(--dream-purple);
  font: 700 10px/1.4 var(--vp-font-family-mono);
  letter-spacing: .14em;
}

.sudoku-head h2 {
  margin: 7px 0 4px;
  padding: 0;
  border: 0;
  color: var(--dream-text);
  font-size: 26px;
}

.sudoku-head p {
  max-width: 560px;
  margin: 0;
  color: var(--dream-muted);
  font-size: 13px;
  line-height: 1.6;
}

.sudoku-stats {
  display: flex;
  flex: none;
  gap: 18px;
}

.sudoku-stats strong {
  display: grid;
  color: var(--dream-text);
  font-size: 17px;
  text-align: center;
}

.sudoku-stats small {
  color: var(--dream-muted);
  font-size: 9px;
  font-weight: 500;
}

.sudoku-toolbar {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 24px 0 18px;
  padding: 14px;
  border: 1px solid var(--dream-border);
  border-radius: 15px;
  background: rgba(103, 63, 168, .07);
}

.sudoku-toolbar label {
  display: grid;
  gap: 5px;
  color: var(--dream-muted);
  font-size: 10px;
}

.sudoku-toolbar select,
.sudoku-toolbar button,
.sudoku-panel button,
.sudoku-complete button {
  min-height: 38px;
  border: 1px solid var(--dream-border);
  border-radius: 10px;
  color: var(--dream-text);
  background: var(--dream-surface-strong);
  font: 700 12px/1 var(--vp-font-family-base);
  cursor: pointer;
}

.sudoku-toolbar select { min-width: 112px; padding: 0 12px; }
.sudoku-toolbar .new-game { margin-left: auto; padding: 0 16px; color: #fff; background: linear-gradient(135deg, #9565ef, #6d28d9); }

.sudoku-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 190px;
  align-items: start;
  gap: 20px;
}

.sudoku-board {
  position: relative;
  display: grid;
  width: min(100%, 620px);
  aspect-ratio: 1;
  overflow: hidden;
  grid-template-columns: repeat(var(--size), 1fr);
  border: 2px solid var(--dream-purple);
  border-radius: 16px;
  outline: none;
  background: rgba(12, 7, 28, .42);
  box-shadow: 0 16px 48px rgba(21, 10, 47, .2), 0 0 28px var(--dream-glow);
}

:global(:root:not(.dark)) .sudoku-board { background: rgba(255, 252, 255, .68); }

.sudoku-board:focus-visible { box-shadow: 0 0 0 3px var(--dream-glow), 0 16px 48px rgba(21, 10, 47, .2); }

.sudoku-cell {
  min-width: 0;
  padding: 0;
  border: 0;
  border-right: 1px solid var(--dream-border);
  border-bottom: 1px solid var(--dream-border);
  border-radius: 0;
  color: var(--dream-purple-bright);
  background: transparent;
  font: 600 clamp(14px, 2.2vw, 24px)/1 var(--vp-font-family-base);
  cursor: pointer;
  transition: background 120ms ease, box-shadow 120ms ease;
}

.sudoku-cell:nth-child(n) { aspect-ratio: 1; }
.sudoku-cell.box-right { border-right: 2px solid var(--dream-purple); }
.sudoku-cell.box-bottom { border-bottom: 2px solid var(--dream-purple); }
.sudoku-cell.is-related { background: rgba(145, 91, 241, .09); }
.sudoku-cell.is-selected { position: relative; z-index: 1; background: rgba(154, 102, 249, .28); box-shadow: inset 0 0 0 2px var(--dream-purple-bright); }
.sudoku-cell.is-given { color: var(--dream-text); font-weight: 800; }
.sudoku-cell.is-wrong { color: #ff7f9e; background: rgba(255, 94, 137, .14); }
.sudoku-cell.is-hint { color: #64e9ad; }

.sudoku-panel {
  display: grid;
  gap: 10px;
  padding: 14px;
  border: 1px solid var(--dream-border);
  border-radius: 16px;
  background: rgba(103, 63, 168, .07);
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.number-pad button { min-height: 46px; color: var(--dream-purple-bright); font-size: 17px; }
.number-pad .erase { color: var(--dream-muted); }
.sudoku-panel p { min-height: 44px; margin: 4px 2px; color: var(--dream-muted); font-size: 11px; line-height: 1.6; }
.sudoku-panel .panel-action { width: 100%; }
.sudoku-panel .hint { color: #fff; border-color: transparent; background: linear-gradient(135deg, #9565ef, #6d28d9); }
.sudoku-panel button:disabled { opacity: .42; cursor: not-allowed; }

.sudoku-toolbar button:hover,
.sudoku-panel button:hover:not(:disabled),
.sudoku-complete button:hover { border-color: var(--dream-purple-bright); }

.sudoku-toolbar select:focus-visible,
.sudoku-toolbar button:focus-visible,
.sudoku-panel button:focus-visible,
.sudoku-cell:focus-visible,
.sudoku-complete button:focus-visible {
  outline: 3px solid var(--dream-purple-bright);
  outline-offset: -3px;
}

.sudoku-complete {
  position: absolute;
  z-index: 5;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  overflow: hidden;
  color: var(--dream-text);
  background: rgba(17, 9, 38, .7);
  backdrop-filter: blur(8px);
}

:global(:root:not(.dark)) .sudoku-complete { background: rgba(255, 249, 255, .78); }
.sudoku-complete > span { color: var(--dream-purple-bright); font-size: 42px; filter: drop-shadow(0 0 16px var(--dream-purple)); }
.sudoku-complete > strong { font-size: 23px; }
.sudoku-complete > small { color: var(--dream-muted); }
.sudoku-complete > button { margin-top: 8px; padding: 0 18px; color: #fff; border-color: transparent; background: linear-gradient(135deg, #9565ef, #6d28d9); }

.sudoku-complete i {
  position: absolute;
  top: -8%;
  color: var(--dream-purple-bright);
  font-style: normal;
  animation: sudoku-sparkle 2.4s var(--delay) ease-in infinite;
}

@keyframes sudoku-sparkle {
  to { top: 108%; transform: rotate(240deg); opacity: .15; }
}

@media (max-width: 720px) {
  .sudoku-game { padding: 18px; }
  .sudoku-head { flex-direction: column; }
  .sudoku-stats { align-self: stretch; justify-content: space-around; }
  .sudoku-toolbar { align-items: stretch; flex-wrap: wrap; }
  .sudoku-toolbar label { flex: 1; }
  .sudoku-toolbar select { width: 100%; }
  .sudoku-toolbar .new-game { width: 100%; margin-left: 0; }
  .sudoku-layout { grid-template-columns: 1fr; }
  .sudoku-panel { grid-template-columns: 1fr 1fr; }
  .number-pad { grid-column: 1 / -1; grid-template-columns: repeat(5, 1fr); }
  .sudoku-panel p { grid-column: 1 / -1; min-height: 0; }
}
</style>
