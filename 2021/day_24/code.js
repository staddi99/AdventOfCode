import input from './input.js';

const inputArray = input.split('\n');

const run = (part) => {
  const lines = inputArray;

  const terms = [];
  for (let i = 0; i < lines.length; i += 18) {
    terms.push([4, 5, 15].map((j) => +lines[i + j].split(' ')[2]));
  }

  const prevs = [];
  const digits = [];
  for (const [i, [a, b, c]] of Object.entries(terms)) {
    if (a === 1) {
      prevs.push([i, c]);
    } else {
      const [prevI, prevC] = prevs.pop();
      const complement = prevC + b;
      digits[prevI] =
        part === 1 ? Math.min(9, 9 - complement) : Math.max(1, 1 - complement);
      digits[i] = digits[prevI] + complement;
    }
  }
  return digits.join('');
};

function partOne() {
  return run(1);
}

function partTwo() {
  return run(2);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
