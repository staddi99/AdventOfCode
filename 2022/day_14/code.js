import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const run = (part, isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  let paths = data.map((line) =>
    line.split(' -> ').map((coords) => coords.split(',').map(Number))
  );

  let minX = Math.min(...paths.flat().map(([x, y]) => x));
  let maxX = Math.max(...paths.flat().map(([x, y]) => x));
  const minY = 0;
  const maxY = Math.max(...paths.flat().map(([x, y]) => y)) + (part === 2) * 2;

  if (part === 2) {
    const yRange = maxY - minY;
    minX = 500 - yRange;
    maxX = 500 + yRange;
  }

  const startX = 500 - minX;
  paths = paths.map((path) => path.map(([x, y]) => [x - minX, y]));
  maxX -= minX;
  minX = 0;

  const map = [...Array(maxY + 1).keys()].map((y) =>
    [...Array(maxX + 1)].fill(+(part === 2 && y === maxY))
  );

  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];
      const [dx, dy] = [Math.sign(x2 - x1), Math.sign(y2 - y1)];
      for (
        let [x, y] = [x1, y1];
        x !== x2 + dx || y !== y2 + dy;
        x += dx, y += dy
      ) {
        map[y][x] = 1;
      }
    }
  }

  let count = 0;
  outer: do {
    let [x, y] = [startX, 0];
    do {
      if (map[y]?.[x] === undefined || map[y][x] === 2) {
        break outer;
      }
      if (!map[y + 1]?.[x]) {
        y++;
        continue;
      }
      if (!map[y + 1]?.[x - 1]) {
        y++;
        x--;
        continue;
      }
      if (!map[y + 1]?.[x + 1]) {
        y++;
        x++;
        continue;
      }
      map[y][x] = 2;
      break;
    } while (true);
    count++;
  } while (true);
  return count;
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(2, isTest);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
