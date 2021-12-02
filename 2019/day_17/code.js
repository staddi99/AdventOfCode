const quickMode = process.env.QUICK;

function* run(numbers) {
  const mem = {};

  function getPosition(mode, pos) {
    switch (mode) {
      case 1:
        return pos;
      case 2:
        return base + read(1, pos, true);
      case 0:
      default:
        return read(1, pos, true);
    }
  }
  function read(mode, pos, isNumber, isOutput) {
    const position = getPosition(mode, pos);
    let value = (position < numbers.length ? numbers : mem)[position];
    if (typeof value === 'undefined') value = 0;

    if (typeof value === 'number') {
      return isNumber
        ? value
        : String(value)
            .split('')
            .map((x) => (x === '-' ? '-' : +x));
    } else if (isNumber) {
      if (isOutput) return value.join('');

      if (value.length > 15)
        throw new Error('can not convert big number to number');
      return Number(value.join(''));
    } else {
      return value;
    }
  }
  function write(mode, pos, value) {
    const position = getPosition(mode, pos);
    (position < numbers.length ? numbers : mem)[position] = value;

    if (Array.isArray(value) && value[0] !== '-' && isNaN(value[0]))
      throw value;
  }

  const instrs = {
    1: ['add', 3],
    2: ['mul', 3],
    3: ['input', 1],
    4: ['output', 1],
    5: ['jump-if-true', 2],
    6: ['jump-if-false', 2],
    7: ['less-than', 3],
    8: ['equals', 3],
    9: ['change-base', 1],
    99: ['halt', 0],
  };
  function printRead(mode, pos) {
    switch (mode) {
      case 1:
        return `mem[${pos}]`;
      case 2:
        return `mem[${base} + mem[${pos}]]`;
      case 0:
      default:
        return `mem[mem[${pos}]]`;
    }
  }

  let ip = 0;
  let base = 0;
  while (ip < numbers.length) {
    const op = numbers[ip] % 100;
    const m1 = Math.floor(numbers[ip] / 100) % 10;
    const m2 = Math.floor(numbers[ip] / 1000) % 10;
    const m3 = Math.floor(numbers[ip] / 10000) % 10;

    switch (op) {
      case 1:
        write(m3, ip + 3, plus(read(m1, ip + 1), read(m2, ip + 2)));
        ip += 4;
        break;
      case 2:
        write(m3, ip + 3, multiply(read(m1, ip + 1), read(m2, ip + 2)));
        ip += 4;
        break;
      case 3:
        write(m1, ip + 1, yield 'input');
        ip += 2;
        break;
      case 4:
        yield read(m1, ip + 1, true, true);
        ip += 2;
        break;
      case 5:
        if (read(m1, ip + 1, true)) {
          ip = read(m2, ip + 2, true);
        } else {
          ip += 3;
        }
        break;
      case 6:
        if (!read(m1, ip + 1, true)) {
          ip = read(m2, ip + 2, true);
        } else {
          ip += 3;
        }
        break;
      case 7:
        write(
          m3,
          ip + 3,
          compare(read(m1, ip + 1), read(m2, ip + 2)) < 0 ? 1 : 0
        );
        ip += 4;
        break;
      case 8:
        write(
          m3,
          ip + 3,
          compare(read(m1, ip + 1), read(m2, ip + 2)) === 0 ? 1 : 0
        );
        ip += 4;
        break;
      case 9:
        base += read(m1, ip + 1, true);
        ip += 2;
        break;
      case 99:
        ip = numbers.length;
        break;
      default:
        throw new Error(`invalid op: ${numbers[ip]} at ${ip}`);
    }
  }
}

