import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const getMaxGeodes = (costs, tMax, part) => {
  const maxCosts = [...Array(3)].map((_, i) =>
    Math.max(...costs.map((cost) => cost[i] ?? 0))
  );
  let maxGeodes = 0;
  const queue = [[[1, 0, 0, 0], [0, 0, 0, 0], 0]];
  const seen = new Set();

  outer: while (queue.length) {
    const state = queue.shift();
    const [robots, collected, t] = state;

    maxGeodes = Math.max(maxGeodes, collected[3]);
    if (t === tMax) continue;

    for (let i = 0; i < 3; i++) {
      robots[i] = Math.min(robots[i], maxCosts[i]);
      collected[i] = Math.min(
        collected[i],
        (tMax - t) * maxCosts[i] - robots[i] * (tMax - t - 1)
      );
    }

    if (seen.has(JSON.stringify(state))) continue;
    seen.add(JSON.stringify(state));

    if (part === 1) {
      queue.push([robots, collected.map((c, i) => c + robots[i]), t + 1]);
      costs.forEach((cost, i) => {
        if (cost.every((c, j) => c <= collected[j])) {
          queue.push([
            robots.map((r, j) => r + (j === i)),
            collected.map((c, j) => c - (cost[j] ?? 0) + robots[j]),
            t + 1,
          ]);
        }
      });
    } else {
      for (let i = 3; i >= 0; i--) {
        const cost = costs[i];
        if (cost.every((c, j) => c <= collected[j])) {
          queue.push([
            robots.map((r, j) => r + (j === i)),
            collected.map((c, j) => c - (cost[j] ?? 0) + robots[j]),
            t + 1,
          ]);
          if (i >= 2) continue outer;
        }
      }
      queue.push([robots, collected.map((c, i) => c + robots[i]), t + 1]);
    }
  }
  return maxGeodes;
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return data
    .map((line) => line.match(/\d+/g).slice(1).map(Number))
    .map(([a, b, c, d, e, f]) => [[a], [b], [c, d], [e, 0, f]])
    .map((costs, i) => (i + 1) * getMaxGeodes(costs, 24, 1))
    .reduce((acc, n) => acc + n);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return data
    .map((line) => line.match(/\d+/g).slice(1).map(Number))
    .slice(0, 3)
    .map(([a, b, c, d, e, f]) => [[a], [b], [c, d], [e, 0, f]])
    .map((costs) => getMaxGeodes(costs, 32, 2))
    .reduce((acc, n) => acc * n);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
