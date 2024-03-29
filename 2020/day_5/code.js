import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const binaryLines = data.map((line) => {
    return line
      .replace(/F/g, '0')
      .replace(/B/g, '1')
      .replace(/L/g, '0')
      .replace(/R/g, '1');
  });

  binaryLines.sort().reverse();

  const row = parseInt(binaryLines[0].slice(0, 7), 2);
  const column = parseInt(binaryLines[0].slice(7, 10), 2);

  return row * 8 + column;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const binaryLines = data.map((line) => {
    return line
      .replace(/F/g, '0')
      .replace(/B/g, '1')
      .replace(/L/g, '0')
      .replace(/R/g, '1');
  });

  binaryLines.sort();

  let previousSeatId = null;

  for (const binaryLine of binaryLines) {
    const row = parseInt(binaryLine.slice(0, 7), 2);
    const column = parseInt(binaryLine.slice(7, 10), 2);

    const seatId = row * 8 + column;

    if (previousSeatId !== null && seatId !== previousSeatId + 1) {
      return seatId - 1;
    }

    previousSeatId = seatId;
  }
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
