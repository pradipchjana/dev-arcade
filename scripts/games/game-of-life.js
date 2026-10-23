import { createGrid, nextGeneration } from "../lib/game-of-life-logic.js";

const COLS = 40;
const ROWS = 25;
const CELL_SIZE = 12;

export function initGameOfLife(root) {
  let grid = createGrid(COLS, ROWS, true);
  let running = false;
  let timerId = null;
  let speed = 200;

  root.innerHTML = `
    <canvas class="gol-canvas" width="${COLS * CELL_SIZE}" height="${ROWS * CELL_SIZE}"
      style="width:100%;max-width:${COLS * CELL_SIZE}px;background:#0d1117;border:1px solid var(--color-border);"></canvas>
    <div class="gol-controls" style="display:flex;gap:0.5rem;align-items:center;margin-top:0.5rem;flex-wrap:wrap;">
      <button type="button" class="gol-play">Play</button>
      <button type="button" class="gol-reset">Randomize</button>
      <button type="button" class="gol-clear">Clear</button>
      <label>Speed
        <input type="range" class="gol-speed" min="50" max="1000" step="50" value="${speed}" />
      </label>
    </div>
    <p class="gol-status" role="status"></p>
  `;

  const canvas = root.querySelector(".gol-canvas");
  const ctx = canvas.getContext("2d");
  const playBtn = root.querySelector(".gol-play");
  const resetBtn = root.querySelector(".gol-reset");
  const clearBtn = root.querySelector(".gol-clear");
  const speedInput = root.querySelector(".gol-speed");
  const status = root.querySelector(".gol-status");

  function draw() {
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2e9ef7";
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x]) {
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
  }

  function step() {
    const { next, changed } = nextGeneration(grid);
    grid = next;
    draw();
    if (!changed) {
      stop();
      status.textContent = "Stabilized — stopped.";
    }
  }

  function start() {
    if (running) return;
    running = true;
    playBtn.textContent = "Pause";
    status.textContent = "Running.";
    timerId = setInterval(step, speed);
  }

  function stop() {
    running = false;
    playBtn.textContent = "Play";
    clearInterval(timerId);
  }

  function toggleCell(evt) {
    if (running) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor(((evt.clientX - rect.left) * scaleX) / CELL_SIZE);
    const y = Math.floor(((evt.clientY - rect.top) * scaleY) / CELL_SIZE);
    if (grid[y] && x >= 0 && x < grid[y].length) {
      grid[y][x] = !grid[y][x];
      draw();
    }
  }

  playBtn.addEventListener("click", () => (running ? stop() : start()));
  resetBtn.addEventListener("click", () => {
    stop();
    grid = createGrid(COLS, ROWS, true);
    status.textContent = "Randomized.";
    draw();
  });
  clearBtn.addEventListener("click", () => {
    stop();
    grid = createGrid(COLS, ROWS, false);
    status.textContent = "Cleared — click cells to draw, then Play.";
    draw();
  });
  speedInput.addEventListener("input", () => {
    speed = Number(speedInput.value);
    if (running) {
      clearInterval(timerId);
      timerId = setInterval(step, speed);
    }
  });
  canvas.addEventListener("click", toggleCell);

  status.textContent = "Click Play to start, or click cells to edit first.";
  draw();
}
