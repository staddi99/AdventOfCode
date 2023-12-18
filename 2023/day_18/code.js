import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

function solve(input, part) {
  let r = 0;
  let c = 0;
  let area = 0;
  let perimeter = 0;
  for (const line of input) {
    let [d, n, color] = line.split(/[ ()]+/g);
    n = +n;
    if (part === 2) {
      d = ['R', 'D', 'L', 'U'][color.at(-1)];
      n = parseInt(color.slice(1, -1), 16);
    }

    const [dr, dc] = DIR[d];
    const r0 = r;
    const c0 = c;
    r += dr * n;
    c += dc * n;
    area += (r * c0 - r0 * c) / 2;
    perimeter += n;
  }

  return area + perimeter / 2 + 1;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  return solve(data, 1);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  return solve(data, 2);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
