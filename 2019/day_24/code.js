function next(dots, pdots, ndots) {
  const skipCenter = pdots && ndots;
  const nd = [];
  nd.hash = 0;
  nd.count = 0;
  for (let i = 0; i < dots.length; i++) {
    nd[i] = [];
    for (let j = 0; j < dots[i].length; j++) {
      let n = 0;
      if (isBug(dots, i, j - 1, skipCenter)) n++;
      if (isBug(dots, i, j + 1, skipCenter)) n++;
      if (isBug(dots, i - 1, j, skipCenter)) n++;
      if (isBug(dots, i + 1, j, skipCenter)) n++;
      if (skipCenter) {
        if (i === 0 && isBug(pdots, 1, 2)) n++;
        if (i === 4 && isBug(pdots, 3, 2)) n++;
        if (j === 0 && isBug(pdots, 2, 1)) n++;
        if (j === 4 && isBug(pdots, 2, 3)) n++;
        if (i === 1 && j === 2) {
          for (let k = 0; k < dots[i].length; k++) {
            if (isBug(ndots, 0, k)) n++;
          }
        }
        if (i === 3 && j === 2) {
          for (let k = 0; k < dots[i].length; k++) {
            if (isBug(ndots, dots.length - 1, k)) n++;
          }
        }
        if (i === 2 && j === 1) {
          for (let k = 0; k < dots.length; k++) {
            if (isBug(ndots, k, 0)) n++;
          }
        }
        if (i === 2 && j === 3) {
          for (let k = 0; k < dots.length; k++) {
            if (isBug(ndots, k, dots[i].length - 1)) n++;
          }
        }
      }

      if (dots[i][j] === '#' && n !== 1) {
        nd[i][j] = '.';
      } else if (dots[i][j] === '.' && (n === 1 || n === 2)) {
        nd[i][j] = '#';
      } else {
        nd[i][j] = dots[i][j];
      }

      if (nd[i][j] === '#' && !(skipCenter && i === 2 && j === 2)) {
        nd.count++;
        nd.hash |= 1 << (i * dots[i].length + j);
      }
    }
  }
  return nd;
}

function isBug(dots, i, j, skipCenter) {
  if (skipCenter && i === 2 && j === 2) return false;
  return (
    i >= 0 &&
    i < dots.length &&
    j >= 0 &&
    j < dots[0].length &&
    dots[i][j] === '#'
  );
}

import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let dots = data;
  dots.hash = 0;
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      if (dots[i][j] === '#') {
        dots.hash |= 1 << (i * dots[i].length + j);
      }
    }
  }

  const cache = {};
  while (1) {
    if (cache[dots.hash]) break;
    cache[dots.hash] = 1;
    dots = next(dots);
  }

  return dots.hash;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let dots = data;
  dots.hash = 0;
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      if (dots[i][j] === '#') {
        dots.hash |= 1 << (i * dots[i].length + j);
      }
    }
  }

  const empty = Array(dots.length)
    .fill('.')
    .map((r) => Array(dots[0].length).fill('.'));

  let ds = [dots];
  let x = isTest ? 10 : 200;
  while (x--) {
    ds.unshift(empty);
    ds.push(empty);
    ds = ds.map((d, i) => {
      return next(
        d,
        i > 0 ? ds[i - 1] : empty,
        i < ds.length - 1 ? ds[i + 1] : empty
      );
    });

    while (ds[0].hash === 0) ds.shift();
    while (ds[ds.length - 1].hash === 0) ds.pop();
  }

  const result = ds.reduce((s, d, i) => {
    return s + d.count;
  }, 0);
  return result;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
