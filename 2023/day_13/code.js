import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

function rotate(map) {
  return map[0].map((_, j) => map.map((_, i) => map[i][j]));
}

function getErrors(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    count += +(a[i] !== b[i]);
  }
  return count;
}

function getReflection(map, maxErrors) {
  outer: for (let i = 0; i < map.length - 1; i++) {
    let nErrors = getErrors(map[i], map[i + 1]);
    if (nErrors <= maxErrors) {
      for (let j = i - 1; j >= 0; j--) {
        const delta = i - j;
        if (!map[j] || !map[i + 1 + delta]) {
          break;
        }
        nErrors += getErrors(map[j], map[i + 1 + delta]);
        if (nErrors > maxErrors) {
          continue outer;
        }
      }
      if (nErrors === maxErrors) {
        return i + 1;
      }
    }
  }
  return 0;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (let map of data) {
    map = map.split('\n').map((row) => row.split(''));
    const rot = rotate(map);

    const hReflect = getReflection(map, 0);
    const vReflect = getReflection(rot, 0);
    sum += hReflect * 100;
    sum += vReflect;
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (let map of data) {
    map = map.split('\n').map((row) => row.split(''));
    const rot = rotate(map);

    const hReflect = getReflection(map, 1);
    const vReflect = getReflection(rot, 1);
    sum += hReflect * 100;
    sum += vReflect;
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
