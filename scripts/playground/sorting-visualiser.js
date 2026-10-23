import { randomElements, insertionSortSteps, mergeSortSteps } from "../lib/sorting-logic.js";

const BAR_COUNT = 40;
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 240;

export function initSortingVisualiser(root) {
  let array = randomElements(BAR_COUNT, 5, 100);
  let generator = null;
  let running = false;
  let timerId = null;
  let highlight = [];
  let algorithm = "insertion";

  root.innerHTML = `
    <canvas class="sort-canvas" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"
      style="width:100%;max-width:${CANVAS_WIDTH}px;background:#0d1117;border:1px solid var(--color-border);"></canvas>
    <div class="sort-controls" style="display:flex;gap:0.5rem;align-items:center;margin-top:0.5rem;flex-wrap:wrap;">
      <select class="sort-algorithm">
        <option value="insertion">Insertion sort</option>
        <option value="merge">Merge sort</option>
      </select>
      <button type="button" class="sort-start">Start</button>
      <button type="button" class="sort-shuffle">Shuffle</button>
    </div>
    <p class="sort-status" role="status"></p>
  `;

  const canvas = root.querySelector(".sort-canvas");
  const ctx = canvas.getContext("2d");
  const algoSelect = root.querySelector(".sort-algorithm");
  const startBtn = root.querySelector(".sort-start");
  const shuffleBtn = root.querySelector(".sort-shuffle");
  const status = root.querySelector(".sort-status");

  function draw() {
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;
    array.forEach((value, i) => {
      ctx.fillStyle = highlight.includes(i) ? "#f78166" : "#2e9ef7";
      const barHeight = (value / 100) * canvas.height;
      ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
    });
  }

  function stop() {
    running = false;
    startBtn.textContent = "Start";
    clearInterval(timerId);
  }

  function step() {
    const result = generator.next();
    if (result.done) {
      stop();
      highlight = [];
      status.textContent = "Sorted.";
      draw();
      return;
    }
    array = result.value.array;
    highlight = result.value.compare;
    draw();
  }

  function start() {
    if (running) return;
    running = true;
    startBtn.textContent = "Pause";
    status.textContent = "Sorting...";
    generator = algorithm === "insertion" ? insertionSortSteps(array) : mergeSortSteps(array);
    timerId = setInterval(step, 30);
  }

  startBtn.addEventListener("click", () => (running ? stop() : start()));
  shuffleBtn.addEventListener("click", () => {
    stop();
    array = randomElements(BAR_COUNT, 5, 100);
    highlight = [];
    status.textContent = "Shuffled.";
    draw();
  });
  algoSelect.addEventListener("change", () => {
    algorithm = algoSelect.value;
    stop();
  });

  status.textContent = "Ready.";
  draw();
}
