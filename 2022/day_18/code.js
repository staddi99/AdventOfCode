import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const dirs = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, -1],
  [0, -1, 0],
  [-1, 0, 0],
];

const toCoords = (key) => {
  return key.split(',').map(Number);
};

const run = (part, isTest) => {
  const cubes = new Set(isTest ? inputArrayTest : inputArray);
  const neighbors = new Set();
  let nFaces = 0;
  for (const [x, y, z] of [...cubes].map(toCoords)) {
    for (const [dx, dy, dz] of dirs) {
      const key = [x + dx, y + dy, z + dz].join();
      if (!cubes.has(key)) {
        nFaces++;
        neighbors.add(key);
      }
    }
  }
  if (part === 1) return nFaces;

  const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = [0, 1, 2].map((i) =>
    [Math.min, Math.max].map((f) =>
      f(...[...cubes].map(toCoords).map((coords) => coords[i]))
    )
  );

  const interior = new Set(cubes);
  for (const key of neighbors) {
    if (interior.has(key)) {
      continue;
    }

    const seen = new Set([key]);
    const queue = [key];

    outer: {
      while (queue.length) {
        const [x, y, z] = toCoords(queue.shift());
        for (const [dx, dy, dz] of dirs) {
          const [x2, y2, z2] = [x + dx, y + dy, z + dz];
          const key2 = [x2, y2, z2].join();
          if (
            x2 < xMin ||
            x2 > xMax ||
            y2 < yMin ||
            y2 > yMax ||
            z2 < zMin ||
            z2 > zMax
          ) {
            break outer;
          }

          if (interior.has(key2)) {
            continue;
          }

          if (!seen.has(key2)) {
            seen.add(key2);
            queue.push(key2);
          }
        }
      }

      for (const key of seen) {
        interior.add(key);
      }
    }
  }

  nFaces = 0;
  for (const [x, y, z] of [...interior].map(toCoords)) {
    for (const [dx, dy, dz] of dirs) {
      const key = [x + dx, y + dy, z + dz].join();
      if (!interior.has(key)) {
        nFaces++;
      }
    }
  }
  if (part === 2) return nFaces;
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(2, isTest);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
