import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(/\n{2,}/g);
const inputArrayTest = inputSample.split(/\n{2,}/g);

const run = (isTest) => {
  let answers = [];
  (isTest ? inputArrayTest : inputArray).forEach((data, index) => {
    answers[index] = data.split('\n');
  });
  return answers;
};

export function partOne(isTest) {
  return run(isTest)
    .map((answer) => {
      const set = new Set([...answer.join('')]);
      return set.size;
    })
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
}

export function partTwo(isTest) {
  return run(isTest)
    .map((answer) => {
      const set = new Set([...answer.join('')]);

      return [...set].filter((character) => {
        return answer.every((person) => person.includes(character));
      }).length;
    })
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
