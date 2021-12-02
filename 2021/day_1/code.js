import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  var inc = 0;
  inputArray.forEach((value, i, array) => {
    if (parseInt(value) > parseInt(array[i - 1])) inc++;
  }, inc);
  return inc;
}

function partTwo() {
  var inc = 0;

  inputArray
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

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
