import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const ADDRESS_LENGTH = 36;

const parse = (line) => {
  const [a, , b] = line.split(' ');
  if (line.startsWith('mask')) {
    return b;
  } else {
    const [, m] = a.match(/\w+\[?(\d+)?\]?/) ?? [];
    return { address: parseInt(m, 10), value: parseInt(b, 10) };
  }
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const applyMask = (n, mask) => {
    const binary = [...n.toString(2).padStart(ADDRESS_LENGTH, '0')];
    for (let i = 0; i < ADDRESS_LENGTH; i++) {
      const maskVal = mask[mask.length - i - 1];
      if (maskVal !== 'X') {
        binary[binary.length - i - 1] = maskVal;
      }
    }
    return parseInt(binary.join(''), 2);
  };

  const memory = new Map();
  let mask = 'X'.repeat(ADDRESS_LENGTH);
  for (const parsed of data.map(parse)) {
    if (typeof parsed === 'string') {
      mask = parsed;
    } else {
      memory.set(parsed.address, applyMask(parsed.value, mask));
    }
  }
  return [...memory.values()].reduce((a, b) => a + b);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const applyMask = (n, mask) => {
    const result = [[...n.toString(2).padStart(ADDRESS_LENGTH, '0')]];
    for (let i = 0; i < ADDRESS_LENGTH; i++) {
      const maskVal = mask[mask.length - i - 1];
      if (maskVal === '1') {
        for (const binary of result) {
          binary[binary.length - i - 1] = maskVal;
        }
      } else if (maskVal === 'X') {
        const resc = [...result.map((r) => [...r])];
        for (const binary of result) {
          binary[binary.length - i - 1] = '0';
        }
        for (const binary of resc) {
          binary[binary.length - i - 1] = '1';
        }
        result.push(...resc);
      }
    }
    return result.map((r) => parseInt(r.join(''), 2));
  };

  const memory = new Map();

  let mask = '0'.repeat(36);
  for (const parsed of data.map(parse)) {
    if (typeof parsed === 'string') {
      mask = parsed;
    } else {
      for (const address of applyMask(parsed.address, mask)) {
        memory.set(address, parsed.value);
      }
    }
  }
  return [...memory.values()].reduce((a, b) => a + b);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
