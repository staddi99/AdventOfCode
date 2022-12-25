import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function checkBagContainsGold(bags, bag) {
  if (!bags[bag]) {
    return false;
  }
  if (bags[bag].includes('shiny gold')) {
    return true;
  }
  for (const innerBag of bags[bag]) {
    if (checkBagContainsGold(bags, innerBag)) {
      return true;
    }
  }
  return false;
}

function countInnerBags(bags, bag) {
  if (!bags[bag]) {
    return 0;
  }
  let innerBags = 0;
  for (const innerBag of bags[bag]) {
    innerBags += innerBag[0] + innerBag[0] * countInnerBags(bags, innerBag[1]);
  }
  return innerBags;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let res = 0;
  var bags = {};

  for (const line of data) {
    let innerBagTypes = line.replace(/.*?bags/, '').split(',');
    innerBagTypes = innerBagTypes.map((x) =>
      x
        .replace(/.*\d /, '')
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/(bags|bag)/, '')
        .trim()
    );
    bags[line.replace(/bags.*/, '').trim()] = innerBagTypes;
  }

  for (const bag in bags) {
    res += checkBagContainsGold(bags, bag) ? 1 : 0;
  }

  return res;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var bags = {};

  for (const line of data) {
    let innerBagTypes = line.replace(/.*?bags/, '').split(',');
    innerBagTypes = innerBagTypes.map((x) => [
      Number(x.replace(/[^\d]+/g, '')),
      x
        .replace(/.*\d /, '')
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/(bags|bag)/, '')
        .trim(),
    ]);
    bags[line.replace(/bags.*/, '').trim()] = innerBagTypes;
  }

  return countInnerBags(bags, 'shiny gold');
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
