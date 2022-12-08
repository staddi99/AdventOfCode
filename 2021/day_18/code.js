import input from './input.js';

const inputArray = input.split('\n');

const magnitude = (pair) => {
  const [a, b] = pair.map((n) => (Array.isArray(n) ? magnitude(n) : n));
  return 3 * a + 2 * b;
};

const getDepth = (line, index) => {
  let depth = 0;
  for (let i = 0; i < index; i++) {
    if (line[i] === '[') {
      depth++;
    } else if (line[i] === ']') {
      depth--;
    }
  }
  return depth;
};

const explode = (line, match) => {
  let left = line.slice(0, match.index);
  let right = line.slice(match.index + match[0].length);

  left = left.replace(
    /(\d+)(\D+)$/,
    (_, n, rest) => `${+n + +match[1]}${rest}`
  );
  right = right.replace(/(\d+)/, (n) => +n + +match[2]);

  return `${left}0${right}`;
};

const split = (line, match) => {
  let left = line.slice(0, match.index);
  let right = line.slice(match.index + match[0].length);
  const n = +match[0];
  return `${left}[${Math.floor(n / 2)},${Math.ceil(n / 2)}]${right}`;
};

const reduce = (line) => {
  outer: while (true) {
    for (const match of line.matchAll(/\[(\d+),(\d+)]/g)) {
      const depth = getDepth(line, match.index);
      if (depth >= 4) {
        line = explode(line, match);
        continue outer;
      }
    }
    for (const match of line.matchAll(/\d\d+/g)) {
      line = split(line, match);
      continue outer;
    }
    break;
  }
  return line;
};

function partOne() {
  return magnitude(
    JSON.parse(
      reduce(inputArray.reduce((acc, line) => reduce(`[${acc},${line}]`)))
    )
  );
}

function partTwo() {
  let max = 0;
  for (let i = 0; i < inputArray.length - 1; i++) {
    for (let j = i + 1; j < inputArray.length; j++) {
      max = Math.max(
        max,
        magnitude(JSON.parse(reduce(`[${inputArray[i]},${inputArray[j]}]`))),
        magnitude(JSON.parse(reduce(`[${inputArray[j]},${inputArray[i]}]`)))
      );
    }
  }
  return max;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
