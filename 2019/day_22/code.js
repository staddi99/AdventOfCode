import input from './input.js';

const inputArray = input.split('\n');

function ones(n) {
  const ret = [];
  while (n) {
    ret.unshift(n & 1);
    n -= n & 1;
    n /= 2;
  }
  return ret;
}

function mul(a, b, n) {
  const os = ones(b < 0 ? b + n : b);

  let r = 0;
  for (let i = 0; i < os.length; i++) {
    if (os[i] & 1) {
      r = (r + r + a) % n;
    } else {
      r = (r + r) % n;
    }
  }
  return r;
}

function mod(a, b, n) {
  const os = ones(b < 0 ? b + n : b);

  let r = 1;
  for (let i = 0; i < os.length; i++) {
    if (os[i] & 1) {
      r = mul(mul(r, r, n), a, n);
    } else {
      r = mul(r, r, n);
    }
  }
  return r;
}

function inv(n, length) {
  return mod(n, length - 2, length);
}

export function partOne() {
  let deck = [];
  for (let i = 0; i < 10007; i++) {
    deck[i] = i;
  }

  inputArray.forEach((line) => {
    let matches;
    if (line === 'deal into new stack') {
      deck.reverse();
    } else if ((matches = /cut (\-?\d+)/.exec(line))) {
      const n = +matches[1];
      const p = n >= 0 ? n : deck.length + n;
      deck = deck.slice(p).concat(deck.slice(0, p));
    } else if ((matches = /deal with increment (\d+)/.exec(line))) {
      const n = +matches[1];
      const nd = [];
      let j = 0;
      for (let i = 0; i < deck.length; i++) {
        nd[j] = deck[i];
        j = (j + n) % deck.length;
      }
      deck = nd;
    }
  });

  return deck.indexOf(2019);
}

export function partTwo() {
  const length = 119315717514047;
  const times = 101741582076661;

  let aMul = 1; // a' = a * sth
  let bOff = 0; // b' = b + sth
  inputArray.forEach((line) => {
    let matches;
    if (line === 'deal into new stack') {
      aMul *= -1;
      bOff += aMul;
    } else if ((matches = /cut (\-?\d+)/.exec(line))) {
      const n = +matches[1];
      bOff += mul(aMul, n, length);
    } else if ((matches = /deal with increment (\d+)/.exec(line))) {
      const n = +matches[1];
      aMul = mul(aMul, inv(n, length), length);
    }
    aMul %= length;
    bOff %= length;
  });

  const a = mod(aMul, times, length);
  const b = mul(mul(bOff, 1 - a, length), inv(1 - aMul, length), length);
  const ret = (mul(2020, a, length) + b + length) % length;

  return ret;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
