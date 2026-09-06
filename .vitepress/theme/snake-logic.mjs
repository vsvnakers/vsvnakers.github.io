const vectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
}

export function isOpposite(first, second) {
  const a = vectors[first]
  const b = vectors[second]
  return a.x + b.x === 0 && a.y + b.y === 0
}

export function advanceSnake(snake, direction, food, size) {
  const vector = vectors[direction]
  const head = {
    x: (snake[0].x + vector.x + size) % size,
    y: (snake[0].y + vector.y + size) % size
  }
  const ate = head.x === food.x && head.y === food.y
  const body = ate ? snake : snake.slice(0, -1)
  const collision = body.some(part => part.x === head.x && part.y === head.y)
  return {
    ate,
    collision,
    snake: collision ? snake : [head, ...body]
  }
}

export function spawnFood(snake, size, random = Math.random) {
  const occupied = new Set(snake.map(part => `${part.x},${part.y}`))
  const empty = []
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!occupied.has(`${x},${y}`)) empty.push({ x, y })
    }
  }
  return empty[Math.floor(random() * empty.length)] ?? null
}
