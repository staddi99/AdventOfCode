import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const scores = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sum = 0;
  data.forEach((element) => {
    const [a, b] = element.split(' ');
    sum += scores[b];
    sum +=
      scores[a] - scores[b] == 0
        ? 3
        : scores[a] - scores[b] == 1
        ? 0
        : scores[a] - scores[b] + 3 == 1
        ? 0
        : 6;
  });
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sum = 0;
  data.forEach((element) => {
    const [a, b] = element.split(' ');
    switch (b) {
      case 'X':
        sum += scores[a] - 1 > 0 ? scores[a] - 1 : scores[a] + 2;
        break;
      case 'Y':
        sum += scores[a] + 3;
        break;
      case 'Z':
        sum += (scores[a] + 1 > 3 ? scores[a] - 2 : scores[a] + 1) + 6;
        break;
    }
  });
  return sum;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
