import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function fall(bricks, map) {
  const fallingBricks = new Set();
  let isFalling = true;
  while (isFalling) {
    isFalling = false;
    outer: for (let i = 0; i < bricks.length; i++) {
      const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            const below = map[z - 1][y][x];
            if (below && below !== i + 1) {
              continue outer;
            }
          }
        }
      }

      isFalling = true;
      fallingBricks.add(i);
      bricks[i] = [
        [x1, y1, z1 - 1],
        [x2, y2, z2 - 1],
      ];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            map[z][y][x] = 0;
            map[z - 1][y][x] = i + 1;
          }
        }
      }
    }
  }
  return fallingBricks.size;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const bricks = [];
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  for (const line of data) {
    const [[x1, y1, z1], [x2, y2, z2]] = line
      .split('~')
      .map((coord) => coord.split(',').map(Number));
    maxX = Math.max(maxX, x2);
    maxY = Math.max(maxY, y2);
    maxZ = Math.max(maxZ, z2);
    bricks.push([
      [x1, y1, z1],
      [x2, y2, z2],
    ]);
  }
  const map = [...Array(maxZ + 1)].map((_, z) =>
    [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(+!!z - 1))
  );
  for (let i = 0; i < bricks.length; i++) {
    const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map[z][y][x] = i + 1;
        }
      }
    }
  }

  fall(bricks, map);

  let part1 = bricks.length;
  let part2 = 0;
  for (let i = 0; i < bricks.length; i++) {
    const bricks2 = structuredClone(bricks);
    const [[x1, y1, z1], [x2, y2, z2]] = bricks2[i];

    const map2 = structuredClone(map);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map2[z][y][x] = 0;
        }
      }
    }

    const count = fall(bricks2, map2);
    part1 -= +!!count;
  }
  return part1;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const bricks = [];
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  for (const line of data) {
    const [[x1, y1, z1], [x2, y2, z2]] = line
      .split('~')
      .map((coord) => coord.split(',').map(Number));
    maxX = Math.max(maxX, x2);
    maxY = Math.max(maxY, y2);
    maxZ = Math.max(maxZ, z2);
    bricks.push([
      [x1, y1, z1],
      [x2, y2, z2],
    ]);
  }

  const map = [...Array(maxZ + 1)].map((_, z) =>
    [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(+!!z - 1))
  );
  for (let i = 0; i < bricks.length; i++) {
    const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map[z][y][x] = i + 1;
        }
      }
    }
  }

  fall(bricks, map);

  let part2 = 0;
  for (let i = 0; i < bricks.length; i++) {
    const bricks2 = structuredClone(bricks);
    const [[x1, y1, z1], [x2, y2, z2]] = bricks2[i];

    const map2 = structuredClone(map);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map2[z][y][x] = 0;
        }
      }
    }

    const count = fall(bricks2, map2);
    part2 += count;
  }
  return part2;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
