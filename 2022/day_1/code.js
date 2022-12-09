import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const run = (isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  var resArray = [];
  var count = 0;
  data.forEach((value) => {
    if (!isNaN(parseInt(value))) {
      count += parseInt(value);
    } else {
      resArray.push(count);
      count = 0;
    }
  }, count);
  resArray.push(count);
  resArray.sort((a, b) => b - a);

  return resArray;
};

export function partOne(isTest) {
  const res = run(isTest);
  return res[0];
}

export function partTwo(isTest) {
  const res = run(isTest);
  return res[0] + res[1] + res[2];
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
