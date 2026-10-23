// Ported from js-practice/sorting/insertion_sort.js and merged_sort.js.
// Originals were self-invoking benchmark scripts (no export, no step output) —
// rewritten here as generators that yield {array, compare} snapshots after each
// comparison/swap so the UI can animate the sort step by step.

export function randomElements(count, lower = 1, upper = 100) {
  return Array.from({ length: count }, () => lower + Math.floor(Math.random() * (upper - lower)));
}

export function* insertionSortSteps(input) {
  const array = [...input];
  for (let index = 1; index < array.length; index++) {
    const key = array[index];
    let j = index - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
      yield { array: [...array], compare: [j + 1, index] };
    }
    array[j + 1] = key;
    yield { array: [...array], compare: [j + 1] };
  }
  return array;
}

export function* mergeSortSteps(input) {
  const array = [...input];
  yield* mergeSortRange(array, 0, array.length);
  return array;
}

function* mergeSortRange(array, start, end) {
  if (end - start <= 1) return;
  const mid = start + Math.floor((end - start) / 2);
  yield* mergeSortRange(array, start, mid);
  yield* mergeSortRange(array, mid, end);
  yield* mergeRange(array, start, mid, end);
}

function* mergeRange(array, start, mid, end) {
  const left = array.slice(start, mid);
  const right = array.slice(mid, end);
  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k] = left[i++];
    } else {
      array[k] = right[j++];
    }
    yield { array: [...array], compare: [k] };
    k++;
  }
  while (i < left.length) {
    array[k] = left[i++];
    yield { array: [...array], compare: [k] };
    k++;
  }
  while (j < right.length) {
    array[k] = right[j++];
    yield { array: [...array], compare: [k] };
    k++;
  }
}
