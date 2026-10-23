import { HUMAN, BOT, createBoard, isWin, isDraw, getAvailableMoves, bestBotMove } from "../lib/tic-tac-toe-logic.js";

export function initTicTacToe(root) {
  let board = createBoard();
  let gameOver = false;

  root.innerHTML = `
    <div class="ttt-grid" role="grid" aria-label="Tic-Tac-Toe board"></div>
    <p class="ttt-status" role="status"></p>
    <button type="button" class="ttt-reset">New game</button>
  `;

  const grid = root.querySelector(".ttt-grid");
  const status = root.querySelector(".ttt-status");
  const resetBtn = root.querySelector(".ttt-reset");

  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(3, 3rem)";
  grid.style.gap = "4px";

  const cells = Array.from({ length: 9 }, (_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Cell ${i + 1}`);
    btn.style.width = "3rem";
    btn.style.height = "3rem";
    btn.style.fontSize = "1.25rem";
    btn.addEventListener("click", () => handleHumanMove(i));
    grid.appendChild(btn);
    return btn;
  });

  function render() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i] === " " ? "" : board[i];
      cell.disabled = gameOver || board[i] !== " ";
    });
  }

  function setStatus(text) {
    status.textContent = text;
  }

  function handleHumanMove(index) {
    if (gameOver || board[index] !== " ") return;
    board[index] = HUMAN;
    render();

    if (isWin(board, HUMAN)) {
      endGame("You win!");
      return;
    }
    if (isDraw(board)) {
      endGame("Game draw.");
      return;
    }

    const move = bestBotMove(board);
    board[move] = BOT;
    render();

    if (isWin(board, BOT)) {
      endGame("Bot wins.");
      return;
    }
    if (isDraw(board)) {
      endGame("Game draw.");
      return;
    }
    setStatus("Your turn.");
  }

  function endGame(message) {
    gameOver = true;
    render();
    setStatus(message);
  }

  resetBtn.addEventListener("click", () => {
    board = createBoard();
    gameOver = false;
    setStatus("Your turn.");
    render();
  });

  setStatus("Your turn.");
  render();
}
