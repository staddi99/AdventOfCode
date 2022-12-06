import input from './input.js';

const inputArray = input.split('\n\n');

const groupByFour = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i += 4) {
    result.push(array.slice(i, i + 4));
  }
  return result;
};

let table = inputArray[0].split('\n');
table.pop();

table = table
  .map((a) => a.split(''))
  .map((a) => groupByFour(a))
  .map((a) => a.map((b) => b[1]))
  .reverse();
table = table[0].map((_, colIndex) => table.map((row) => row[colIndex]));
table = table.map((a) => a.filter((b) => b !== ' '));

const moveRegex = /move (\d+) from (\d+) to (\d+)/;
const moves = inputArray[1]
  .trim()
  .split('\n')
  .map((a) => moveRegex.exec(a))
  .map((a) => [parseInt(a[1]), parseInt(a[2]), parseInt(a[3])]);

function partOne() {
  let partOne = JSON.parse(JSON.stringify(table));

  moves.forEach((a) => {
    const [times, from, to] = a;
    for (let i = 0; i < times; i++) {
      partOne[to - 1].push(partOne[from - 1].pop());
    }
  });
  return partOne.map((a) => a[a.length - 1]).join('');
}

function partTwo() {
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
