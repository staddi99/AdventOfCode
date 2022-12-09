import input from './input.js';
import {inputSample1, inputSample2} from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest1 = inputSample1.split('\n');
const inputArrayTest2 = inputSample2.split('\n');

const toDir = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const run = (part, test) => {
  const dists = [...Array(part === 2 ? 10 : 2)].map(() => [0, 0]);
  const tail = dists.at(-1);
  const visited = { 0: { 0: 1 } };
  const data = test ? (part === 1) ? inputArrayTest1 : inputArrayTest2 : inputArray;

  for (const line of data) {
    let [char, n] = line.split(' ');
    const dir = toDir[char];
    n = +n;

    for (let i = 0; i < n; i++) {
      let dist = dists[0];
      dist[0] += dir[0];
      dist[1] += dir[1];

      for (let j = 1; j < dists.length; j++) {
        const dist2 = dists[j];
        if (dist.some((x) => Math.abs(x) >= 2)) {
          const dir2 = dist.map(Math.sign);
          dist2[0] += dir2[0];
          dist2[1] += dir2[1];
          dist[0] -= dir2[0];
          dist[1] -= dir2[1];
        }
        dist = dist2;
      }
      visited[tail[0]] = visited[tail[0]] ?? {};
      visited[tail[0]][tail[1]] = 1;
    }
  }
  return Object.values(visited)
    .map((row) => Object.values(row))
    .flat()
    .reduce((acc, n) => acc + n);
};

export function partOne(test) {
  return run(1, test);
}

export function partTwo(test) {
  return run(2, test);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
