import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function partOne(isTest) {
  const data = isTest
    ? inputArrayTest.slice().map((line) => line.split(''))
    : inputArray.slice().map((line) => line.split(''));

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (/[^\d^.]/.test(data[i][j])) {
        for (let [di, dj] of dirs) {
          if (/\d/.test(data[i + di][j + dj])) {
            const digits = [data[i + di][j + dj]];
            for (let j2 = j + dj - 1; j2 >= 0; j2--) {
              if (/\d/.test(data[i + di][j2])) {
                digits.unshift(data[i + di][j2]);
                data[i + di][j2] = '.';
              } else {
                break;
              }
            }
            for (let j2 = j + dj + 1; j2 < data[i + di].length; j2++) {
              if (/\d/.test(data[i + di][j2])) {
                digits.push(data[i + di][j2]);
                data[i + di][j2] = '.';
              } else {
                break;
              }
            }
            sum += +digits.join('');
          }
        }
      }
    }
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest
    ? inputArrayTest.slice().map((line) => line.split(''))
    : inputArray.slice().map((line) => line.split(''));

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (/\*/.test(data[i][j])) {
        const gears = [];
        for (let [di, dj] of dirs) {
          if (/\d/.test(data[i + di][j + dj])) {
            const digits = [data[i + di][j + dj]];
            for (let j2 = j + dj - 1; j2 >= 0; j2--) {
              if (/\d/.test(data[i + di][j2])) {
                digits.unshift(data[i + di][j2]);
                data[i + di][j2] = '.';
              } else {
                break;
              }
            }
            for (let j2 = j + dj + 1; j2 < data[i + di].length; j2++) {
              if (/\d/.test(data[i + di][j2])) {
                digits.push(data[i + di][j2]);
                data[i + di][j2] = '.';
              } else {
                break;
              }
            }
            gears.push(+digits.join(''));
          }
        }
        if (gears.length === 2) {
          sum += gears[0] * gears[1];
        }
      }
    }
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
