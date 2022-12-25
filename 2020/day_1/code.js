import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var res = 0;

  data.forEach((e1) => {
    data.forEach((e2) => {
      if (parseInt(e1) + parseInt(e2) == 2020) {
        res = parseInt(e1) * parseInt(e2);
      }
    });
  });

  return res;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var res = 0;

  data.forEach((e1) => {
    data.forEach((e2) => {
      data.forEach((e3) => {
        if (parseInt(e1) + parseInt(e2) + parseInt(e3) == 2020) {
          res = parseInt(e1) * parseInt(e2) * parseInt(e3);
        }
      });
    });
  });

  return res;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
