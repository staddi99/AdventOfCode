import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const calc = (input) => {
  const sizes = { '/': 0 };
  const paths = ['/'];
  const lines = input;
  for (let i = 1; i < lines.length; i++) {
    const [, cmd, dir] = lines[i].split(' ');
    if (cmd === 'ls') {
      for (i++; i < lines.length; i++) {
        const parts = lines[i].split(' ');
        if (parts[0] === '$') {
          i--;
          break;
        }
        if (parts[0] !== 'dir') {
          for (const path of paths) {
            sizes[path] = (sizes[path] ?? 0) + +parts[0];
          }
        }
      }
    } else {
      if (dir === '..') {
        paths.pop();
      } else {
        paths.push(`${paths.at(-1)}${dir}/`);
      }
    }
  }
  return sizes;
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sizes = calc(data);
  return Object.values(sizes)
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var sizes = calc(data);
  return Math.min(
    ...Object.values(sizes).filter((size) => size >= sizes['/'] - 40000000)
  );
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
