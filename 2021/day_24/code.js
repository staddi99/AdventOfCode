import input from './input.js';
// import inputSample from './inputSample.js';

// const getData = (isTest) => (isTest ? inputSample : input).split('\n');
const getData = (isTest) => input.split('\n');

const run = (part, isTest) => {
  const lines = getData(isTest);

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
  return Number(digits.join(''));
};

export function partOne(isTest) {
  return run(1, isTest);
}

export function partTwo(isTest) {
  return run(2, isTest);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
