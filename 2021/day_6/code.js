import input from './input.js';

const inputArray = input.split(',').map((f) => parseInt(f, 10));

function countAfter(fish, days) {
  const data = new Map();
  const getNext = (pair) => {
    const key = pair.join(',');
    if (data.has(key)) return data.get(key);
    const [next, days] = pair;
    if (days - next - 1 < 0) return 0;
    const newDays = days - next - 1;
    const val = 1 + getNext([6, newDays]) + getNext([8, newDays]);
    data.set(key, val);
    return val;
  };
  const fishDays = fish.map((count) => [count, days]);
  return fishDays.reduce((sum, pair) => sum + getNext(pair), fishDays.length);
}

function partOne() {
  return countAfter(inputArray, 80);
}

function partTwo() {
  return countAfter(inputArray, 256);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
