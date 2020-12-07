import input from './input.js';

const inputArray = input.split(/\n{2,}/g);
let answers = [];
inputArray.forEach((data, index) => { answers[index] = data.split('\n') });

function partOne() {
  return answers
    .map((answer) => {
      const set = new Set([...answer.join("")]);
      return set.size;
    }).reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
}

function partTwo() {
  return answers
    .map((answer) => {
      const set = new Set([...answer.join('')]);

      return [...set].filter((character) => {
        return answer.every((person) => person.includes(character));
      }).length;
    }).reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    });
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());