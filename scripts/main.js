// Entry point — wires up each demo module to its section once the DOM is ready.
// Game/playground modules are added incrementally (see Plan.md phases 2-4).

import { initTicTacToe } from "./games/tic-tac-toe.js";

document.addEventListener("DOMContentLoaded", () => {
  initTicTacToe(document.getElementById("tic-tac-toe-root"));
});
