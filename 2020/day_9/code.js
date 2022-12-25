import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n').map(Number);
const inputArrayTest = inputSample.split('\n').map(Number);

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

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const preambleAmount = 25;
  const searchArray = [];
  let index = 0;
  while (index < preambleAmount) {
    searchArray.push(data[index]);
    index += 1;
  }

  while (index < data.length) {
    const currentNum = data[index];
    if (!isComplement(searchArray, currentNum)) {
      return currentNum;
    }

    searchArray.shift();
    searchArray.push(data[index]);
    index += 1;
  }
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let invalidNumber = partOne();
  let numList = [data[0], data[1]];
  let sum = data[0] + data[1];
  let index = 2;

  while (sum !== invalidNumber) {
    if (sum < invalidNumber) {
      numList.push(data[index]);
      sum += data[index];
      index += 1;
    } else {
      const oldNum = numList.shift();
      sum -= oldNum;
    }
  }

  return Math.max(...numList) + Math.min(...numList);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
