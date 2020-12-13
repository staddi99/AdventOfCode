import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  let arr = parseInt(inputArray[0]);
  let busses = inputArray[1]
    .split(',')
    .filter((e) => e != 'x')
    .map(Number);
  let bid = 0;
  let time = 0;

  busses.forEach((busId) => {
    let diff = Math.ceil(arr / busId) * busId - arr;
    if (time == 0 || diff < time) {
      bid = busId;
      time = diff;
    }
  });

  return bid * time;
}

function partTwo() {
  let busses = inputArray[1]
    .split(',')
    .map((el, i) => [parseInt(el), i])
    .filter((el) => !isNaN(el[0]));
  let inc = busses[0][0];
  let product = busses.map((el) => el[0]).reduce((a, b) => a * b);
  let p2 = true;
  let start = 100000000000000;
  let res = 0;
  while (p2) {
    for (let t = start; t < product; t += inc) {
      let m = busses
        .filter((el, i) => {
          if ((t + el[1]) % el[0] == 0) {
            return el;
          }
        })
        .map((el) => el[0]);

      if (m.length == busses.length) {
        res = t;
        p2 = false;
        t = product;
        break;
      }
      if (m.length > 1) {
        const gcd = (a, b) => (a ? gcd(b % a, a) : b);
        let lcm = m.reduce((a, b) => (a * b) / gcd(a, b));
        start = t + lcm;
        inc = lcm;
        break;
      }
    }
  }

  return res;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
