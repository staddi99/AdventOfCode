import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(',');
const inputArrayTest = inputSample.split(',');

const solve = (n, isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  let lastNum = data[data.length - 1];
  const lastSpoken = new Array(n);
  data.forEach((v, i) => (lastSpoken[v] = i + 1));

  for (let i = data.length; i < n; i++) {
    const next = lastSpoken[lastNum] ? i - lastSpoken[lastNum] : 0;
    lastSpoken[lastNum] = i;
    lastNum = next;
  }
  return lastNum;
};

export function partOne(isTest) {
  return solve(2020, isTest);
}

export function partTwo(isTest) {
  return solve(30000000, isTest);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
