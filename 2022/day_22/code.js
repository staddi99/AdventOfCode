import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

const facing = {
  0: { 1: 0, [-1]: 2 },
  1: { 0: 1 },
  [-1]: { 0: 3 },
};

const toDir = {
  0: { 1: '>', [-1]: '<' },
  1: { 0: 'v' },
  [-1]: { 0: '^' },
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let [map, path] = data;

  map = map
    .split('\n')
    .map((line) =>
      line.split('').map((char) => (char === '.' ? 0 : char === '#' ? 1 : 2))
    );

  path = path.match(/\d+|[A-Z]/g);

  let [x, y, [dy, dx]] = [map[0].indexOf(0), 0, [0, 1]];

  const printMap = map.map((line, i) =>
    line.map((char, j) =>
      i === y && j === x
        ? toDir[dy][dx]
        : char === 2
        ? ' '
        : char === 1
        ? '#'
        : '.'
    )
  );

  let count = 0;
  for (const instr of path) {
    if (/\d+/.test(instr)) {
      for (let i = 0; i < +instr; i++) {
        let [x2, y2] = [
          (x + dx + map[y].length) % map[y].length,
          (y + dy + map.length) % map.length,
        ];
        while (map[y2]?.[x2] === undefined || map[y2][x2] === 2) {
          [x2, y2] = [
            dx ? (x2 + dx + map[y2].length) % map[y2].length : x2,
            dy ? (y2 + dy + map.length) % map.length : y2,
          ];
        }
        if (map[y2][x2] === 0) {
          [x, y] = [x2, y2];
          printMap[y2][x2] = toDir[dy][dx];
        } else {
          break;
        }
      }
    } else {
      switch (instr) {
        case 'R':
          [dy, dx] = [dx, -dy || 0];
          break;
        case 'L':
          [dy, dx] = [-dx || 0, dy];
      }
      printMap[y][x] = toDir[dy][dx];
    }
  }
  return 1000 * (y + 1) + 4 * (x + 1) + facing[dy][dx];
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let [map, path] = data;

  map = map
    .split('\n')
    .map((line) =>
      line.split('').map((char) => (char === '.' ? 0 : char === '#' ? 1 : 2))
    );

  path = path.match(/\d+|[A-Z]/g);

  let [x, y, [dy, dx]] = [map[0].indexOf(0), 0, [0, 1]];

  const printMap = map.map((line, i) =>
    line.map((char, j) =>
      i === y && j === x
        ? toDir[dy][dx]
        : char === 2
        ? ' '
        : char === 1
        ? '#'
        : '.'
    )
  );

  let count = 0;
  for (const instr of path) {
    if (/\d+/.test(instr)) {
      for (let i = 0; i < +instr; i++) {
        let [x2, y2] = [x + dx, y + dy];
        if (map[y2]?.[x2] === undefined || map[y2][x2] === 2) {
          if (y2 === -1 && x2 < 100) {
            [x2, y2] = [0, x2 + 100];
            if (map[y2][x2] === 0) [dy, dx] = [0, 1];
          } else if (y2 === -1) {
            [x2, y2] = [x2 - 100, 199];
            if (map[y2][x2] === 0) [dy, dx] = [-1, 0];
          } else if (x2 === 150) {
            [x2, y2] = [99, 149 - y2];
            if (map[y2][x2] === 0) [dy, dx] = [0, -1];
          } else if (y2 === 50 && dy === 1) {
            [x2, y2] = [99, x2 - 50];
            if (map[y2][x2] === 0) [dy, dx] = [0, -1];
          } else if (x2 === 100 && y < 100) {
            [x2, y2] = [y2 + 50, 49];
            if (map[y2][x2] === 0) [dy, dx] = [-1, 0];
          } else if (x2 === 100) {
            [x2, y2] = [149, 149 - y2];
            if (map[y2][x2] === 0) [dy, dx] = [0, -1];
          } else if (y2 === 150 && dy === 1) {
            [x2, y2] = [49, x2 + 100];
            if (map[y2][x2] === 0) [dy, dx] = [0, -1];
          } else if (x2 === 50) {
            [x2, y2] = [y2 - 100, 149];
            if (map[y2][x2] === 0) [dy, dx] = [-1, 0];
          } else if (y2 === 200) {
            [x2, y2] = [x2 + 100, 0];
            if (map[y2][x2] === 0) [dy, dx] = [1, 0];
          } else if (x2 === -1 && y2 >= 150) {
            [x2, y2] = [y2 - 100, 0];
            if (map[y2][x2] === 0) [dy, dx] = [1, 0];
          } else if (x2 === -1) {
            [x2, y2] = [50, 149 - y2];
            if (map[y2][x2] === 0) [dy, dx] = [1, 0];
          } else if (y2 === 99) {
            [x2, y2] = [50, x2 + 50];
            if (map[y2][x2] === 0) [dy, dx] = [0, 1];
          } else if (y2 >= 50) {
            [x2, y2] = [y2 - 50, 100];
            if (map[y2][x2] === 0) [dy, dx] = [1, 0];
          } else {
            [x2, y2] = [0, 149 - y];
            if (map[y2][x2] === 0) [dy, dx] = [0, 1];
          }
        }
        if (map[y2][x2] === 0) {
          [x, y] = [x2, y2];
          printMap[y2][x2] = toDir[dy][dx];
        } else {
          break;
        }
      }
    } else {
      switch (instr) {
        case 'R':
          [dy, dx] = [dx, -dy || 0];
          break;
        case 'L':
          [dy, dx] = [-dx || 0, dy];
      }
      printMap[y][x] = toDir[dy][dx];
    }
  }
  return 1000 * (y + 1) + 4 * (x + 1) + facing[dy][dx];
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
