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

const run = (part, isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  const starts = [];
  let end;
  const map = data.map((line, i) =>
    line.split('').map((char, j) => {
      let elevation;
      if (char === 'S' || (part === 2 && char === 'a')) {
        elevation = 0;
        starts.push([i, j]);
      } else if (char === 'E') {
        elevation = 25;
        end = [i, j];
      } else {
        elevation = char.codePointAt(0) - 'a'.codePointAt(0);
      }
      return elevation;
    })
  );

  const queue = starts.map((start) => ({ pos: start, steps: 0 }));
  const seen = [];
  while (queue.length) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (seen[i]?.[j]) {
      continue;
    }
    if (i === end[0] && j === end[1]) {
      return steps;
      break;
    }
    for (const [di, dj] of dirs) {
      if (
        map[i + di]?.[j + dj] === undefined ||
        map[i + di][j + dj] > map[i][j] + 1 ||
        seen[i + di]?.[j + dj]
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    seen[i] = seen[i] ?? [];
    seen[i][j] = 1;
  }
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(2, isTest);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
