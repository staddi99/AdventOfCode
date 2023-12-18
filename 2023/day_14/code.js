import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const directions = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

const printGrid = (grid) => {
  let print = '';
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      print += grid[y][x];
    }
    print += '\n';
  }
  console.log(print);
};

const slideGrid = (grid, direction) => {
  if (direction == directions.NORTH) {
    for (let x = 0; x < grid[0].length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] == 'O') {
          let current = y - 1;
          while (current >= 0 && !grid[current][x].match(/[O#]/)) {
            let temp = grid[current + 1][x];
            grid[current + 1][x] = grid[current][x];
            grid[current][x] = temp;

            current--;
          }
        }
      }
    }
  } else if (direction == directions.SOUTH) {
    for (let x = 0; x < grid[0].length; x++) {
      for (let y = grid.length - 1; y >= 0; y--) {
        if (grid[y][x] == 'O') {
          let current = y + 1;
          while (current < grid.length && !grid[current][x].match(/[O#]/)) {
            let temp = grid[current - 1][x];
            grid[current - 1][x] = grid[current][x];
            grid[current][x] = temp;

            current++;
          }
        }
      }
    }
  } else if (direction == directions.WEST) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == 'O') {
          let current = x - 1;
          while (current >= 0 && !grid[y][current].match(/[O#]/)) {
            let temp = grid[y][current + 1];
            grid[y][current + 1] = grid[y][current];
            grid[y][current] = temp;

            current--;
          }
        }
      }
    }
  } else if (direction == directions.EAST) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = grid[y].length - 1; x >= 0; x--) {
        if (grid[y][x] == 'O') {
          let current = x + 1;
          while (current < grid[y].length && !grid[y][current].match(/[O#]/)) {
            let temp = grid[y][current - 1];
            grid[y][current - 1] = grid[y][current];
            grid[y][current] = temp;

            current++;
          }
        }
      }
    }
  }

  return grid;
};

const hash = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const grid = slideGrid(
    data.map((line) => line.split('')),
    directions.NORTH
  );

  let sum = 0;
  for (let y = grid.length - 1; y >= 0; y--) {
    sum += grid[y].filter((char) => char == 'O').length * (grid.length - y);
  }

  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let grid = data.map((line) => line.split(''));
  let cycleTest = structuredClone(grid);

  let previousStates = {};
  let currentCycle = 0;
  while (true) {
    let current = hash(cycleTest.map((line) => line.join('')).join(''));
    if (previousStates[current] != null) break;
    else previousStates[current] = currentCycle;

    cycleTest = slideGrid(cycleTest, directions.NORTH);
    cycleTest = slideGrid(cycleTest, directions.WEST);
    cycleTest = slideGrid(cycleTest, directions.SOUTH);
    cycleTest = slideGrid(cycleTest, directions.EAST);

    currentCycle++;
  }

  let cycleStart =
    previousStates[hash(cycleTest.map((line) => line.join('')).join(''))];
  for (
    let i = 0;
    i < cycleStart + ((1000000000 - cycleStart) % (currentCycle - cycleStart));
    i++
  ) {
    grid = slideGrid(grid, directions.NORTH);
    grid = slideGrid(grid, directions.WEST);
    grid = slideGrid(grid, directions.SOUTH);
    grid = slideGrid(grid, directions.EAST);
  }

  let sum = 0;
  for (let y = grid.length - 1; y >= 0; y--) {
    sum += grid[y].filter((char) => char == 'O').length * (grid.length - y);
  }

  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
