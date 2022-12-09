import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input;
const inputArrayTest = inputSample;

const seqOfUniqueChar = (input, length) => {
  for (let i = length; i < input.length; i++) {
    const seq = input.slice(i - length, i);
    if ([...new Set(seq)].length == length) return i;
  }
};

export function partOne(test) {
  const data = test ? inputArrayTest : inputArray;
  return seqOfUniqueChar(data, 4);
}

export function partTwo(test) {
  const data = test ? inputArrayTest : inputArray;
  return seqOfUniqueChar(data, 14);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
