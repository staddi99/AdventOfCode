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

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return seqOfUniqueChar(data, 4);
}

export function partTwo(usTest) {
  const data = usTest ? inputArrayTest : inputArray;
  return seqOfUniqueChar(data, 14);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
