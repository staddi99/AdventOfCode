import input from './input.js';
import { inputSample1, inputSample2 } from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest1 = inputSample1.split('\n\n');
const inputArrayTest2 = inputSample2.split('\n\n');

const gcf = (a, b) => (b == 0 ? a : gcf(b, a % b));
const lcm = (a, b) => (a / gcf(a, b)) * b;

export function partOne(isTest) {
  const data = isTest ? inputArrayTest1 : inputArray;

  const groups = data;
  const turns = groups[0];

  const directions = groups[1].split(/\n/g).reduce((obj, line) => {
    const [start, other] = line.split(/ = /);
    const [left, right] = other.replace(/[\(\)]/g, '').split(/, /g);
    obj[start] = { left, right };
    return obj;
  }, {});

  let current = 'AAA',
    steps = 0;
  while (current != 'ZZZ') {
    current =
      directions[current][
        turns[steps % turns.length] == 'L' ? 'left' : 'right'
      ];
    steps++;
  }

  return steps;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest2 : inputArray;

  const groups = data;
  const turns = groups[0];

  const directions = groups[1].split(/\n/g).reduce((obj, line) => {
    const [start, other] = line.split(/ = /);
    const [left, right] = other.replace(/[\(\)]/g, '').split(/, /g);
    obj[start] = { left, right };
    return obj;
  }, {});

  let current = Object.keys(directions).filter(
    (name) => name[name.length - 1] == 'A'
  );

  for (let i = 0; i < current.length; i++) {
    let steps = 0;
    while (current[i][current[i].length - 1] != 'Z') {
      current[i] =
        directions[current[i]][
          turns[steps % turns.length] == 'L' ? 'left' : 'right'
        ];

      steps++;
    }
    current[i] = steps;
  }

  return current.reduce((multiple, num) => lcm(multiple, num), 1);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
