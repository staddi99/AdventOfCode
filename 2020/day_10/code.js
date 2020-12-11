import input from './input.js';

const inputArray = input.split('\n').map(Number);

function partOne() {
  const sortedAdapters = [...inputArray].sort((a, b) => a - b);
  let oneCount = 1;
  let threeCount = 1;

  for (let i = 1; i < sortedAdapters.length; i++) {
    const diff = sortedAdapters[i] - sortedAdapters[i - 1];
    if (diff === 1) {
      oneCount += 1;
    } else if (diff === 3) {
      threeCount += 1;
    }
  }
  return oneCount * threeCount;
}

function partTwo() {
  const max = Math.max(...inputArray) + 3;
  const uniqueAdapters = new Set(inputArray);
  uniqueAdapters.add(max);

  const combinations = {};
  combinations[0] = 1;
  for (let i = 1; i <= max; i++) {
    if (uniqueAdapters.has(i)) {
      combinations[i] = (combinations[i - 1] || 0) + (combinations[i - 2] || 0) + (combinations[i - 3] || 0);
    }
  }
  return combinations[max];
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());