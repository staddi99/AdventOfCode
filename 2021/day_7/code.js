import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(',').map(Number);
const inputArrayTest = inputSample.split(',').map(Number);

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const lo = Math.min(...data);
  const hi = Math.max(...data);

  let minTotal = Infinity;
  for (let depth = lo; depth < hi; depth++) {
    let total = 0;
    for (const crab of data) {
      total += Math.abs(crab - depth);
    }
    minTotal = Math.min(minTotal, total);
  }

  return minTotal;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const lo = Math.min(...data);
  const hi = Math.max(...data);

  let minTotal = Infinity;
  for (let depth = lo; depth < hi; depth++) {
    let total = 0;
    for (const crab of data) {
      const dist = Math.abs(crab - depth);
      total += ((1 + dist) * dist) / 2;
    }
    minTotal = Math.min(minTotal, total);
  }

  return minTotal;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
