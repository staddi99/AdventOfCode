import stringMath from 'string-math';
import input from './input.js';

const inputArray = input.split('\n');

const re = /\([^()]+\)/;
const re2 = /\d+\s\+\s\d+/;

function calc(l) {
  // console.log(l);
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

function partOne() {
  let result = 0;

  for (let line of inputArray) {
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

function partTwo() {
  let result = 0;

  for (let line of inputArray) {
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

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
