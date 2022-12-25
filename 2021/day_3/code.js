import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const columns = (input) => {
  return input.reduce(
    (acc, item) => {
      const chars = item.split('');
      const columns = acc;
      for (let i = 0; i < chars.length; i++) {
        columns[i].push(chars[i]);
      }
      return acc;
    },
    new Array(input[0].length).fill(0).map(() => new Array())
  );
};

const group = (list) =>
  list.reduce((acc, item) => {
    if (acc[item] === undefined) acc[item] = 0;
    else acc[item]++;
    return acc;
  }, {});

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const digitSums = columns(data).map(group);

  const gamma = (list) =>
    parseInt(list.map((item) => (item['0'] > item['1'] ? 0 : 1)).join(''), 2);
  const epsilon = (list) =>
    parseInt(list.map((item) => (item['0'] < item['1'] ? 0 : 1)).join(''), 2);

  return gamma(digitSums) * epsilon(digitSums);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const oxygen = (list) => {
    let numbers = list.slice(0);
    let index = 0;
    while (numbers.length > 1) {
      const val = columns(numbers).map(group);
      if (val[index]['0'] > val[index]['1']) {
        numbers = numbers.filter((line) => line[index] === '0');
      } else {
        numbers = numbers.filter((line) => line[index] === '1');
      }
      index++;
    }
    return parseInt(numbers[0], 2);
  };

  const co2 = (list) => {
    let numbers = list.slice(0);
    let index = 0;
    while (numbers.length > 1) {
      const val = columns(numbers).map(group);
      if (val[index]['1'] < val[index]['0']) {
        numbers = numbers.filter((line) => line[index] === '1');
      } else {
        numbers = numbers.filter((line) => line[index] === '0');
      }
      index++;
    }
    return parseInt(numbers[0], 2);
  };

  return oxygen(data) * co2(data);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
