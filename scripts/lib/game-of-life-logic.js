// Ported from js-practice/games/game_of_life.js (countAliveNeighbors/nextGeneration
// are unchanged in spirit; cells use boolean true/false here instead of "🟨"/"  "
// strings so the UI layer can draw them on a canvas instead of console.log).

const OFFSETS = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

export function createGrid(cols, rows, randomize = false) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (randomize ? Math.random() < 0.25 : false))
  );
}

export function countAliveNeighbors(x, y, grid) {
  let count = 0;
  for (const [dx, dy] of OFFSETS) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length && grid[ny][nx]) {
      count++;
    }
  }
  return count;
}

export function nextGeneration(grid) {
  let changed = false;
  const next = grid.map((row) => [...row]);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const neighbors = countAliveNeighbors(x, y, grid);
      if (grid[y][x]) {
        if (neighbors < 2 || neighbors > 3) {
          next[y][x] = false;
          changed = true;
        }
      } else if (neighbors === 3) {
        next[y][x] = true;
        changed = true;
      }
    }
  }

  return { next, changed };
}
