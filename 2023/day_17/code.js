import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

function solve(data, minMomentum, maxMomentum) {
  const map = data.map((line) => line.split('').map(Number));

  const queue = [
    [1, 0, 0, DIR.D, 1],
    [0, 1, 0, DIR.R, 1],
  ];
  const seen = map.map((row) => row.map(() => ({})));
  while (queue.length) {
    const [i, j, heat, dir, momentum] = queue.shift();
    const key = dir.concat(momentum).join();
    if (!map[i]?.[j] || seen[i][j][key]) {
      continue;
    }

    seen[i][j][key] = 1;

    if (
      i === map.length - 1 &&
      j === map[0].length - 1 &&
      momentum >= minMomentum
    ) {
      return heat + map[i][j];
      break;
    }

    const nextDirs = [];
    switch (momentum >= minMomentum && dir) {
      case DIR.U:
      case DIR.D:
        nextDirs.push(DIR.L);
        nextDirs.push(DIR.R);
        break;
      case DIR.L:
      case DIR.R:
        nextDirs.push(DIR.U);
        nextDirs.push(DIR.D);
    }
    if (momentum < maxMomentum) {
      nextDirs.push(dir);
    }
    for (const nextDir of nextDirs) {
      const [di, dj] = nextDir;
      queue.push([
        i + di,
        j + dj,
        heat + map[i][j],
        nextDir,
        1 + +(dir === nextDir) * momentum,
      ]);
    }
    queue.sort((a, b) => a[2] - b[2]);
  }
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  
  return solve(data, 0, 3);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  return solve(data, 4, 10);;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
