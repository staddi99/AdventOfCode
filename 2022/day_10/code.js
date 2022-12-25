import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  function tick() {
    cycle++;
    if ((cycle + 20) % 40 === 0) {
      sum += cycle * x;
    }
  }

  const lines = data;
  let sum = 0;
  let x = 1;
  let cycle = 0;
  for (const line of lines) {
    const [op, arg] = line.split(' ');
    if (op === 'noop') {
      tick();
    } else {
      tick();
      tick();
      x += +arg;
    }
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  function tick() {
    cycle++;
    const cursor = (cycle - 1) % 40;
    crt[~~((cycle - 1) / 40)][(cycle - 1) % 40] =
      cursor >= x - 1 && cursor <= x + 1 ? '#' : '.';
  }

  const lines = data;
  let x = 1;
  let cycle = 0;
  const crt = [...Array(6)].map(() => [...Array(40)].fill('.'));
  for (const line of lines) {
    const [op, arg] = line.split(' ');
    if (op === 'noop') {
      tick();
    } else {
      tick();
      tick();
      x += +arg;
    }
  }
  return crt.map((line) => line.join('')).join('\n');
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: \n' + partTwo());
