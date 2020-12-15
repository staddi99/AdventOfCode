import input from './input.js';

const inputArray = input.split(',');

const solve = (n) => {
  let lastNum = inputArray[inputArray.length - 1];
  const lastSpoken = new Array(n);
  inputArray.forEach((v, i) => lastSpoken[v] = i + 1);

  for (let i = inputArray.length; i < n; i++) {
    const next = lastSpoken[lastNum] ? i - lastSpoken[lastNum] : 0;
    lastSpoken[lastNum] = i;
    lastNum = next;
  }
  return lastNum;
}

function partOne() {
  return solve(2020);
}

function partTwo() {
  return solve(30000000);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
