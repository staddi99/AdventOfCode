import input from './input.js';

const inputArray = input.split('\n');

function partOne() {
  const count = {};
  inputArray
    .map((r) => r.split(''))
    .forEach((a) => {
      const counts = {};
      a.forEach((v) => (counts[v] = (counts[v] || 0) + 1));
      let e2 = [].concat(
        ...Object.entries(counts).filter((val, i, array) => {
          return val[1] === 2;
        })
      );
      let e3 = [].concat(
        ...Object.entries(counts).filter((val, i, array) => {
          return val[1] === 3;
        })
      );

      e2.length > 0 ? (count[0] = (count[0] || 0) + 1) : '';
      e3.length > 0 ? (count[1] = (count[1] || 0) + 1) : '';
    });

  return count[0] * count[1];
}

function partTwo() {
  const differences = (str1, str2) => {
    if (str1.length !== str2.length) return -1;
    let count = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) count++;
    }
    return count;
  };

  let output = '';
  inputArray.some((str) => {
    const pairs = inputArray.filter((str2) => differences(str, str2) === 1);
    pairs.forEach((str2) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === str2[i]) output += str[i];
      }
    });
    return pairs.length > 0;
  });
  return output;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
