import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const getRate = (mask, valves, map) => {
  let rate = 0;
  for (let i = 0; i < valves.length; i++) {
    if ((2 ** i) & mask) {
      rate += map[valves[i]].rate;
    }
  }
  return rate;
};

const run = (isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  let max = 0;
  const map = {};
  for (const line of data) {
    let [from, rate, ...to] = line.match(/[A-Z]{2}|\d+/g);
    rate = +rate;
    map[from] = { rate, to };
  }

  const dists = {};
  for (const from of Object.keys(map)) {
    dists[from] = { [from]: 0 };
    const seen = new Set([from]);
    const queue = [from];

    while (queue.length) {
      const to = queue.shift();
      const dist = dists[from][to];

      for (const next of map[to].to) {
        if (!seen.has(next)) {
          seen.add(next);
          dists[from][next] = dist + 1;
          queue.push(next);
        }
      }
    }
  }

  const valves = Object.keys(map).filter((key) => map[key].rate);

  const pressures = valves.map(() =>
    [...Array(2 ** valves.length)].map(() => [...Array(31)].fill(-Infinity))
  );

  for (let i = 0; i < valves.length; i++) {
    const dist = dists.AA[valves[i]];
    pressures[i][2 ** i][dist + 1] = 0;
  }

  for (let t = 1; t < 31; t++) {
    for (let mask = 0; mask < 2 ** valves.length; mask++) {
      for (let i = 0; i < valves.length; i++) {
        if (!((2 ** i) & mask)) {
          continue;
        }

        const rate = getRate(mask, valves, map);
        pressures[i][mask][t] = Math.max(
          pressures[i][mask][t],
          pressures[i][mask][t - 1] + rate
        );
        max = Math.max(max, pressures[i][mask][t]);

        for (let j = 0; j < valves.length; j++) {
          if ((2 ** j) & mask) {
            continue;
          }

          const dist = dists[valves[i]][valves[j]];
          if (t + dist + 1 >= 31) {
            continue;
          }

          pressures[j][mask | (2 ** j)][t + dist + 1] = Math.max(
            pressures[j][mask | (2 ** j)][t + dist + 1],
            pressures[i][mask][t] + rate * (dist + 1)
          );
        }
      }
    }
  }

  return [max, valves, pressures];
};

export function partOne(isTest) {
  const [max] = run(isTest);
  return max;
}

export function partTwo(isTest) {
  let [max, valves, pressures] = run(isTest);
  max = 0;
  for (let i = 0; i < 2 ** valves.length; i++) {
    for (let j = 0; j < 2 ** valves.length; j++) {
      if ((i & j) !== j) {
        continue;
      }

      const a = Math.max(...pressures.map((p) => p[j][26]));
      const b = Math.max(...pressures.map((p) => p[i & ~j][26]));

      max = Math.max(max, a + b);
    }
  }
  return max;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
