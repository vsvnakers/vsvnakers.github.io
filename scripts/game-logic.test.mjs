import assert from 'node:assert/strict'
import { randomStarPosition } from '../.vitepress/theme/game-logic.mjs'
import { advanceSnake, isOpposite, spawnFood } from '../.vitepress/theme/snake-logic.mjs'
import { countSudokuSolutions, createSudokuPuzzle, createSudokuSolution, sudokuLayouts } from '../.vitepress/theme/sudoku-logic.mjs'

const fixedRandom = () => 0.5
const position = randomStarPosition(fixedRandom)
assert.deepEqual(position, { x: 50, y: 49 })
for (let index = 0; index < 100; index += 1) {
  const sample = randomStarPosition()
  assert.ok(sample.x >= 8 && sample.x <= 92)
  assert.ok(sample.y >= 10 && sample.y <= 88)
}

assert.equal(isOpposite('left', 'right'), true)
assert.equal(isOpposite('up', 'right'), false)

const wrapped = advanceSnake([{ x: 0, y: 0 }], 'left', { x: 2, y: 2 }, 5)
assert.deepEqual(wrapped.snake[0], { x: 4, y: 0 })

const fed = advanceSnake([{ x: 1, y: 1 }, { x: 0, y: 1 }], 'right', { x: 2, y: 1 }, 5)
assert.equal(fed.ate, true)
assert.equal(fed.snake.length, 3)

const food = spawnFood([{ x: 0, y: 0 }, { x: 1, y: 0 }], 2, () => 0)
assert.deepEqual(food, { x: 0, y: 1 })

let seed = 7
const seededRandom = () => ((seed = seed * 16807 % 2147483647) - 1) / 2147483646
for (const size of [4, 6, 9]) {
  const solution = createSudokuSolution(size, seededRandom)
  const expected = Array.from({ length: size }, (_, index) => index + 1).join(',')
  const { boxRows, boxCols } = sudokuLayouts[size]
  assert.ok(solution.every(row => [...row].sort((a, b) => a - b).join(',') === expected))
  for (let col = 0; col < size; col += 1) {
    assert.equal(solution.map(row => row[col]).sort((a, b) => a - b).join(','), expected)
  }
  for (let row = 0; row < size; row += boxRows) {
    for (let col = 0; col < size; col += boxCols) {
      const box = solution.slice(row, row + boxRows).flatMap(line => line.slice(col, col + boxCols))
      assert.equal(box.sort((a, b) => a - b).join(','), expected)
    }
  }
  const generated = createSudokuPuzzle(size, 'normal', seededRandom)
  assert.equal(countSudokuSolutions(generated.puzzle.map(row => [...row]), size), 1)
  assert.ok(generated.puzzle.flat().some(value => value === 0))
}

console.log('game logic checks passed')
