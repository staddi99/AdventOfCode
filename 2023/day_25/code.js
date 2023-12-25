import input from './input.js';
import inputSample from './inputSample.js';
// import { writeFileSync } from 'node:fs';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

function getGroup(map, key) {
  function addKeys(keys, group) {
    for (const k of keys) {
      if (!group.has(k)) {
        group.add(k);
        addKeys(map[k], group);
      }
    }
  }

  const group = new Set([key]);
  addKeys(map[key], group);
  return group;
}

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  const con = isTest
    ? [
        ['hfx', 'pzl'],
        ['bvb', 'cmg'],
        ['nvd', 'jqt'],
      ]
    : [
        ['klk', 'xgz'],
        ['bvz', 'nvf'],
        ['cbl', 'vmq'],
      ];

  const map = {};
  // const digraph = ['digraph D {'];
  for (const line of data) {
    const [left, ...right] = line.match(/\w+/g);
    map[left] ??= new Set();
    // digraph.push(`  ${left} -> {${right.join(', ')}}`);
    for (const r of right) {
      map[left].add(r);
      map[r] ??= new Set();
      map[r].add(left);
    }
  }
  // digraph.push('}');
  // writeFileSync('day-25.dot', digraph.join('\n'));
  // run `dot -Tsvg day-25.dot -o day-25.svg` to generate svg

  // find 3 pairs connecting 2 blobs
  // klk -> xgz
  // bvz -> nvf
  // cbl -> vmq
  for (const [a, b] of con) {
    map[a].delete(b);
    map[b].delete(a);
  }
  const keys = Object.keys(map);
  const group = getGroup(map, keys[0]);
  return group.size * (keys.length - group.size);
}

console.log('Part 1: ' + partOne());
