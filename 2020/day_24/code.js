import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const directions = ['e', 'se', 'sw', 'w', 'nw', 'ne'];

const offsets = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

function move(line) {
  let x = 0;
  let y = 0;
  while (line.length > 0) {
    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i];
      if (line.startsWith(dir)) {
        const offset = offsets[i];
        x += offset[0];
        y += offset[1];
        line = line.slice(dir.length);
        break;
      }
    }
  }
  return [x, y];
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const flipped = {};
  data.forEach((line) => {
    const pos = move(line).join(',');
    flipped[pos] = !flipped[pos];
  });
  return Object.values(flipped).filter((c) => c).length;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let i;

  const flipped = {};
  data.forEach((line) => {
    const pos = move(line).join(',');
    flipped[pos] = !flipped[pos];
  });

  function countAdjacents(pos) {
    const adjacents = getAdjacents(pos);
    return adjacents.map((p) => !!flipped[p]).filter((c) => c).length;
  }

  function shouldFlip(pos) {
    const count = countAdjacents(pos);
    return (
      (flipped[pos] && (count === 0 || count > 2)) ||
      (!flipped[pos] && count === 2)
    );
  }

  function getAdjacents(pos) {
    pos = pos.split(',');
    const [x, y] = pos;
    return offsets
      .map((offset) => [parseFloat(x) + offset[0], parseFloat(y) + offset[1]])
      .map((pos) => pos.join(','));
  }

  function dailyFlip() {
    let toFlip = [];
    for (let pos in flipped) {
      [pos, ...getAdjacents(pos)].forEach((p) => {
        if (shouldFlip(p)) toFlip.push(p);
      });
    }

    toFlip = [...new Set(toFlip)];
    toFlip.forEach((pos) => (flipped[pos] = !flipped[pos]));
  }

  for (i = 1; i <= 100; i++) {
    dailyFlip();
  }

  return Object.values(flipped).filter((c) => c).length;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
