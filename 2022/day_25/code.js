import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const toDec = (str) => {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.at(-1 - i);
    n += ('=-012'.indexOf(char) - 2) * 5 ** i;
  }
  return n;
};

const toSnafu = (n) => {
  let str = [];
  while (n > 0) {
    str.unshift('012=-'[n % 5]);
    n = Math.round(n / 5);
  }
  return str.join('');
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let sum = 0;
  for (const line of data) {
    sum += toDec(line);
  }
  return toSnafu(sum);
}

// console.log('Part 1: ' + partOne());
