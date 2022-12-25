import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const re = /\([^()]+\)/;
const re2 = /\d+\s\+\s\d+/;

function calc(l) {
  const parts = l.split(' ');
  let res = +parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    switch (parts[i]) {
      case '+':
        res += +parts[i + 1];
        break;
      case '*':
        res *= +parts[i + 1];
        break;
    }
  }
  return res;
}

function calc2(line) {
  let m;
  while ((m = re2.exec(line))) {
    const parVal = calc(m[0].substr(0, m[0].length));
    line =
      line.substr(0, m.index) + parVal + line.substr(m.index + m[0].length);
    // console.log(line);
  }
  return calc(line);
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let result = 0;

  for (let line of data) {
    let m;
    while ((m = re.exec(line))) {
      const parVal = calc(m[0].substr(1, m[0].length - 2));
      line =
        line.substr(0, m.index) + parVal + line.substr(m.index + m[0].length);
      // console.log(line);
    }
    result += calc(line);
  }

  return result;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let result = 0;

  for (let line of data) {
    let m;
    while ((m = re.exec(line))) {
      const parVal = calc2(m[0].substr(1, m[0].length - 2));
      line =
        line.substr(0, m.index) + parVal + line.substr(m.index + m[0].length);
      // console.log(line);
    }
    result += calc2(line);
  }

  return result;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
