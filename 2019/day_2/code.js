import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(',');
const inputArrayTest = inputSample.split(',');

function compute(noun, verb, isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let array = [...data];
  array[1] = noun;
  array[2] = verb;
  for (var i = 0; i < array.length; i = i + 4) {
    if (array[i] == 99) break;
    if (array[i] == 1) {
      array[array[i + 3]] = parseInt(array[array[i + 1]]) + parseInt(array[array[i + 2]]);
    } else if (array[i] == 2) {
      array[array[i + 3]] = parseInt(array[array[i + 1]]) * parseInt(array[array[i + 2]]);
    }
  }
  return array[0];
}

export function partOne(isTest) {
  return compute(12, 2, isTest);
}

export function partTwo(isTest) {
  let nums = Array(100)
    .fill(0)
    .map((c, i) => i);

  for (let noun of nums) {
    for (let verb of nums) {
      let position_zero = compute(noun, verb, isTest);

      if (position_zero === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

// console.log("Part 1: " + partOne());
// console.log("Part 2: " + partTwo());