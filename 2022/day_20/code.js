import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const nums = data.map(Number).map((n, idx) => ({ n, idx }));
  for (let i = 0; i < nums.length; i++) {
    const numIdx = nums.findIndex(({ idx }) => idx === i);
    const [num] = nums.splice(numIdx, 1);
    nums.splice((numIdx + num.n) % nums.length, 0, num);
  }

  const zeroIdx = nums.findIndex(({ n }) => n === 0);
  return [1000, 2000, 3000]
    .map((n) => nums[(zeroIdx + n) % nums.length].n)
    .reduce((acc, n) => acc + n);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const nums = data.map(Number).map((n, idx) => ({ n: n * 811589153, idx }));
  for (let i = 0; i < nums.length * 10; i++) {
    const numIdx = nums.findIndex(({ idx }) => idx === i % nums.length);
    const [num] = nums.splice(numIdx, 1);
    nums.splice((numIdx + num.n) % nums.length, 0, num);
  }

  const zeroIdx = nums.findIndex(({ n }) => n === 0);
  return [1000, 2000, 3000]
    .map((di) => nums[(zeroIdx + di) % nums.length].n)
    .reduce((acc, n) => acc + n);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
