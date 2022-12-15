import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let output = 0;

  const [rules, messages] = data.map((part) => part.split('\n'));

  const getRule = (id) => {
    const rule = rules.find((r) => r.startsWith(`${id}:`));
    return rule.substr(rule.indexOf(':') + 2);
  };

  const evalRule = (id) => {
    const rule = getRule(id);

    if (rule === '"a"') return 'a';
    if (rule === '"b"') return 'b';

    return `(${rule
      .replace(/\d+/g, (nestedRule) => `${evalRule(nestedRule)}`)
      .replace(/ /g, '')})`;
  };

  const pattern = new RegExp(`^${evalRule(0)}$`);

  for (const message of messages) {
    if (pattern.test(message)) {
      output += 1;
    }
  }

  return output;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let output = 0;
  const MAX_DEPTH = 5;

  const [rules, messages] = data.map((part) => part.split('\n'));

  rules[rules.findIndex((r) => r.startsWith('8:'))] = '8: 42 | 42 8';
  rules[rules.findIndex((r) => r.startsWith('11:'))] = '11: 42 31 | 42 11 31';

  const getRule = (id) => {
    const rule = rules.find((r) => r.startsWith(`${id}:`));
    return rule.substr(rule.indexOf(':') + 2);
  };

  const evalRule = (id, depth = 0) => {
    if (depth > MAX_DEPTH && [8, 11].includes(+id)) return '';

    const rule = getRule(id);

    if (rule === '"a"') return 'a';
    if (rule === '"b"') return 'b';

    return `(${rule
      .replace(/\d+/g, (nestedRule) => `${evalRule(nestedRule, depth + 1)}`)
      .replace(/ /g, '')})`;
  };

  const pattern = new RegExp(`^${evalRule(0)}$`);

  for (const message of messages) {
    if (pattern.test(message)) {
      output += 1;
    }
  }

  return output;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
