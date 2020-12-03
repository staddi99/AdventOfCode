import input from './input.js';

const inputArray = input.split(',');

function compute(noun, verb) {
  let array = [...inputArray];
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
  return array[0].toString();
}

function partOne() {
  return compute(12,2);
}

function partTwo() {
  return compute(80,18);
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());