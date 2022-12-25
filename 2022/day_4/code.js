import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return data
    .map((value) => {
      var t = value.split(',').map((e) => {
        var ip = e.split('-').map(Number);
        var arr = [];
        for (let index = ip[0]; index <= ip[1]; index++) {
          arr.push(index);
        }
        return arr;
      });
      return t
        .map((e) => e.length)
        .includes(t[0].filter((element) => t[1].includes(element)).length);
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return data
    .map((value) => {
      var t = value.split(',').map((e) => {
        var ip = e.split('-').map(Number);
        var arr = [];
        for (let index = ip[0]; index <= ip[1]; index++) {
          arr.push(index);
        }
        return arr;
      });
      return t[0].filter((element) => t[1].includes(element)).length > 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
