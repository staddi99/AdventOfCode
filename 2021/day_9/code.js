import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n').map((r) => r.split('').map(Number));
const inputArrayTest = inputSample
  .split('\n')
  .map((r) => r.split('').map(Number));

export function partOne(isTest) {
  let data = isTest ? inputArrayTest : inputArray;
  const isLowPoint = (data, x, y) => {
    const point = data[y][x];
    const top = y - 1 < 0 ? Number.MAX_SAFE_INTEGER : data[y - 1][x];
    const left = x - 1 < 0 ? Number.MAX_SAFE_INTEGER : data[y][x - 1];
    const bottom =
      y + 1 >= data.length ? Number.MAX_SAFE_INTEGER : data[y + 1][x];
    const right =
      x + 1 >= data[0].length ? Number.MAX_SAFE_INTEGER : data[y][x + 1];
    return [
      [top, left, right, bottom].reduce(
        (isLowPoint, adjacent) => isLowPoint && point < adjacent,
        true
      ),
      point,
      1 + point,
    ];
  };
  const riskSum = data.reduce((sum, row, y) => {
    const rowRisk = row.reduce((sum, cell, x) => {
      const [lowPoint, point, risk] = isLowPoint(data, x, y);
      if (lowPoint) return sum + risk;
      return sum;
    }, 0);
    return sum + rowRisk;
  }, 0);
  return riskSum;
}

export function partTwo(isTest) {
  let data = isTest ? inputArrayTest : inputArray;
  const findBasin = (data, x, y) => {
    if (x < 0) return 0;
    if (y < 0) return 0;
    if (x >= data[0].length) return 0;
    if (y >= data.length) return 0;
    if (data[y][x] === 9) return 0;

    data[y][x] = 9;
    return (
      1 +
      // Left
      findBasin(data, x - 1, y) +
      // Top
      findBasin(data, x, y - 1) +
      // Right
      findBasin(data, x + 1, y) +
      // Bottom
      findBasin(data, x, y + 1)
    );
  };
  const allBasins = data.reduce((all, row, y) => {
    const basins = row.reduce((all, cell, x) => {
      const size = findBasin(data, x, y);
      return [...all, size];
    }, []);
    return [...all, ...basins];
  }, []);
  const sorted = allBasins.sort((a, b) => b - a);
  return sorted.slice(0, 3).reduce((a, b) => a * b, 1);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
