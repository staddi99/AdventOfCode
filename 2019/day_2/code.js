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
  return array[0];
}

function partOne() {
  return compute(12, 2);
}

function partTwo() {
  let nums = Array(100)
    .fill(0)
    .map((c, i) => i);

  for (let noun of nums) {
    for (let verb of nums) {
      let position_zero = compute(noun, verb);

      if (position_zero === 19690720) {
        return 100 * noun + verb;
      }
    }
  }
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());