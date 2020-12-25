import input from './input.js';

const inputArray = input.split('\n').map(Number);

function partOne() {
  let key = 1;
  let target = 1;
  while (target !== inputArray[1]) {
    target = (target * 7) % 20201227;
    key = (key * inputArray[0]) % 20201227;
  }
  return key;
}

console.log('Part 1: ' + partOne());
