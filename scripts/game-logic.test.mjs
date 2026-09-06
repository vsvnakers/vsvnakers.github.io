import assert from 'node:assert/strict'
import { randomStarPosition } from '../.vitepress/theme/game-logic.mjs'
import { advanceSnake, isOpposite, spawnFood } from '../.vitepress/theme/snake-logic.mjs'

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

console.log('game logic checks passed')
