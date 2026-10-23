import { createVertices, nextPoint } from "../lib/sierpinski-logic.js";

const WIDTH = 480;
const HEIGHT = 420;
const POINTS_PER_FRAME = 50;

export function initFractalLab(root) {
  let running = false;
  let frameId = null;
  let current;
  let vertices;
  let pointCount = 0;
  let maxPoints = 50_000;

  root.innerHTML = `
    <canvas class="fractal-canvas" width="${WIDTH}" height="${HEIGHT}"
      style="width:100%;max-width:${WIDTH}px;background:#0d1117;border:1px solid var(--color-border);"></canvas>
    <div class="fractal-controls" style="display:flex;gap:0.5rem;align-items:center;margin-top:0.5rem;flex-wrap:wrap;">
      <button type="button" class="fractal-start">Start</button>
      <button type="button" class="fractal-reset">Reset</button>
      <label>Points
        <input type="range" class="fractal-depth" min="5000" max="150000" step="5000" value="${maxPoints}" />
      </label>
    </div>
    <p class="fractal-status" role="status"></p>
  `;

  const canvas = root.querySelector(".fractal-canvas");
  const ctx = canvas.getContext("2d");
  const startBtn = root.querySelector(".fractal-start");
  const resetBtn = root.querySelector(".fractal-reset");
  const depthInput = root.querySelector(".fractal-depth");
  const status = root.querySelector(".fractal-status");

  function reset() {
    stop();
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vertices = createVertices(WIDTH, HEIGHT);
    current = { x: WIDTH / 2, y: HEIGHT / 2 };
    pointCount = 0;
    status.textContent = "Ready. Click Start.";
  }

  function draw() {
    ctx.fillStyle = "#2e9ef7";
    for (let i = 0; i < POINTS_PER_FRAME && pointCount < maxPoints; i++) {
      current = nextPoint(current, vertices);
      ctx.fillRect(current.x, current.y, 1, 1);
      pointCount++;
    }
    status.textContent = `${pointCount} / ${maxPoints} points`;

    if (pointCount >= maxPoints) {
      stop();
      status.textContent = `Finished — ${pointCount} points.`;
      return;
    }
    frameId = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    startBtn.textContent = "Pause";
    frameId = requestAnimationFrame(draw);
  }

  function stop() {
    running = false;
    startBtn.textContent = "Start";
    if (frameId) cancelAnimationFrame(frameId);
  }

  startBtn.addEventListener("click", () => (running ? stop() : start()));
  resetBtn.addEventListener("click", reset);
  depthInput.addEventListener("input", () => {
    maxPoints = Number(depthInput.value);
  });

  reset();
}
