import input from './input.js';

const inputArray = input.split('\n');

function locInAlphabet(char) {
  return char.charCodeAt(0) - 96 < 0
    ? char.charCodeAt(0) - 38
    : char.charCodeAt(0) - 96;
}

function partOne() {
  var sum = 0;
  inputArray.forEach((value) => {
    var a = value.slice(0, value.length / 2).split('');
    var b = value.slice(value.length / 2).split('');

    var com = a.filter((element) => b.includes(element))[0];
    sum += locInAlphabet(com);
  });
  return sum;
}

function partTwo() {
  var sum = 0;
  for (let index = 0; index < inputArray.length; index += 3) {
    var com = inputArray[index]
      .split('')
      .filter(
        (element) =>
          inputArray[index + 1].split('').includes(element) &&
          inputArray[index + 2].split('').includes(element)
      )[0];
    sum += locInAlphabet(com);
  }
  return sum;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
