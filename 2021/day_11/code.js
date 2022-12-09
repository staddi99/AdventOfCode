import input from './input.js';
import inputSample from './inputSample.js';

const data = (isTest) => {
  return (isTest ? inputSample : input)
    .split('\n')
    .map((line) => line.split('').map(Number));
};

const increaseCellValue = (input, row, column, flashed = new Set()) => {
  if (row < 0 || row >= input.length) return;
  if (column < 0 || column >= input[0].length) return;
  if (flashed.has(`${row}${column}`)) return;

  const value = input[row][column];
  const newValue = value + 1;
  input[row][column] = newValue;
  if (newValue <= 9) {
    return;
  }

  flashed.add(`${row}${column}`);
  input[row][column] = 0;
  increaseCellValue(input, row - 1, column - 1, flashed);
  increaseCellValue(input, row - 1, column, flashed);
  increaseCellValue(input, row - 1, column + 1, flashed);
  increaseCellValue(input, row, column - 1, flashed);
  increaseCellValue(input, row, column + 1, flashed);
  increaseCellValue(input, row + 1, column - 1, flashed);
  increaseCellValue(input, row + 1, column, flashed);
  increaseCellValue(input, row + 1, column + 1, flashed);
};

const iterate = (input) => {
  const flashed = new Set();
  for (let r = 0; r < input.length; r++) {
    const row = input[r];
    for (let c = 0; c < row.length; c++) {
      increaseCellValue(input, r, c, flashed);
    }
  }
  return flashed.size;
};

export function partOne(isTest) {
  let input = data(isTest);
  let totalFlashed = 0;
  for (let i = 0; i < 100; i++) {
    totalFlashed += iterate(input);
  }
  return totalFlashed;
}

export function partTwo(isTest) {
  let input = data(isTest);
  let step = 1;
  while (true) {
    const flashedCount = iterate(input);
    if (flashedCount === 100) {
      break;
    }
    step++;
  }
  return step;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
