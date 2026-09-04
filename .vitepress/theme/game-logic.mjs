export function randomStarPosition(random = Math.random) {
  return {
    x: 8 + random() * 84,
    y: 10 + random() * 78
  }
}
