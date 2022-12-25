import input from './input.js';
import inputSample from './inputSample.js';

const run = (isTest) => {
  const [polymer, subs] = (isTest ? inputSample : input).split('\n\n');
  let substitutions = {};
  subs
    .split('\n')
    .filter((val) => val != '')
    .map((val) => val.split(' -> '))
    .forEach((val) => (substitutions[val[0]] = val[1]));

  let polymerPairs = {};
  polymer.split('').forEach((_, idx) => {
    if (idx == 0) {
      return;
    }
    let pair = polymer.substring(idx - 1, idx + 1);
    if (pair in polymerPairs) {
      polymerPairs[pair]++;
    } else {
      polymerPairs[pair] = 1;
    }
  });
  return [polymerPairs, substitutions];
};

function mostLeastAfter(polymer, substitutions, steps) {
  for (let idx = 0; idx < steps; idx++) {
    polymer = polymerize(polymer, substitutions);
  }
  let counts = {};
  for (let [key, value] of Object.entries(polymer)) {
    let first = key[0];
    let second = key[1];
    if (first in counts) {
      counts[first] += value;
    } else {
      counts[first] = value;
    }
    if (second in counts) {
      counts[second] += value;
    } else {
      counts[second] = value;
    }
  }

  let maxValue = 0;
  let minValue = 0;
  for (let [_, value] of Object.entries(counts)) {
    if (value < minValue || minValue == 0) {
      minValue = value;
    }
    if (value > maxValue) {
      maxValue = value;
    }
  }
  return Math.ceil(maxValue / 2) - Math.ceil(minValue / 2);
}

function polymerize(polymerPairs, substitutions) {
  let newPolymerPairs = {};
  for (let [pair, occurrences] of Object.entries(polymerPairs)) {
    let newItem = substitutions[pair];
    let pairOne = pair[0] + newItem;
    let pairTwo = newItem + pair[1];
    if (pairOne in newPolymerPairs) {
      newPolymerPairs[pairOne] += occurrences;
    } else {
      newPolymerPairs[pairOne] = occurrences;
    }
    if (pairTwo in newPolymerPairs) {
      newPolymerPairs[pairTwo] += occurrences;
    } else {
      newPolymerPairs[pairTwo] = occurrences;
    }
  }
  return newPolymerPairs;
}

export function partOne(isTest) {
  const [polymerPairs, substitutions] = run(isTest);
  return mostLeastAfter(polymerPairs, substitutions, 10);
}

export function partTwo(isTest) {
  const [polymerPairs, substitutions] = run(isTest);
  return mostLeastAfter(polymerPairs, substitutions, 40);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
