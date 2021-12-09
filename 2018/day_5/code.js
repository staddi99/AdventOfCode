import input from './input.js';

const obj = ['String'].reduce(
  (obj, name) => {
    obj[`is${name}`] = (a) => toString.call(a) === `[object ${name}]`;
    return obj;
  },
  {
    isGenerator: (a) =>
      a instanceof
      function* () {
        yield;
      }.constructor,
  }
);
const { isString } = obj;

const range = (start, stop) => {
  const result = [];
  if (isString(start)) {
    for (let i = start.charCodeAt(0); i <= stop.charCodeAt(0); i++) {
      result.push(String.fromCharCode(i));
    }
  } else {
    for (let i = start; i <= stop; i++) {
      result.push(i);
    }
  }
  return result;
};

const runRegex = (input) => {
  const pairs = [];
  range('A', 'Z').forEach((char) => {
    pairs.push(char + char.toLowerCase());
    pairs.push(char.toLowerCase() + char);
  });
  const regex = new RegExp(pairs.join('|'));

  let lastLength;
  do {
    lastLength = input.length;
    input = input.replace(regex, '');
  } while (lastLength !== input.length);
  return input;
};

function partOne() {
  return runRegex(input).length;
}

function partTwo() {
  const lengths = [];
  for (const char of range('A', 'Z')) {
    lengths.push(runRegex(input.replace(new RegExp(char, 'ig'), '')).length);
  }
  return Math.min(...lengths);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
