export const sudokuLayouts = {
  4: { boxRows: 2, boxCols: 2 },
  6: { boxRows: 2, boxCols: 3 },
  9: { boxRows: 3, boxCols: 3 }
}

function shuffle(values, random) {
  const result = [...values]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

function groupedOrder(size, groupSize, random) {
  const groups = shuffle(Array.from({ length: size / groupSize }, (_, index) => index), random)
  return groups.flatMap(group =>
    shuffle(Array.from({ length: groupSize }, (_, index) => group * groupSize + index), random)
  )
}

export function createSudokuSolution(size, random = Math.random) {
  const { boxRows, boxCols } = sudokuLayouts[size]
  const symbols = shuffle(Array.from({ length: size }, (_, index) => index + 1), random)
  const rows = groupedOrder(size, boxRows, random)
  const cols = groupedOrder(size, boxCols, random)
  return rows.map(row => cols.map(col => symbols[(row * boxCols + Math.floor(row / boxRows) + col) % size]))
}

function candidates(board, row, col, size, boxRows, boxCols) {
  const used = new Set(board[row])
  for (let index = 0; index < size; index += 1) used.add(board[index][col])
  const rowStart = Math.floor(row / boxRows) * boxRows
  const colStart = Math.floor(col / boxCols) * boxCols
  for (let y = rowStart; y < rowStart + boxRows; y += 1) {
    for (let x = colStart; x < colStart + boxCols; x += 1) used.add(board[y][x])
  }
  return Array.from({ length: size }, (_, index) => index + 1).filter(value => !used.has(value))
}

export function countSudokuSolutions(board, size, limit = 2) {
  const { boxRows, boxCols } = sudokuLayouts[size]
  let target = null
  let options = []

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col] !== 0) continue
      const available = candidates(board, row, col, size, boxRows, boxCols)
      if (!available.length) return 0
      if (!target || available.length < options.length) {
        target = { row, col }
        options = available
      }
    }
  }

  if (!target) return 1
  let count = 0
  for (const value of options) {
    board[target.row][target.col] = value
    count += countSudokuSolutions(board, size, limit - count)
    board[target.row][target.col] = 0
    if (count >= limit) break
  }
  return count
}

export function createSudokuPuzzle(size, difficulty = 'normal', random = Math.random) {
  const solution = createSudokuSolution(size, random)
  const puzzle = solution.map(row => [...row])
  const ratios = { easy: 0.42, normal: 0.54, hard: 0.62 }
  const target = Math.floor(size * size * ratios[difficulty])
  const positions = shuffle(Array.from({ length: size * size }, (_, index) => index), random)
  let removed = 0

  for (const position of positions) {
    if (removed >= target) break
    const row = Math.floor(position / size)
    const col = position % size
    const value = puzzle[row][col]
    puzzle[row][col] = 0
    const copy = puzzle.map(line => [...line])
    if (countSudokuSolutions(copy, size) === 1) removed += 1
    else puzzle[row][col] = value
  }

  return { puzzle, solution }
}
