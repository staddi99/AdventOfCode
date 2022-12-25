import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function calculateFuel(mass) {
  if(mass <= 6) return 0;
  return calculateFuel(Math.floor(parseInt(mass) / 3) - 2) + (Math.floor(parseInt(mass) / 3) - 2);
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var res = 0;
  
  data.forEach(
    element => {
      res += Math.floor(parseInt(element) / 3) - 2;
    }
  );

  return res;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  var res = 0;

  data.forEach(
    element => {
      res += calculateFuel(element);
    }
  );

  return res;
}

// console.log("Part 1: " + partOne());
// console.log("Part 2: " + partTwo());