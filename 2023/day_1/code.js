import input from './input.js';
import { inputSample1, inputSample2 } from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest1 = inputSample1.split('\n');
const inputArrayTest2 = inputSample2.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest1 : inputArray;

  return data
    .map(
      (line) =>
        line.match(/\d/g)[0] +
        '' +
        line.match(/\d/g)[line.match(/\d/g).length - 1]
    )
    .map(Number)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest2 : inputArray;

  return data.map(l => {
    const dgs = l.split('')
        .map((c, i) => {
            const nxt = l.slice(i)
            if (nxt.startsWith('one')) return 1
            if (nxt.startsWith('two')) return 2
            if (nxt.startsWith('three')) return 3
            if (nxt.startsWith('four')) return 4
            if (nxt.startsWith('five')) return 5
            if (nxt.startsWith('six')) return 6
            if (nxt.startsWith('seven')) return 7
            if (nxt.startsWith('eight')) return 8
            if (nxt.startsWith('nine')) return 9
            return parseInt(c)
        })
        .filter(n => !!n)
    return Number('' + dgs[0] + dgs.at(-1))
}).reduce((a, b) => a + b, 0)
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
