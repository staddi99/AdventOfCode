import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const minTotal = (risks, start, end) => {
  const queue = [[start, 0]];
  const seen = risks.map((row) => row.map(() => false));
  while (queue.length > 0) {
    const [[i, j], total] = queue.shift();
    if (i === end[0] && j === end[1]) {
      return total;
    }

    for (const [di, dj] of dirs) {
      const ii = i + di;
      const jj = j + dj;
      if (risks[ii]?.[jj] === undefined || seen[ii][jj]) {
        continue;
      }

      seen[ii][jj] = true;
      queue.push([[ii, jj], total + risks[ii][jj]]);
    }
    queue.sort(([, aTotal], [, bTotal]) => aTotal - bTotal);
  }
};

const run = (nTimes, isTest) => {
  const risks = (isTest ? inputArrayTest : inputArray).map((line) =>
    line.split('').map(Number)
  );

  const allRisks = [];
  for (let i = 0; i < nTimes * risks.length; i++) {
    const row = [];
    for (let j = 0; j < nTimes * risks[0].length; j++) {
      row.push(
        ((risks[i % risks.length][j % risks[0].length] +
          ~~(i / risks.length) +
          ~~(j / risks[0].length) +
          8) %
          9) +
          1
      );
    }
    allRisks.push(row);
  }

  return minTotal(
    allRisks,
    [0, 0],
    [allRisks.length - 1, allRisks[0].length - 1]
  );
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(5, isTest);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
