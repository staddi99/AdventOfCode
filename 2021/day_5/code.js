import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const run = (isTest) =>
  (isTest ? inputArrayTest : inputArray).map((line) =>
    line
      .split(' -> ')
      .map((pair) => pair.split(',').map((val) => parseInt(val, 10)))
  );

export function partOne(isTest) {
  const pairs = run(isTest);
  const spread = (pairs) => {
    const result = [];
    for (let pair of pairs) {
      const [begin, end] = pair;
      const [x1, y1] = begin;
      const [x2, y2] = end;
      if (x1 != x2 && y1 != y2) continue;
      if (x1 !== x2) {
        const row = [];
        const min = x1 < x2 ? x1 : x2;
        const max = x1 < x2 ? x2 : x1;
        for (let i = min; i <= max; i++) {
          row.push([i, y1]);
        }
        result.push(row);
      } else {
        const row = [];
        const min = y1 < y2 ? y1 : y2;
        const max = y1 < y2 ? y2 : y1;
        for (let i = min; i <= max; i++) {
          row.push([x1, i]);
        }
        result.push(row);
      }
    }
    return result;
  };

  const intersectCount = spread(pairs)
    .flat()
    .map((i) => i.join(','))
    .reduce((acc, item) => {
      if (!acc[item]) acc[item] = 0;
      acc[item]++;
      return acc;
    }, {});

  return Object.keys(intersectCount).filter((key) => intersectCount[key] > 1)
    .length;
}

export function partTwo(isTest) {
  const pairs = run(isTest);
  const spread2 = (pairs) => {
    const result = [];
    for (let pair of pairs) {
      const [begin, end] = pair;
      const [x1, y1] = begin;
      const [x2, y2] = end;

      // Vertical
      if (x1 === x2 && y1 !== y2) {
        const row = [];
        const min = y1 < y2 ? y1 : y2;
        const max = y1 < y2 ? y2 : y1;
        for (let i = min; i <= max; i++) {
          row.push([x1, i]);
        }
        result.push(row);
      }

      // Horizontal
      if (y1 === y2 && x1 !== x2) {
        const row = [];
        const min = x1 < x2 ? x1 : x2;
        const max = x1 < x2 ? x2 : x1;
        for (let i = min; i <= max; i++) {
          row.push([i, y1]);
        }
        result.push(row);
      }
      // Diagonal
      if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        const row = [];
        const minX = x1 < x2 ? x1 : x2;
        const maxX = x1 < x2 ? x2 : x1;

        const startY = minX === x1 ? y1 : y2;
        const endY = minX === x1 ? y2 : y1;
        const direction = startY - endY < 0 ? 1 : -1;
        for (let i = minX; i <= maxX; i++) {
          row.push([i, startY + (i - minX) * direction]);
        }
        result.push(row);
      }
    }
    return result;
  };

  const intersectCount2 = spread2(pairs)
    .flat()
    .map((i) => i.join(','))
    .reduce((acc, item) => {
      if (!acc[item]) acc[item] = 0;
      acc[item]++;
      return acc;
    }, {});
  const keys = Object.keys(intersectCount2).filter(
    (key) => intersectCount2[key] > 1
  );

  return Object.keys(intersectCount2).filter((key) => intersectCount2[key] > 1)
    .length;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
