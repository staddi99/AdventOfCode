import input from './input.js';

const inputArray = input.split(',').map(Number);

const lo = Math.min(...inputArray);
const hi = Math.max(...inputArray);

function partOne() {
  let minTotal = Infinity;
  for (let depth = lo; depth < hi; depth++) {
    let total = 0;
    for (const crab of inputArray) {
      total += Math.abs(crab - depth);
    }
    minTotal = Math.min(minTotal, total);
  }

  return minTotal;
}

function partTwo() {
  let minTotal = Infinity;
  for (let depth = lo; depth < hi; depth++) {
    let total = 0;
    for (const crab of inputArray) {
      const dist = Math.abs(crab - depth);
      total += ((1 + dist) * dist) / 2;
    }
    minTotal = Math.min(minTotal, total);
  }

  return minTotal;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
