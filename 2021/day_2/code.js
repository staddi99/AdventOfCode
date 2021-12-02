import input from './input.js';

const inputArray = input.split('\n').map((x) => x.split(' '));

function partOne() {
  var pos = [0, 0];

  inputArray.forEach((command) => {
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

      default:
        break;
    }
  }, pos);

  return pos[0] * pos[1];
}

function partTwo() {
  var pos = [0, 0, 0];

  inputArray.forEach((command) => {
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

      default:
        break;
    }
  }, pos);

  return pos[0] * pos[1];
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
