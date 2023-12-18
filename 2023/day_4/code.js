import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  return data
    .map((card) =>
      card
        .split(/:|\|/)
        .map((entries) => entries.split(' ').filter((v) => v != ''))
    )
    .map((card) =>
      card[1]
        .filter((entry) => card[2].includes(entry))
        .reduce((sum, _val) => (sum == 0 ? 1 : sum * 2), 0)
    )
    .reduce((sum, val) => sum + val);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let cards = [];
  data.forEach((element) => {
    cards[
      element
        .split(':')[0]
        .split(' ')
        .filter((v) => v != '')[1] - 1
    ] = 1;
  });

  const cardData = data
    .map((card) =>
      card
        .split(/:|\|/)
        .map((entries) => entries.split(' ').filter((v) => v != ''))
    )
    .map((card) => card[1].filter((entry) => card[2].includes(entry)).length);

  cards.forEach((value, ind) => {
    for (let index = ind + 1; index < ind + 1 + cardData[ind]; index++) {
      cards[index] += value;
    }
  });

  return cards.reduce((sum, val) => sum + val);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
