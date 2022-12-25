import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function locInAlphabet(char) {
  return char.charCodeAt(0) - 96 < 0
    ? char.charCodeAt(0) - 38
    : char.charCodeAt(0) - 96;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sum = 0;
  data.forEach((value) => {
    var a = value.slice(0, value.length / 2).split('');
    var b = value.slice(value.length / 2).split('');

    var com = a.filter((element) => b.includes(element))[0];
    sum += locInAlphabet(com);
  });
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sum = 0;
  for (let index = 0; index < data.length; index += 3) {
    var com = data[index]
      .split('')
      .filter(
        (element) =>
          data[index + 1].split('').includes(element) &&
          data[index + 2].split('').includes(element)
      )[0];
    sum += locInAlphabet(com);
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
