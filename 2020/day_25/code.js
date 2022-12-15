import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n').map(Number);
const inputArrayTest = inputSample.split('\n').map(Number);

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let key = 1;
  let target = 1;
  while (target !== data[1]) {
    target = (target * 7) % 20201227;
    key = (key * data[0]) % 20201227;
  }
  return key;
}

console.log('Part 1: ' + partOne());
