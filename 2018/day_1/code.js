import input from './input.js';
import {inputSample1, inputSample2} from './inputSample.js';

const inputArray = input.split('\n').map((e) => parseInt(e));
const inputArrayTest1 = inputSample1.split('\n').map((e) => parseInt(e));
const inputArrayTest2 = inputSample2.split('\n').map((e) => parseInt(e));

export function partOne(isTest) {
  const data = isTest ? inputArrayTest1 : inputArray;
  return data.reduce((a, b) => a + b, 0);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest2 : inputArray;
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
  for (const num of toIterator(data, true)) {
    value += num;
    if (history.includes(value)) return value;
    history.push(value);
  }
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
