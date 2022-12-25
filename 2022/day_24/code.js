import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const dirs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
  [0, 0],
];

const gcd = (...nums) => {
  const _gcd = (a, b) => {
    return !b ? a : gcd(b, a % b);
  };
  return nums.reduce((acc, n) => _gcd(acc, n));
};

const lcm = (...nums) => {
  return nums.reduce((acc, n) => (acc * n) / gcd(acc, n));
};

const mod = (a, b) => {
  while (a < 0) {
    a += b;
  }
  return a % b;
};

const timeTrip = (start, end, tStart, maps) => {
  const [yStart, xStart] = start;
  const [yEnd, xEnd] = end;
  const queue = [[yStart, xStart, tStart]];
  const seen = {};
  while (queue.length) {
    const [y, x, t] = queue.shift();
    if (seen[[y, x, t % maps.length].join()]) {
      continue;
    }
    seen[[y, x, t % maps.length].join()] = 1;

    if (y === yEnd && x === xEnd) {
      return t;
    }

    for (const [dy, dx] of dirs) {
      if (maps[(t + 1) % maps.length][y + dy]?.[x + dx] === 0) {
        queue.push([y + dy, x + dx, t + 1]);
      }
    }
  }
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const map = data.map((line) => line.split(''));

  const height = map.length - 2;
  const width = map[0].length - 2;
  const maps = [...Array(lcm(height, width))].map(() =>
    map.map((line) => line.map((char) => (char === '#' ? 1 : 0)))
  );

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      switch (map[y][x]) {
        case '^':
          for (let i = 0; i < maps.length; i++) {
            maps[i][mod(y - 1 - i, height) + 1][x] = 1;
          }
          break;
        case '>':
          for (let i = 0; i < maps.length; i++) {
            maps[i][y][mod(x - 1 + i, width) + 1] = 1;
          }
          break;
        case 'v':
          for (let i = 0; i < maps.length; i++) {
            maps[i][mod(y - 1 + i, height) + 1][x] = 1;
          }
          break;
        case '<':
          for (let i = 0; i < maps.length; i++) {
            maps[i][y][mod(x - 1 - i, width) + 1] = 1;
          }
          break;
      }
    }
  }

  let start = [0, map[0].indexOf('.')];
  let end = [map.length - 1, map[map.length - 1].indexOf('.')];
  let t = timeTrip(start, end, 0, maps);
  return t;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const map = data.map((line) => line.split(''));
  
  const height = map.length - 2;
  const width = map[0].length - 2;
  const maps = [...Array(lcm(height, width))].map(() =>
    map.map((line) => line.map((char) => (char === '#' ? 1 : 0)))
  );

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      switch (map[y][x]) {
        case '^':
          for (let i = 0; i < maps.length; i++) {
            maps[i][mod(y - 1 - i, height) + 1][x] = 1;
          }
          break;
        case '>':
          for (let i = 0; i < maps.length; i++) {
            maps[i][y][mod(x - 1 + i, width) + 1] = 1;
          }
          break;
        case 'v':
          for (let i = 0; i < maps.length; i++) {
            maps[i][mod(y - 1 + i, height) + 1][x] = 1;
          }
          break;
        case '<':
          for (let i = 0; i < maps.length; i++) {
            maps[i][y][mod(x - 1 - i, width) + 1] = 1;
          }
          break;
      }
    }
  }

  let start = [0, map[0].indexOf('.')];
  let end = [map.length - 1, map[map.length - 1].indexOf('.')];
  let t = timeTrip(start, end, 0, maps);

  t = timeTrip(end, start, t, maps);
  t = timeTrip(start, end, t, maps);
  return t;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
