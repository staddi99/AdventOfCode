import input from './input.js';
import inputSample from './inputSample.js';
import sum from 'lodash/sum.js';
import sumBy from 'lodash/sumBy.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const originalOrder = 'a b c d e f g'.split(' ');
const validNums = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

function permutations(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = permutations(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

function mapWires(num, permutation) {
  return [...num]
    .map((letter) => originalOrder[permutation.indexOf(letter)])
    .sort()
    .join('');
}

const possiblePermutations = permutations(originalOrder);

const run = (isTest) => {
  return (isTest ? inputArrayTest : inputArray).map((line) => {
    const [input, output] = line.split(' | ').map((x) => x.split(' '));

    const correctPermutation = possiblePermutations.find((permutation) => {
      const mapped = input.map((num) => mapWires(num, permutation));
      return mapped.every((num) => validNums.includes(num));
    });

    return output
      .map((num) => mapWires(num, correctPermutation))
      .map((num) => validNums.indexOf(num));
  });
};

export function partOne(isTest) {
  return sumBy(run(isTest).flat(), (n) => ([1, 4, 7, 8].includes(n) ? 1 : 0));
}

export function partTwo(isTest) {
  return sum(run(isTest).map((n) => Number(n.join(''))));
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
