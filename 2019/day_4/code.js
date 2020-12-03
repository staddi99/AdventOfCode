import input from './input.js';
import matchAll from 'string.prototype.matchall';
import uniq from 'uniq';

const inputArray = input.split('-');

function has_double_digit(str) {
  return /(\d)\1/.test(str);
}

function all_increasing_digits(str) {
  let n_arr = str.split('').map(v => +v);
  return n_arr.every((c, i, a) =>
    i === a.length - 1 ? true : c <= a[i + 1]
  );
}

function all_matches_are_not_a_part_of_larger_group(str) {
  let full_matches = [...matchAll(str, /(\d)\1/g)];

  let full_matches_mapped = full_matches.map(v => v[0]);

  let matches = uniq(full_matches_mapped);

  return matches.some(run => {
    let start = str.indexOf(run);
    let end = str.lastIndexOf(run);

    return start === end;
  });
}

function partOne() {
  let count = 0;
  for (let n = inputArray[0]; n <= inputArray[1]; n++) {
    let n_str = String(n);

    if (!has_double_digit(n_str)) {
      continue;
    }

    if (all_increasing_digits(n_str)) {
      count++;
    }
  }
  return count;
}

function partTwo() {
  let count = 0;
  for (let n = inputArray[0]; n <= inputArray[1]; n++) {
    let n_str = String(n);

    if (!has_double_digit(n_str)) {
      continue;
    }

    if (!all_increasing_digits(n_str)) {
      continue;
    }

    if (all_matches_are_not_a_part_of_larger_group(n_str)) {
      count++;
    }
  }
  return count;
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());