import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(/\n{2,}/g);
const inputArrayTest = inputSample.split(/\n{2,}/g);

const run = (isTest) => {
  let passwords = [];
  (isTest ? inputArrayTest : inputArray).forEach((data, index) => {
    passwords[index] = data.split('\n').join(' ');
  });
  return passwords;
};

export function partOne(isTest) {
  var res = 0;

  run(isTest).forEach((password) => {
    let pa = password.split(' ');
    if (pa.length <= 6) return;

    for (let i = 0; i < pa.length; i++) {
      pa[i] = pa[i].substr(0, 3);
    }

    if (!pa.includes('byr')) return;
    if (!pa.includes('iyr')) return;
    if (!pa.includes('eyr')) return;
    if (!pa.includes('hgt')) return;
    if (!pa.includes('hcl')) return;
    if (!pa.includes('ecl')) return;
    if (!pa.includes('pid')) return;

    res++;
  });

  return res;
}

export function partTwo(isTest) {
  var res = 0;

  run(isTest).forEach((password) => {
    let pas = password.split(' ');
    let pa = [];
    if (pas.length <= 6) return;

    for (let i = 0; i < pas.length; i++) {
      pa[i] = pas[i].substr(0, 3);
    }

    if (
      !pa.includes('byr') ||
      !(
        pas[pa.indexOf('byr')].substr(4) - 1920 <= 82 &&
        pas[pa.indexOf('byr')].substr(4) - 1920 >= 0
      )
    )
      return;
    if (
      !pa.includes('iyr') ||
      !(
        pas[pa.indexOf('iyr')].substr(4) - 2010 <= 10 &&
        pas[pa.indexOf('iyr')].substr(4) - 2010 >= 0
      )
    )
      return;
    if (
      !pa.includes('eyr') ||
      !(
        pas[pa.indexOf('eyr')].substr(4) - 2020 <= 10 &&
        pas[pa.indexOf('eyr')].substr(4) - 2020 >= 0
      )
    )
      return;
    if (pa.includes('hgt')) {
      if (
        !(
          (pas[pa.indexOf('hgt')].substring(
            pas[pa.indexOf('hgt')].length - 2
          ) == 'cm' &&
            pas[pa.indexOf('hgt')].substring(
              4,
              pas[pa.indexOf('hgt')].length - 2
            ) -
              150 <=
              43 &&
            pas[pa.indexOf('hgt')].substring(
              4,
              pas[pa.indexOf('hgt')].length - 2
            ) -
              150 >=
              0) ||
          (pas[pa.indexOf('hgt')].substring(
            pas[pa.indexOf('hgt')].length - 2
          ) == 'in' &&
            pas[pa.indexOf('hgt')].substring(
              4,
              pas[pa.indexOf('hgt')].length - 2
            ) -
              59 <=
              17 &&
            pas[pa.indexOf('hgt')].substring(
              4,
              pas[pa.indexOf('hgt')].length - 2
            ) -
              59 >=
              0)
        )
      )
        return;
    } else return;
    if (
      !pa.includes('hcl') ||
      pas[pa.indexOf('hcl')].substr(4).match(/^#[a-f0-9]{6}$/i) == null
    )
      return;
    if (
      !pa.includes('ecl') ||
      !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
        pas[pa.indexOf('ecl')].substr(4)
      )
    )
      return;
    if (!pa.includes('pid') || pas[pa.indexOf('pid')].substr(4).length != 9)
      return;

    res++;
  });

  return res;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
