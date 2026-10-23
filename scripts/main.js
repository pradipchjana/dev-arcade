// Entry point — wires up each demo module to its section once the DOM is ready.
// Game/playground modules are added incrementally (see Plan.md phases 2-4).

import { initTicTacToe } from "./games/tic-tac-toe.js";
import { initGameOfLife } from "./games/game-of-life.js";
import { initFractalLab } from "./playground/fractal-lab.js";
import { initSortingVisualiser } from "./playground/sorting-visualiser.js";
import { initRecursionExplorer } from "./playground/recursion-explorer.js";
import { initProblemSolving } from "./playground/problem-solving.js";

document.addEventListener("DOMContentLoaded", () => {
  initTicTacToe(document.getElementById("tic-tac-toe-root"));
  initGameOfLife(document.getElementById("game-of-life-root"));
  initFractalLab(document.getElementById("fractal-lab-root"));
  initSortingVisualiser(document.getElementById("sorting-visualiser-root"));
  initRecursionExplorer(document.getElementById("recursion-explorer-root"));
  initProblemSolving(document.getElementById("problem-solving-root"));
});
