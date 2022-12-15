import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function findTrees(terrain, xSlope, ySlope) {
  const height = terrain.length;
  const width = terrain[0].length;

  let x = 0;
  let y = 0;
  let hitTrees = 0;
  while (y < height - 1) {
    y += ySlope;
    x += xSlope;
    if (x >= width) {
      x -= width;
    }
    if (terrain[y][x] === '#') {
      hitTrees += 1;
    }
  }
  return hitTrees;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return findTrees(data, 3, 1);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var res = 0;

  res =
    findTrees(data, 1, 1) *
    findTrees(data, 3, 1) *
    findTrees(data, 5, 1) *
    findTrees(data, 7, 1) *
    findTrees(data, 1, 2);

  return res;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
