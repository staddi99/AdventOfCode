import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var inc = 0;
  data.forEach((value, i, array) => {
    if (parseInt(value) > parseInt(array[i - 1])) inc++;
  }, inc);
  return inc;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var inc = 0;

  data
    .map((value, i, array) => {
      if (i > 1)
        return (
          parseInt(value) + parseInt(array[i - 1]) + parseInt(array[i - 2])
        );
    })
    .slice(2)
    .forEach((value, i, array) => {
      if (parseInt(value) > parseInt(array[i - 1])) inc++;
    }, inc);

  return inc;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
