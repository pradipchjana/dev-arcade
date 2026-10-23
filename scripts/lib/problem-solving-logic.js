// Ported from js-practice/day4/prime_number.js, day5/fibonacci/fibonacci.js and
// day6/vowel_island.js. Originals used hardcoded script-level variables (number = 32,
// numberOfSteps = 6, meadow = "queue") with no exported function — parameterized here
// into pure functions with the same algorithm.

export function isPrime(number) {
  if (number < 2) return false;
  let count = 2;
  let prime = true;
  while (prime && count < number) {
    if (number % count === 0) prime = false;
    count++;
  }
  return prime;
}

export function nthFibonacci(steps) {
  let firstTerm = 1;
  let secondTerm = 0;
  let fibonacci = 0;
  for (let index = 0; index < steps; index++) {
    fibonacci = firstTerm + secondTerm;
    firstTerm = secondTerm;
    secondTerm = fibonacci;
  }
  return fibonacci;
}

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

export function countVowelIslands(word) {
  let islands = 0;
  for (let i = 0; i < word.length; i++) {
    if (VOWELS.has(word[i]) && !VOWELS.has(word[i + 1])) {
      islands++;
    }
  }
  return islands;
}
