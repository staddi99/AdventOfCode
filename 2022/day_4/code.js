import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  return inputArray
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

function partTwo() {
  return inputArray
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

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
