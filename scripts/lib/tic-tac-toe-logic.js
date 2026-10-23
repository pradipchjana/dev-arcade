// Ported from js-practice/games/tic_tac_toe.js (pure minimax logic only;
// original used Deno's prompt()/console.log for I/O, replaced here with a
// plain object API so the UI layer can drive it from DOM events).

export const HUMAN = "X";
export const BOT = "O";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function createBoard() {
  return Array(9).fill(" ");
}

export function isWin(board, player) {
  return WIN_PATTERNS.some((pattern) => pattern.every((i) => board[i] === player));
}

export function isDraw(board) {
  return board.every((cell) => cell !== " ");
}

export function getAvailableMoves(board) {
  return board.map((v, i) => (v === " " ? i : null)).filter((v) => v !== null);
}

function minmax(board, isMaximizing) {
  if (isWin(board, BOT)) return 1;
  if (isWin(board, HUMAN)) return -1;
  if (isDraw(board)) return 0;

  const scores = [];
  for (const move of getAvailableMoves(board)) {
    board[move] = isMaximizing ? BOT : HUMAN;
    scores.push(minmax(board, !isMaximizing));
    board[move] = " ";
  }
  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

export function bestBotMove(board) {
  let bestScore = -Infinity;
  let nextMove;

  for (const move of getAvailableMoves(board)) {
    board[move] = BOT;
    const score = minmax(board, false);
    board[move] = " ";
    if (score > bestScore) {
      bestScore = score;
      nextMove = move;
    }
  }
  return nextMove;
}
