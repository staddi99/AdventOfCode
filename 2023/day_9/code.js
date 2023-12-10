import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (const line of data) {
    let curr = line.match(/[-\d]+/g).map(Number);
    const rows = [curr];
    while (curr.some(Boolean)) {
      const next = [];
      for (let i = 0; i < curr.length - 1; i++) {
        next.push(curr[i + 1] - curr[i]);
      }
      curr = next;
      rows.push(next);
    }
    let carry = 0;
    for (let i = rows.length - 2; i >= 0; i--) {
      carry += rows[i].at(-1);
    }
    sum += carry;
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (const line of data) {
    let curr = line.match(/[-\d]+/g).map(Number);
    const rows = [curr];
    while (curr.some(Boolean)) {
      const next = [];
      for (let i = 0; i < curr.length - 1; i++) {
        next.push(curr[i + 1] - curr[i]);
      }
      curr = next;
      rows.push(next);
    }
    let carry = 0;
    for (let i = rows.length - 2; i >= 0; i--) {
      carry = rows[i][0] - carry;
    }
    sum += carry;
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
