import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n').map((x) => x.split(' '));
const inputArrayTest = inputSample.split('\n').map((x) => x.split(' '));

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var pos = [0, 0];

  data.forEach((command) => {
    switch (command[0]) {
      case 'forward':
        pos[0] += parseInt(command[1]);
        break;

      case 'up':
        pos[1] -= parseInt(command[1]);
        break;

      case 'down':
        pos[1] += parseInt(command[1]);
        break;
    }
  }, pos);

  return pos[0] * pos[1];
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var pos = [0, 0, 0];

  data.forEach((command) => {
    switch (command[0]) {
      case 'forward':
        pos[0] += parseInt(command[1]);
        pos[1] += pos[2] * command[1];
        break;

      case 'up':
        pos[2] -= parseInt(command[1]);
        break;

      case 'down':
        pos[2] += parseInt(command[1]);
        break;
    }
  }, pos);

  return pos[0] * pos[1];
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
