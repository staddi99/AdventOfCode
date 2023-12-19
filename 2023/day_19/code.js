import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let [workflows, ratings] = data;

  const map = {};
  for (const line of workflows.split('\n')) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (parts) => {
      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [left, right] = expr.split(op);
          if (op === '>' ? parts[left] > +right : parts[left] < +right) {
            return target;
          }
        } else {
          return rule;
        }
      }
    };
  }

  let sum = 0;
  for (const line of ratings.split('\n')) {
    const words = line.split(/\W/g).slice(1, -1);
    const parts = {};
    for (let i = 0; i < words.length; i += 2) {
      parts[words[i]] = +words[i + 1];
    }

    let curr = 'in';
    while (curr !== 'A' && curr !== 'R') {
      curr = map[curr](parts);
    }

    if (curr === 'A') {
      sum += Object.values(parts).reduce((acc, n) => acc + n);
    }
  }
  return sum;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const workflows = data[0].split(/\n/g).reduce((obj, line) => {
    let [name, rules] = line.replace(/[}]/g, '').split(/{/g);
    rules = rules.split(/,/);
    obj[name] = rules.slice(0, -1).map((rule) => {
      let [condition, send] = rule.split(/:/g);
      if (condition.includes('<'))
        return {
          type: 'LESSTHAN',
          left: condition.split(/</g)[0],
          right: parseInt(condition.split(/</g)[1]),
          value: send,
        };
      else
        return {
          type: 'GREATERTHAN',
          left: condition.split(/>/g)[0],
          right: parseInt(condition.split(/>/g)[1]),
          value: send,
        };
    });
    obj[name].push({ type: 'FINAL', value: rules[rules.length - 1] });
    return obj;
  }, {});

  let accepted = [];
  let queue = [
    {
      x: { start: 1, end: 4000 },
      m: { start: 1, end: 4000 },
      a: { start: 1, end: 4000 },
      s: { start: 1, end: 4000 },
      workflow: 'in',
    },
  ];
  while (queue.length != 0) {
    let current = queue.shift();
    for (let rule of workflows[current.workflow]) {
      if (rule.type == 'LESSTHAN') {
        let newState = structuredClone(current);
        newState[rule.left].end = rule.right - 1;
        current[rule.left].start = rule.right;
        newState.workflow = rule.value;

        if (rule.value == 'A') accepted.push(newState);
        else if (rule.value != 'R') queue.push(newState);
      } else if (rule.type == 'GREATERTHAN') {
        let newState = structuredClone(current);
        newState[rule.left].start = rule.right + 1;
        current[rule.left].end = rule.right;
        newState.workflow = rule.value;

        if (rule.value == 'A') accepted.push(newState);
        else if (rule.value != 'R') queue.push(newState);
      } else {
        let newState = structuredClone(current);
        newState.workflow = rule.value;

        if (rule.value == 'A') accepted.push(newState);
        else if (rule.value != 'R') queue.push(newState);
      }
    }
  }

  let sum = 0;
  for (let state of accepted) {
    sum += ['x', 'm', 'a', 's'].reduce((mul, value) => {
      mul *= state[value].end - state[value].start + 1;
      return mul;
    }, 1);
  }
  return sum;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
