import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const corruptedKetScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const ket2bra = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const incompletedBraScore = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const run = (isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  let corruptedScore = 0,
    incompletedScores = [];

  data.map((line) => {
    let stack = [],
      corrupted = false;
    line.split('').some((c) => {
      if (']>})'.includes(c)) {
        if (stack.length == 0 || stack.pop() != ket2bra[c]) {
          corruptedScore += corruptedKetScore[c];
          corrupted = true;
          return true;
        }
      } else stack.push(c);
    });
    if (!corrupted)
      incompletedScores.push(
        stack
          .reverse()
          .reduce((score, c) => score * 5 + incompletedBraScore[c], 0)
      );
  });

  return [corruptedScore, incompletedScores.filter(num => !isNaN(num))];
};

export function partOne(isTest) {
  return run(isTest)[0];
}

export function partTwo(isTest) {
  const data = run(isTest)[1];
  return data.sort((a, b) => a - b)[
    Math.floor(data.length / 2)
  ];
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
