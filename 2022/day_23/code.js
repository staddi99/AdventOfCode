import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const addProposal = [
  (map, x, y, proposals) => {
    if (!map[y - 1]?.[x] && !map[y - 1]?.[x - 1] && !map[y - 1]?.[x + 1]) {
      return proposals.push([[x, y].join(), [x, y - 1].join()]);
    }
  },
  (map, x, y, proposals) => {
    if (!map[y + 1]?.[x] && !map[y + 1]?.[x - 1] && !map[y + 1]?.[x + 1]) {
      return proposals.push([[x, y].join(), [x, y + 1].join()]);
    }
  },
  (map, x, y, proposals) => {
    if (!map[y - 1]?.[x - 1] && !map[y][x - 1] && !map[y + 1]?.[x - 1]) {
      return proposals.push([[x, y].join(), [x - 1, y].join()]);
    }
  },
  (map, x, y, proposals) => {
    if (!map[y - 1]?.[x + 1] && !map[y][x + 1] && !map[y + 1]?.[x + 1]) {
      return proposals.push([[x, y].join(), [x + 1, y].join()]);
    }
  },
];

const run = (part, isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  const map = data.map((line) => line.split('').map((char) => +(char === '#')));
  const nElves = map.flat().filter(Boolean).length;

  let round = 0;
  while (part === 2 || round < 10) {
    round++;
    let proposals = [];
    for (let y in map) {
      y = +y;
      for (let x in map[y]) {
        x = +x;
        if (map[y][x]) {
          if (neighbors.every(([dx, dy]) => !map[y + dy]?.[x + dx])) {
            continue;
          }
          for (let i = round; i < round + 4; i++) {
            if (addProposal[(i - 1) % 4](map, x, y, proposals)) {
              break;
            }
          }
        }
      }
    }

    const counts = proposals.reduce((acc, [from, to]) => {
      acc[to] = (acc[to] ?? 0) + 1;
      return acc;
    }, {});

    proposals = proposals.filter(([from, to]) => counts[to] === 1);

    if (!proposals.length) {
      break;
    }

    for (let [from, to] of proposals) {
      const [x1, y1] = from.split(',').map(Number);
      const [x2, y2] = to.split(',').map(Number);
      map[y1][x1] = 0;
      map[y2] = map[y2] ?? [];
      map[y2][x2] = 1;
    }
  }

  if (part === 2) {
    return round;
  } else {
    let yMin = 0;
    let yMax = 0;
    let xMin = 0;
    let xMax = 0;
    for (let y in map) {
      y = +y;
      for (let x in map[y]) {
        x = +x;
        if (map[y][x]) {
          yMin = Math.min(y, yMin);
          yMax = Math.max(y, yMax);
          xMin = Math.min(x, xMin);
          xMax = Math.max(x, xMax);
        }
      }
    }
    return (yMax - yMin + 1) * (xMax - xMin + 1) - nElves;
  }
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(2, isTest);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
