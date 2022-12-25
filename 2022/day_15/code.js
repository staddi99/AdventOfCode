import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const targetY = 2000000;
const maxCoord = 4000000;

const dist = (x, y, x2, y2) => {
  return Math.abs(x2 - x) + Math.abs(y2 - y);
};

const intersect = (p1, p2, p3, p4) => {
  // Line p1-p2 represented as a1x + b1y = c1
  const a1 = p2[1] - p1[1];
  const b1 = p1[0] - p2[0];
  const c1 = a1 * p1[0] + b1 * p1[1];

  // Line p3-p4 represented as a2x + b2y = c2
  const a2 = p4[1] - p3[1];
  const b2 = p3[0] - p4[0];
  const c2 = a2 * p3[0] + b2 * p3[1];

  const determinant = a1 * b2 - a2 * b1;

  const x = (b2 * c1 - b1 * c2) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;
  return [x, y].map(Math.round);
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const targetRow = {};
  for (const line of data) {
    const [x, y, xb, yb] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, xb, yb);
    if (yb === targetY) {
      targetRow[xb] = 0;
    }
    const dx = d - Math.abs(y - targetY);
    for (let x2 = x - dx; x2 <= x + dx; x2++) {
      if (targetRow[x2] !== 0) {
        targetRow[x2] = 1;
      }
    }
  }
  return Object.values(targetRow).reduce((acc, n) => acc + n);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const sensors = [];
  const diamonds = [];
  for (const line of data) {
    const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, bx, by);
    sensors.push([x, y, d]);
    diamonds.push([
      [x + (d + 1), y],
      [x, y + (d + 1)],
      [x - (d + 1), y],
      [x, y - (d + 1)],
    ]);
  }

  for (let i = 0; i < diamonds.length - 1; i++) {
    const d1 = diamonds[i];
    for (let j = i + 1; j < diamonds.length; j++) {
      const d2 = diamonds[j];
      for (let i2 = 0; i2 < 4; i2++) {
        for (const j2 of [i2 + 1, i2 + 3]) {
          const [xi, yi] = intersect(
            d1[i2],
            d1[(i2 + 1) % 4],
            d2[j2 % 4],
            d2[(j2 + 1) % 4]
          );
          if (
            [xi, yi].every((x) => x >= 0 && x <= maxCoord) &&
            sensors.every(([x, y, d]) => dist(x, y, xi, yi) > d)
          ) {
            return 4000000 * xi + yi;
          }
        }
      }
    }
  }
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
