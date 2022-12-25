import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

const compare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'number') {
    a = [a];
  } else if (typeof b === 'number') {
    b = [b];
  }

  for (let i = 0; i < a.length; i++) {
    if (b[i] === undefined) {
      return 1;
    }
    const c = compare(a[i], b[i]);
    if (c !== 0) {
      return c;
    }
  }

  return a.length === b.length ? 0 : -1;
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const pairs = data.map((pair) => pair.split('\n').map(JSON.parse));
  const corrects = pairs.map(([a, b]) => +(compare(a, b) <= 0));
  return corrects
    .map((correct, i) => correct * (i + 1))
    .reduce((acc, n) => acc + n);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const dividers = [[[2]], [[6]]];
  const packets = data
    .map((pair) => pair.split('\n').map(JSON.parse))
    .flat()
    .concat(dividers)
    .sort(compare);
  return dividers
    .map((d) => packets.indexOf(d) + 1)
    .reduce((acc, n) => acc * n);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
