import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function countArrangements(
  springs,
  groups,
  springIdx = 0,
  groupIdx = 0,
  memo = {}
) {
  function memoize(result) {
    memo[springIdx] ??= {};
    memo[springIdx][groupIdx] = result;
    return result;
  }

  if (memo[springIdx]?.[groupIdx] !== undefined) {
    return memo[springIdx][groupIdx];
  }

  if (springIdx >= springs.length) {
    return +(groupIdx === groups.length);
  }
  if (groupIdx === groups.length) {
    return +(springs.indexOf('#', springIdx) === -1);
  }

  if (springs[springIdx] === '.') {
    // move to next non-operational spring
    return memoize(
      countArrangements(springs, groups, springIdx + 1, groupIdx, memo)
    );
  }

  if (springs[springIdx] === '#') {
    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs.substring(springIdx, springIdx + groups[groupIdx]).match(/\./) ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(0);
    }

    // move to next group
    return memoize(
      countArrangements(
        springs,
        groups,
        springIdx + groups[groupIdx] + 1,
        groupIdx + 1,
        memo
      )
    );
  }

  if (springs[springIdx] === '?') {
    // result for '.'
    const result = countArrangements(
      springs,
      groups,
      springIdx + 1,
      groupIdx,
      memo
    );

    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs.substring(springIdx, springIdx + groups[groupIdx]).match(/\./) ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(result);
    }

    // result for '.' or '#'
    return memoize(
      result +
        countArrangements(
          springs,
          groups,
          springIdx + groups[groupIdx] + 1,
          groupIdx + 1,
          memo
        )
    );
  }
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (const line of data) {
    let [springs, groups] = line.split(' ');
    springs = Array(1).fill(springs.replace(/\.\.+/g, '.')).join('?');
    groups = Array(1).fill(groups.split(',')).flat().map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let sum = 0;
  for (const line of data) {
    let [springs, groups] = line.split(' ');
    springs = Array(5).fill(springs.replace(/\.\.+/g, '.')).join('?');
    groups = Array(5).fill(groups.split(',')).flat().map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
