import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

const run = (data, part) => {
  const monkeys = [];
  for (const section of data) {
    const lines = section.split('\n');
    const items = lines[1].match(/\d+/g).map(Number);
    const op = (old) => eval(lines[2].split('= ')[1]);
    const divisibleBy = +lines[3].match(/\d+/g)[0];
    const toMonkey = [4, 5].map((i) => +lines[i].match(/\d+/g)[0]);
    const monkey = { items, op, divisibleBy, toMonkey };
    monkeys.push(monkey);
  }
  const product = monkeys
    .map(({ divisibleBy }) => divisibleBy)
    .reduce((acc, n) => acc * n);

  let nInspected = monkeys.map(() => 0);
  for (let round = 0; round < (part === 2 ? 10000 : 20); round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, op, divisibleBy, toMonkey } = monkeys[i];
      let item = items.shift();
      while (item) {
        nInspected[i]++;
        const nextItem =
          part === 2 ? op(item) % product : Math.floor(op(item) / 3);
        monkeys[toMonkey[+!!(nextItem % divisibleBy)]].items.push(nextItem);
        item = items.shift();
      }
    }
  }
  return nInspected
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, n) => acc * n);
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return run(data, 1);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  return run(data, 2);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
