import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const directions = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  MOVEMENTS: [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ],
};

const pipeMovement = {
  '|': (direction) => direction,
  '-': (direction) => direction,
  S: (direction) => direction,
  L: (direction) =>
    direction == directions.LEFT ? directions.UP : directions.RIGHT,
  J: (direction) =>
    direction == directions.RIGHT ? directions.UP : directions.LEFT,
  F: (direction) =>
    direction == directions.LEFT ? directions.DOWN : directions.RIGHT,
  7: (direction) =>
    direction == directions.RIGHT ? directions.DOWN : directions.LEFT,
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const grid = data.map((line) => line.split(''));

  let current = { x: 0, y: 0, direction: 0 };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == 'S') {
        current.x = x;
        current.y = y;

        if (grid[y][x - 1].match(/[FL-]/)) current.direction = directions.LEFT;
        if (grid[y][x + 1].match(/[7J-]/)) current.direction = directions.RIGHT;
        if (grid[y - 1][x].match(/[F7|]/)) current.direction = directions.UP;
        if (grid[y + 1][x].match(/[LJ|]/)) current.direction = directions.DOWN;
      }
    }
  }

  let loop = new Set();
  do {
    loop.add(`${current.x},${[current.y]}`);
    current.x += directions.MOVEMENTS[current.direction].x;
    current.y += directions.MOVEMENTS[current.direction].y;
    current.direction = pipeMovement[grid[current.y][current.x]](
      current.direction
    );
  } while (grid[current.y][current.x] != 'S');

  return loop.size / 2;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const grid = data.map((line) => line.split(''));

  let current = { x: 0, y: 0, direction: 0 };
  let isStartingNorth = false,
    isStartingSouth = false;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == 'S') {
        current.x = x;
        current.y = y;

        if (grid[y][x - 1].match(/[FL-]/)) current.direction = directions.LEFT;
        if (grid[y][x + 1].match(/[7J-]/)) current.direction = directions.RIGHT;

        if (grid[y - 1][x].match(/[F7|]/)) {
          current.direction = directions.UP;
          isStartingNorth = true;
        }

        if (grid[y + 1][x].match(/[LJ|]/)) {
          current.direction = directions.DOWN;
          isStartingSouth = true;
        }
      }
    }
  }

  let loop = new Set();
  do {
    loop.add(`${current.x},${[current.y]}`);
    current.x += directions.MOVEMENTS[current.direction].x;
    current.y += directions.MOVEMENTS[current.direction].y;
    current.direction = pipeMovement[grid[current.y][current.x]](
      current.direction
    );
  } while (grid[current.y][current.x] != 'S');

  let area = 0;
  for (let y = 0; y < grid.length; y++) {
    let northCount = 0,
      southCount = 0;
    for (let x = 0; x < grid[y].length; x++) {
      if (loop.has(`${x},${y}`)) {
        if (grid[y][x].match(/[LJ|]/)) northCount++;
        if (grid[y][x].match(/[F7|]/)) southCount++;

        if (grid[y][x] == 'S') {
          if (isStartingNorth) northCount++;
          if (isStartingSouth) southCount++;
        }
        continue;
      }

      if (northCount % 2 == 1 || southCount % 2 == 1) area++;
    }
  }

  return area;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
