import { factorialTrace, reverseTrace } from "../lib/recursion-logic.js";

export function initRecursionExplorer(root) {
  root.innerHTML = `
    <div class="recursion-controls" style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
      <select class="recursion-algorithm">
        <option value="factorial">Factorial</option>
        <option value="reverse">Reverse string</option>
      </select>
      <input type="text" class="recursion-input" value="5" style="width:8rem;" />
      <button type="button" class="recursion-run">Run</button>
    </div>
    <p class="recursion-result" role="status"></p>
    <ol class="recursion-trace" style="font-family:var(--font-mono);font-size:0.85rem;max-height:260px;overflow-y:auto;"></ol>
  `;

  const algoSelect = root.querySelector(".recursion-algorithm");
  const input = root.querySelector(".recursion-input");
  const runBtn = root.querySelector(".recursion-run");
  const result = root.querySelector(".recursion-result");
  const traceList = root.querySelector(".recursion-trace");

  function updateInputDefault() {
    input.value = algoSelect.value === "factorial" ? "5" : "pradip";
  }

  function run() {
    traceList.innerHTML = "";
    let traceData;

    if (algoSelect.value === "factorial") {
      const n = parseInt(input.value, 10);
      if (!Number.isInteger(n) || n < 0 || n > 12) {
        result.textContent = "Enter a whole number between 0 and 12.";
        return;
      }
      traceData = factorialTrace(n);
    } else {
      const s = input.value;
      if (!s || s.length > 20) {
        result.textContent = "Enter a non-empty string up to 20 characters.";
        return;
      }
      traceData = reverseTrace(s);
    }

    traceData.trace.forEach(({ depth, call, phase, result: stepResult }) => {
      const li = document.createElement("li");
      li.style.marginLeft = `${depth * 1.5}rem`;
      li.textContent = phase === "call" ? `→ ${call}` : `← ${call} = ${JSON.stringify(stepResult)}`;
      traceList.appendChild(li);
    });

    result.textContent = `Result: ${JSON.stringify(traceData.result)}`;
  }

  algoSelect.addEventListener("change", updateInputDefault);
  runBtn.addEventListener("click", run);

  updateInputDefault();
}
