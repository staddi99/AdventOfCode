import input from './input.js';

const inputArray = input.split('\n').map((e) => parseInt(e));

function partOne() {
  return inputArray.reduce((a, b) => a + b, 0);
}

function partTwo() {
  const toIterator = (arr, loop=false) => ({
    *[Symbol.iterator]() {
      for (let i = 0; i < loop ? Infinity : arr.length; i++) {
        yield arr[i % arr.length];
      }
    }
  });

  let value = 0;
  const history = [value];

  let i = 0;
  for (const num of toIterator(inputArray, true)) {
    value += num;
    if (history.includes(value)) return value;
    history.push(value);
  }
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