function plus(a, b) {
  if (quickMode) return String(+a.join('') + +b.join('')).split('');

  if (a[0] === '-' && b[0] === '-') {
    return ['-'].concat(plus(a.slice(1), b.slice(1)));
  } else if (a[0] === '-') {
    a = a.slice(1);
    return compare(a, b) > 0 ? ['-'].concat(minus(a, b)) : minus(b, a);
  } else if (b[0] === '-') {
    b = b.slice(1);
    return compare(b, a) > 0 ? ['-'].concat(minus(b, a)) : minus(a, b);
  }

  const ret = [];
  let i = a.length - 1;
  let j = b.length - 1;
  let c = 0;
  while (i >= 0 || j >= 0) {
    const sum = (i >= 0 ? a[i] : 0) + (j >= 0 ? b[j] : 0) + c;
    ret.unshift(sum % 10);
    c = sum >= 10 ? 1 : 0;

    i--;
    j--;
  }
  if (c) ret.unshift(c);

  return ret;
}
function isZero(a) {
  return a.length === 1 && a[0] === 0;
}
function multiply(a, b) {
  if (quickMode) return String(+a.join('') * +b.join('')).split('');

  if (isZero(a) || isZero(b)) return [0];

  if (a[0] === '-' && b[0] === '-') {
    return multiply(a.slice(1), b.slice(1));
  } else if (a[0] === '-') {
    a = a.slice(1);
    return ['-'].concat(multiply(a, b));
  } else if (b[0] === '-') {
    b = b.slice(1);
    return ['-'].concat(multiply(a, b));
  }

  let ret = [0];
  for (let i = a.length - 1; i >= 0; i--) {
    let current = Array(a.length - 1 - i).fill(0);
    let c = 0;
    for (let j = b.length - 1; j >= 0; j--) {
      const product = a[i] * b[j] + c;
      current.unshift(product % 10);
      c = Math.floor(product / 10);
    }
    if (c) current.unshift(c);
    ret = plus(ret, current);
  }
  return ret;
}
function compare(a, b) {
  if (quickMode) return +a.join('') - +b.join('');

  if (a[0] === '-' && b[0] === '-') {
    return -compare(a.slice(1), b.slice(1));
  } else if (a[0] === '-') {
    return -1;
  } else if (b[0] === '-') {
    return 1;
  }

  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return a[i] - b[i];
    }
    return 0;
  } else {
    return a.length - b.length;
  }
}
function minus(a, b) {
  a = [...a];
  // make sure a >= b
  var i = a.length - 1;
  var j = b.length - 1;
  var result = [];
  var carry = 0;
  while (i >= 0) {
    if (carry) {
      if (a[i]) {
        a[i]--;
        carry = 0;
      } else {
        a[i] = 9;
        carry = 1;
      }
    }

    var bj = j >= 0 ? b[j] : 0;
    if (a[i] >= bj) {
      result.unshift(a[i] - bj);
    } else {
      result.unshift(10 + a[i] - bj);
      carry = 1;
    }

    i--;
    j--;
  }

  while (result[0] == 0) result.shift();
  if (!result.length) result.push(0);

  return result;
}

function printRoutine(lines) {
  let p;
  for (let r = 0; r < lines.length; r++) {
    for (let c = 0; c < lines[r].length; c++) {
      if (lines[r][c] === '^') {
        p = [r, c];
        break;
      }
    }
  }

  const routes = [];
  const dirs = [
    { c: 0, r: -1 }, // up
    { c: 1, r: 0 }, // right
    { c: 0, r: 1 }, // down
    { c: -1, r: 0 }, // left
  ];

  let next, ndi;
  let di = 0;
  while (1) {
    next = getNextPosition(dirs, p, di);
    if (isPath(lines, ...next)) {
      routes[routes.length - 1]++;
      p = next;
      continue;
    }

    ndi = (di + 1) % dirs.length;
    next = getNextPosition(dirs, p, ndi);
    if (isPath(lines, ...next)) {
      di = ndi;
      p = next;
      routes.push('R', 1);
      continue;
    }

    ndi = (di + dirs.length - 1) % dirs.length;
    next = getNextPosition(dirs, p, ndi);
    if (isPath(lines, ...next)) {
      di = ndi;
      p = next;
      routes.push('L', 1);
      continue;
    }

    break;
  }

  console.log(routes.join(','));
}

function check(lines, r, c) {
  return (
    isPath(lines, r, c) &&
    isPath(lines, r, c - 1) &&
    isPath(lines, r, c + 1) &&
    isPath(lines, r - 1, c) &&
    isPath(lines, r + 1, c)
  );
}
function isPath(lines, r, c) {
  return (
    r >= 0 &&
    r < lines.length &&
    c >= 0 &&
    c < lines[0].length &&
    lines[r][c] === '#'
  );
}

function getNextPosition(dirs, [r, c], di) {
  return [r + dirs[di].r, c + dirs[di].c];
}
function getCharCodes(str) {
  return str.split('').map((ch) => ch.charCodeAt(0));
}

import input from './input.js';

const inputArray = input.split(',').map((e) => parseInt(e));

function partOne() {
  const g = run([...inputArray]);
  let outputs = [];

  let a;
  let input;
  do {
    a = g.next(input);
    if (a.value === 'input') {
      throw new Error('I have no input');
    } else {
      outputs.push(+a.value);
    }
  } while (!a.done);

  const lines = String.fromCharCode(...outputs).split('\n');

  const result = lines.reduce((sum, line, r) => {
    for (let c = 0; c < line.length; c++) {
      if (check(lines, r, c)) sum += r * c;
    }
    return sum;
  }, 0);

  //printRoutine(lines);

  return result;
}

function partTwo() {
  const A = 'R,6,L,10,R,10,R,10';
  const B = 'L,10,L,12,R,10';
  const C = 'R,6,L,12,L,10';
  const main = 'A,B,A,B,A,C,A,C,B,C';

  const inputs = [main, A, B, C].reduce((agg, str) => {
    return agg.concat(getCharCodes(str), [10]);
  }, []);
  inputs.push('y'.charCodeAt(0), 10);

  const outputs = [];

  inputArray[0] = 2;
  const g = run([...inputArray]);
  let a = g.next();
  do {
    if (a.value === 'input') {
      if (!inputs.length) throw new Error('I have no input');
      a = g.next(inputs.shift());
    } else {
      outputs.push(+a.value);
      a = g.next();
    }
  } while (!a.done);

  const total = outputs.length;
  return outputs[total - 1];
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
