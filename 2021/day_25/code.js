import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  let map = inputArray.map((row) => row.split(''));
  let step = 0;
  let hasMoved = true;
  while (hasMoved) {
    step++;
    hasMoved = false;

    let nextMap = map.map((row) => row.map((c) => c));
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const char = map[i][j];
        if (char === '>') {
          const nextJ = (j + 1) % map[i].length;
          if (map[i][nextJ] === '.') {
            nextMap[i][nextJ] = '>';
            nextMap[i][j] = '.';
            hasMoved = true;
          }
        }
      }
    }
    map = nextMap;

    nextMap = map.map((row) => row.map((c) => c));
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const char = map[i][j];
        if (char === 'v') {
          const nextI = (i + 1) % map.length;
          if (map[nextI][j] === '.') {
            nextMap[nextI][j] = 'v';
            nextMap[i][j] = '.';
            hasMoved = true;
          }
        }
      }
    }
    map = nextMap;
  }
  return step;
}

function partTwo() {
  return;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
