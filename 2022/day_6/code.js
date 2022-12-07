import input from './input.js';

const inputArray = input.split('');

const seqOfUniqueChar = (input, length) => {
  for (let i = length; i < input.length; i++) {
    const seq = input.slice(i - length, i);
    if ([...new Set(seq)].length == length) return i;
  }
};

function partOne() {
  return seqOfUniqueChar(inputArray, 4);
}

function partTwo() {
  return seqOfUniqueChar(inputArray, 14);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
