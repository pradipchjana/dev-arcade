// Ported from js-practice/recursion/factorial.js and reverse_string.js.
// Originals returned only a final value with a console.log test harness —
// rewritten here to record a {depth, call, result} trace of every recursive
// call so the UI can render the call stack step by step.

export function factorialTrace(n) {
  const trace = [];

  function factorial(number, depth) {
    trace.push({ depth, call: `factorial(${number})`, phase: "call" });
    const result = number === 0 ? 1 : number * factorial(number - 1, depth + 1);
    trace.push({ depth, call: `factorial(${number})`, phase: "return", result });
    return result;
  }

  const result = factorial(n, 0);
  return { trace, result };
}

export function reverseTrace(sentence) {
  const trace = [];

  function first(s) {
    return s[0];
  }

  function rest(s) {
    let out = "";
    for (let i = 1; i < s.length; i++) out += s[i];
    return out;
  }

  function reverse(s, depth) {
    trace.push({ depth, call: `reverse("${s}")`, phase: "call" });
    const result = s === "" ? "" : reverse(rest(s), depth + 1) + first(s);
    trace.push({ depth, call: `reverse("${s}")`, phase: "return", result });
    return result;
  }

  const result = reverse(sentence, 0);
  return { trace, result };
}
