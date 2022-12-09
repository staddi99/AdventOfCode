import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

const groupByFour = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i += 4) {
    result.push(array.slice(i, i + 4));
  }
  return result;
};

const runTable = (isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  let table = data[0].split('\n');
  table.pop();

  table = table
    .map((a) => a.split(''))
    .map((a) => groupByFour(a))
    .map((a) => a.map((b) => b[1]))
    .reverse();
  table = table[0].map((_, colIndex) => table.map((row) => row[colIndex]));
  table = table.map((a) => a.filter((b) => b !== ' '));
  return table;
};

const runMove = (isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  const moveRegex = /move (\d+) from (\d+) to (\d+)/;
  const moves = data[1]
    .trim()
    .split('\n')
    .map((a) => moveRegex.exec(a))
    .map((a) => [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])]);
  return moves;
};

export function partOne(isTest) {
  let table = runTable(isTest);
  let moves = runMove(isTest);

  let partOne = JSON.parse(JSON.stringify(table));

  moves.forEach((a) => {
    const [times, from, to] = a;
    for (let i = 0; i < times; i++) {
      partOne[to - 1].push(partOne[from - 1].pop());
    }
  });
  return partOne.map((a) => a[a.length - 1]).join('');
}

export function partTwo(isTest) {
  let table = runTable(isTest);
  let moves = runMove(isTest);

  let partTwo = JSON.parse(JSON.stringify(table));

  moves.forEach((a) => {
    const [times, from, to] = a;
    const queues = [];
    for (let i = 0; i < times; i++) {
      queues.push(partTwo[from - 1].pop());
    }
    queues.reverse().forEach((a) => partTwo[to - 1].push(a));
  });
  return partTwo.map((a) => a[a.length - 1]).join('');
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
