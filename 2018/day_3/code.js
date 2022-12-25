import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n').map((str) => {
  const [id, posX, posY, sizeX, sizeY] = str
    .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
    .slice(1)
    .map((n) => parseInt(n));
  return {
    id,
    pos: {
      x: posX,
      y: posY,
    },
    size: {
      x: sizeX,
      y: sizeY,
    },
  };
});
const inputArrayTest = inputSample.split('\n').map((str) => {
  const [id, posX, posY, sizeX, sizeY] = str
    .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/)
    .slice(1)
    .map((n) => parseInt(n));
  return {
    id,
    pos: {
      x: posX,
      y: posY,
    },
    size: {
      x: sizeX,
      y: sizeY,
    },
  };
});

const getOverlappingCoords = (square1, square2) => {
  const overlapping = [];
  for (let x = square1.pos.x; x < square1.pos.x + square1.size.x; x++) {
    for (let y = square1.pos.y; y < square1.pos.y + square1.size.y; y++) {
      if (
        x >= square2.pos.x &&
        x < square2.pos.x + square2.size.x &&
        y >= square2.pos.y &&
        y < square2.pos.y + square2.size.y
      ) {
        overlapping.push({ x, y });
      }
    }
  }
  return overlapping;
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const squares = data;
  const overlapping = new Set();

  squares.forEach((square1) =>
    squares
      .filter((square2) => square2 !== square1)
      .forEach((square2) =>
        getOverlappingCoords(square1, square2).forEach((coord) =>
          overlapping.add(`${coord.x},${coord.y}`)
        )
      )
  );

  return overlapping.size;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const squares = data;
  return squares.find((square1) =>
    squares
      .filter((square2) => square2 !== square1)
      .every((square2) => getOverlappingCoords(square1, square2).length === 0)
  ).id;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
