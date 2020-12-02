import input from './input.js';

const inputArray = input.split('\n');

function countChars(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count += 1;
    }
  }
  return count;
}

function partOne() {
  let res = 0;

  inputArray.forEach((test) => {
    const [policy, password] = test.split(':');
    const [minMax, letter] = policy.split(' ');
    const [min, max] = minMax.split('-').map(Number);
    const count = countChars(password, letter);
    if (count >= min && count <= max) {
      res += 1;
    }
  });

  return res;
}

function partTwo() {
  let res = 0;

  inputArray.forEach((test) => {
    const [policy, password] = test.split(':');
    const [positions, letter] = policy.split(' ');
    const [firstIndex, secondIndex] = positions.split('-').map(Number);

    const first = password[firstIndex];
    const second = password[secondIndex];

    if ((first === letter || second === letter) && first !== second) {
      res += 1;
    }
  });

  return res;
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());