import input from './input.js';

const inputArray = input.split('\n');

var resArray = [];
var count = 0;
inputArray.forEach((value) => {
  if (!isNaN(parseInt(value))) {
    count += parseInt(value);
  } else {
    resArray.push(count);
    count = 0;
  }
}, count);
resArray.sort((a, b) => b - a);

function partOne() {
  return resArray[0];
}

function partTwo() {
  return resArray[0] + resArray[1] + resArray[2];
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
