import { isPrime, nthFibonacci, countVowelIslands } from "../lib/problem-solving-logic.js";

export function initProblemSolving(root) {
  root.innerHTML = `
    <div class="problem-controls" style="display:flex;flex-direction:column;gap:0.75rem;">
      <div>
        <label>Prime check <input type="number" class="prime-input" value="31" style="width:6rem;" /></label>
        <button type="button" class="prime-run">Check</button>
        <span class="prime-result"></span>
      </div>
      <div>
        <label>Fibonacci step <input type="number" class="fib-input" value="6" min="0" style="width:6rem;" /></label>
        <button type="button" class="fib-run">Compute</button>
        <span class="fib-result"></span>
      </div>
      <div>
        <label>Vowel islands <input type="text" class="vowel-input" value="queue" style="width:10rem;" /></label>
        <button type="button" class="vowel-run">Count</button>
        <span class="vowel-result"></span>
      </div>
    </div>
  `;

  const primeInput = root.querySelector(".prime-input");
  const primeResult = root.querySelector(".prime-result");
  const fibInput = root.querySelector(".fib-input");
  const fibResult = root.querySelector(".fib-result");
  const vowelInput = root.querySelector(".vowel-input");
  const vowelResult = root.querySelector(".vowel-result");

  root.querySelector(".prime-run").addEventListener("click", () => {
    const n = parseInt(primeInput.value, 10);
    primeResult.textContent = Number.isInteger(n) ? (isPrime(n) ? `${n} is prime` : `${n} is composite`) : "Enter a whole number.";
  });

  root.querySelector(".fib-run").addEventListener("click", () => {
    const n = parseInt(fibInput.value, 10);
    fibResult.textContent = Number.isInteger(n) && n >= 0 ? `F(${n}) = ${nthFibonacci(n)}` : "Enter a non-negative whole number.";
  });

  root.querySelector(".vowel-run").addEventListener("click", () => {
    const word = vowelInput.value;
    vowelResult.textContent = word ? `${countVowelIslands(word)} vowel island(s)` : "Enter a word.";
  });
}
