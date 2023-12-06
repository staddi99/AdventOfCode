import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  var [times, dists] = data.map((e) =>
    e
      .split(' ')
      .filter((v) => v != '' && !v.includes(':'))
      .map(Number)
  );

  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    let minTime;
    for (let t = 1; t < time / 2; t++) {
      const totDist = t * (time - t);
      if (totDist > dist) {
        minTime = t;
        break;
      }
    }
    const nWays = time - (minTime - 1) * 2 - 1;
    product *= nWays;
  }
  return product;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  var [times, dists] = data.map((e) =>
    e
      .split(' ')
      .filter((v) => v != '' && !v.includes(':'))
      .map(Number)
  );

  times = [Number(times.join(''))]
  dists = [Number(dists.join(''))]

  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    let minTime;
    for (let t = 1; t < time / 2; t++) {
      const totDist = t * (time - t);
      if (totDist > dist) {
        minTime = t;
        break;
      }
    }
    const nWays = time - (minTime - 1) * 2 - 1;
    product *= nWays;
  }
  return product;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
