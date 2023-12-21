import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function safeMod(a, b) {
  return a < 0 ? (b - (-a % b)) % b : a % b;
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const steps = isTest ? 6 : 64;

  let positions = new Set();
  const map = data.map((line, r) =>
    line.split('').map((char, c) => {
      if (char === 'S') {
        positions.add([r, c].join());
      }
      return +(char !== '#');
    })
  );

  for (let i = 0; i < steps; i++) {
    const nextPositions = new Set();
    for (const p of positions) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        if (map[r + dr]?.[c + dc]) {
          nextPositions.add([r + dr, c + dc].join());
        }
      }
    }
    positions = nextPositions;
  }
  return positions.size;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let positions = new Set();
  const map = data.map((line, r) =>
    line.split('').map((char, c) => {
      if (char === 'S') {
        positions.add([r, c].join());
      }
      return +(char !== '#');
    })
  );
  const size = map.length;

  const target = isTest ? 5000 : 26501365;
  const counts = [];
  for (let i = 0; i < target; i++) {
    const nextPositions = new Set();
    for (const p of positions) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        const r2 = r + dr;
        const c2 = c + dc;
        if (map[safeMod(r2, size)][safeMod(c2, size)]) {
          nextPositions.add([r2, c2].join());
        }
      }
    }

    positions = nextPositions;
    if ((i + 1) % size === target % size) {
      if (
        counts.length >= 3 &&
        positions.size - 2 * counts.at(-1) + counts.at(-2) ===
          counts.at(-1) - 2 * counts.at(-2) + counts.at(-3)
      ) {
        break;
      }
      counts.push(positions.size);
    }
  }

  const d2 = counts.at(-1) - 2 * counts.at(-2) + counts.at(-3);
  for (let i = counts.length * size + (target % size); i <= target; i += size) {
    counts.push(d2 + 2 * counts.at(-1) - counts.at(-2));
  }
  return counts.at(-1);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
