import input from './input.js';

const inputArray = input.split('\n');

function calculateFuel(mass) {
  if(mass <= 6) return 0;
  return calculateFuel(Math.floor(parseInt(mass) / 3) - 2) + (Math.floor(parseInt(mass) / 3) - 2);
}

function partOne() {
  var res = 0;
  
  inputArray.forEach(
    element => {
      res += Math.floor(parseInt(element) / 3) - 2;
    }
  );

  return res;
}

function partTwo() {
  var res = 0;

  inputArray.forEach(
    element => {
      res += calculateFuel(element);
    }
  );

  return res;
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());