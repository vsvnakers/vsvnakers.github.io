import assert from 'node:assert/strict'
import { randomStarPosition } from '../.vitepress/theme/game-logic.mjs'

const fixedRandom = () => 0.5
const position = randomStarPosition(fixedRandom)
assert.deepEqual(position, { x: 50, y: 49 })
for (let index = 0; index < 100; index += 1) {
  const sample = randomStarPosition()
  assert.ok(sample.x >= 8 && sample.x <= 92)
  assert.ok(sample.y >= 10 && sample.y <= 88)
}

console.log('game logic checks passed')
