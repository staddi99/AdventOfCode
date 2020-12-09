import input from './input.js';

const inputArray = input.split('\n').map(Number);

function isComplement(searchArray, currentNum) {
  const comp = new Map();

  for (let i = 0; i < searchArray.length; i++) {
    const num = searchArray[i];
    if (comp.has(num)) {
      return true;
    }
    comp.set(currentNum - num, true);
  }
  return false;
}

function partOne() {
  const preambleAmount = 25;
  const searchArray = [];
  let index = 0;
  while (index < preambleAmount) {
    searchArray.push(inputArray[index]);
    index += 1;
  }

  while (index < inputArray.length) {
    const currentNum = inputArray[index];
    if (!isComplement(searchArray, currentNum)) {
      return currentNum;
    }

    searchArray.shift();
    searchArray.push(inputArray[index]);
    index += 1;
  }
}

function partTwo() {
  let invalidNumber = partOne();
  let numList = [inputArray[0], inputArray[1]];
  let sum = inputArray[0] + inputArray[1];
  let index = 2;

  while (sum !== invalidNumber) {
    if (sum < invalidNumber) {
      numList.push(inputArray[index]);
      sum += inputArray[index];
      index += 1;
    } else {
      const oldNum = numList.shift();
      sum -= oldNum;
    }
  }

  return Math.max(...numList) + Math.min(...numList);
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());