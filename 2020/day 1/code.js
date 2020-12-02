import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  var res = 0;

  inputArray.forEach(
    e1 => {
      inputArray.forEach(
        e2 => {
          if (parseInt(e1) + parseInt(e2) == 2020) {
            res = parseInt(e1) * parseInt(e2);
          }
        }
      )
    }
  )

  return res;
}

function partTwo() {
  var res = 0;

  inputArray.forEach(
    e1 => {
      inputArray.forEach(
        e2 => {
          inputArray.forEach(
            e3 => {
              if (parseInt(e1) + parseInt(e2) + parseInt(e3) == 2020) {
                res = parseInt(e1) * parseInt(e2) * parseInt(e3);
              }
            }
          )
        }
      )
    }
  )

  return res;
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());