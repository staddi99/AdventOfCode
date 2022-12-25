import nerdamer from 'nerdamer/all.min.js';
import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const ops = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

let getEquation = (monkeys, monkey) => {
  let rootEquation = monkey;
  while (rootEquation == null || rootEquation.match(/[a-z]/g)) {
    rootEquation = rootEquation
      .split(' ')
      .map((monkey) => {
        if (monkeys[monkey] != null) return `( ${monkeys[monkey]} )`;
        return monkey;
      })
      .join(' ');
  }
  return rootEquation;
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const map = {};
  let lines = data;
  while (map.root === undefined) {
    for (const line of lines) {
      const [monkey, job] = line.split(': ');
      if (/\d+/.test(job)) {
        map[monkey] = +job;
        continue;
      }

      const [m1, op, m2] = job.split(' ');
      if (map[m1] === undefined || map[m2] === undefined) {
        continue;
      }

      map[monkey] = [m1, m2]
        .map((m) => map[m])
        .reduce((acc, n) => ops[op](acc, n));
    }
    lines = lines.filter((line) => map[line.slice(0, 4)] === undefined);
  }
  return map.root;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let monkeys = data.reduce((obj, line) => {
    let [id, equation] = line.split(': ');
    obj[id] = equation;
    if (id == 'root') obj[id] = obj[id].replace(/[\+\-\*\/]/g, '=');
    if (id == 'humn') obj[id] = 'X';
    return obj;
  }, {});

  let [left, right] = monkeys.root.split(' = ');

  left = getEquation(monkeys, left);
  right = getEquation(monkeys, right);

  if (!left.includes('X')) left = eval(left);
  if (!right.includes('X')) right = eval(right);

  return Number(nerdamer.solveEquations(left + ' = ' + right, 'X').toString());
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
