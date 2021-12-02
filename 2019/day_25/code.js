import input from './input.js';
import dedent from 'dedent';

const expandMemory = (nums, pos) =>
  pos >= nums.length &&
  nums.push(...[...'0'.repeat(pos - nums.length + 1)].map(Number));

const getAtAddress = (nums, pos) => (expandMemory(nums, pos), nums[pos]);

const setAtAddress = (nums, base, mode, pos, value) => {
  pos = mode === 2 ? pos + base : pos;
  expandMemory(nums, pos);
  nums[pos] = value;
};

const getNum = (nums, base, mode, num) =>
  mode === 1 ? num : getAtAddress(nums, num + (mode === 2 ? base : 0));

const OPS = {
  1: {
    fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
      setAtAddress(
        nums,
        base,
        modeAddress,
        address,
        getNum(nums, base, mode1, num1) + getNum(nums, base, mode2, num2)
      ),
    params: 3,
  },
  2: {
    fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
      setAtAddress(
        nums,
        base,
        modeAddress,
        address,
        getNum(nums, base, mode1, num1) * getNum(nums, base, mode2, num2)
      ),
    params: 3,
  },
  3: {
    fn: (nums, base, [modeAddress], address, input) =>
      setAtAddress(nums, base, modeAddress, address, input.shift()),
    params: 1,
    input: true,
  },
  4: {
    fn: (nums, base, [mode], num) => getNum(nums, base, mode, num),
    params: 1,
    output: true,
  },
  5: {
    fn: (nums, base, [mode1, mode2], num1, num2) =>
      getNum(nums, base, mode1, num1) ? getNum(nums, base, mode2, num2) : null,
    params: 2,
    flow: true,
  },
  6: {
    fn: (nums, base, [mode1, mode2], num1, num2) =>
      !getNum(nums, base, mode1, num1) ? getNum(nums, base, mode2, num2) : null,
    params: 2,
    flow: true,
  },
  7: {
    fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
      setAtAddress(
        nums,
        base,
        modeAddress,
        address,
        getNum(nums, base, mode1, num1) < getNum(nums, base, mode2, num2)
          ? 1
          : 0
      ),
    params: 3,
  },
  8: {
    fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
      setAtAddress(
        nums,
        base,
        modeAddress,
        address,
        getNum(nums, base, mode1, num1) === getNum(nums, base, mode2, num2)
          ? 1
          : 0
      ),
    params: 3,
  },
  9: {
    fn: (nums, base, [mode], num) => base + getNum(nums, base, mode, num),
    params: 1,
    base: true,
  },
};

const readOp = (code) =>
  code
    .toString()
    .padStart(5, '0')
    .match(/(\d)(\d)(\d)(\d\d)/u)
    .slice(1)
    .map(Number)
    .reverse();

const parseInput = (input) =>
  Array.isArray(input)
    ? input
    : isString(input)
    ? [...input].map((c) => c.charCodeAt(0))
    : [input];

function* intcode(program, input) {
  input = parseInput(input);
  let base = 0;
  let pos = 0;
  while (program[pos] !== 99) {
    const [op, ...modes] = readOp(program[pos]);
    const params = program.slice(pos + 1, pos + 1 + OPS[op].params);
    if (OPS[op].input) {
      const inp = yield;
      if (inp != null) input = parseInput(inp);
    }
    const result = OPS[op].fn(program, base, modes, ...params, input);
    if (OPS[op].output) yield result;
    if (OPS[op].base) base = result;
    pos = OPS[op].flow && result != null ? result : pos + 1 + OPS[op].params;
  }
}

const parse = (str) => str.split(',').map(Number);

const minBy = (cb) => (a, b) => cb(b) < cb(a) ? b : a;

const dijkstra = (graph, source, dest, cbNeighbors) => {
  const allKeys = new Set([source]);
  const nodes = new Set([source]);
  const dist = new Map();
  const prev = new Map();

  const getDist = (key) => (dist.has(key) ? dist.get(key) : Infinity);
  dist.set(source, 0);

  while (nodes.size) {
    const closest = [...nodes].reduce(minBy((n) => getDist(n)));
    if (dest && closest === dest) {
      return [dist.get(dest), toPath(prev, source, dest)];
    }
    nodes.delete(closest);
    const neighbors = cbNeighbors
      ? cbNeighbors(graph, closest)
      : graph[closest];
    neighbors.forEach((neighbor) => {
      if (!allKeys.has(neighbor)) {
        allKeys.add(neighbor);
        nodes.add(neighbor);
      }
      const alt = getDist(closest) + 1;
      if (alt < getDist(neighbor)) {
        dist.set(neighbor, alt);
        prev.set(neighbor, closest);
      }
    });
  }

  return dest ? [] : [dist, prev];
};

const toPath = (prev, source, dest) => {
  const path = [];
  let current;
  do {
    current = current ? prev.get(current) : dest;
    path.unshift(current);
  } while (current !== source);
  return path;
};

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const sortBy =
  (...cbs) =>
  (a, b) => {
    for (const cb of cbs) {
      const aa = cb(a);
      const bb = cb(b);
      const diff = cb.desc
        ? isString(aa)
          ? bb.localeCompare(aa)
          : bb - aa
        : isString(aa)
        ? aa.localeCompare(bb)
        : aa - bb;
      if (diff !== 0) return diff;
    }
    return 0;
  };

const getAllSubsets = (arr) =>
  arr.reduce(
    (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
    [[]]
  );

const obj = [
  'Arguments',
  'Function',
  'String',
  'Number',
  'Date',
  'RegExp',
].reduce(
  (obj, name) => ({
    ...obj,
    [`is${name}`]: (a) =>
      Object.prototype.toString.call(a) === `[object ${name}]`,
  }),
  {
    isArray: Array.isArray,
    isGenerator: (a) =>
      a instanceof
      function* () {
        yield;
      }.constructor,
  }
);

const {
  isString,
} = obj;

const run = function* () {
  let value, done;
  const program = intcode(parse(input));
  let output = '';
  while (!done) {
    ({ value, done } = program.next());
    if (value) output += String.fromCharCode(value);
    if (output.endsWith('Command?\n')) {
      const input = yield output;
      program.next();
      program.next(input && input.trim() + '\n');
      output = '';
    }
  }
  yield output;
};

const BAD_ITEMS = [
  'infinite loop',
  'photons',
  'escape pod',
  'giant electromagnet',
  'molten lava',
];

const OPPOSITES = {
  north: 'south',
  south: 'north',
  east: 'west',
  west: 'east',
};

function partOne() {
  const runPartOne = function* () {
    let input;
    let value, done;
    const program = run();
    let output = '';
    let isAuto = true;
    let isFirst = true;

    let currentRoom;
    let currentDirections;
    let currentItems;
    let takeableItems;

    const graph = {};
    let path = [];
    let testItems = false;

    const outputCmd = (cmd) => (output += '\n>' + cmd + '\n');

    const runCmd = (cmd) => {
      outputCmd(cmd);
      const value = program.next(cmd).value;
      output += value;
      return value;
    };

    const runItemTest = function* () {
      const [direction] = Object.entries(graph[currentRoom]).find(
        ([_, room]) => room === 'Pressure-Sensitive Floor'
      );
      const value = runCmd('inv');
      const match = value.match(
        /Items in your inventory:\n((?:- [a-z ]+\n)+)/imu
      );
      const itemsArray = match
        ? match[1]
            .split('\n')
            .filter(Boolean)
            .map((i) => i.slice(2).trim())
        : [];
      const items = new Set(itemsArray);
      const droppedItems = new Set();
      yield output.trim();

      const dropItem = (item) => {
        droppedItems.add(item);
        items.delete(item);
        return runCmd('drop ' + item);
      };

      const takeItem = (item) => {
        droppedItems.delete(item);
        items.add(item);
        return runCmd('take ' + item);
      };

      const dropItems = function* (items) {
        for (const item of items) {
          dropItem(item);
          yield output.trim();
        }
      };

      const subsets = getAllSubsets(itemsArray)
        .filter((arr) => arr.length)
        .sort(sortBy((arr) => arr.length));

      while (true) {
        for (const set of subsets) {
          yield* dropItems([...items].filter((i) => !set.includes(i)));
          for (const item of set) {
            if (items.has(item)) continue;
            takeItem(item);
            yield output.trim();
          }
          const value = runCmd(direction);
          yield output.trim();
          if (value.match(/Analysis complete! You may proceed\./mu)) {
            return value.match(
              /Oh, hello! You should be able to get in by typing (([0-9])+)/mu
            )[1];
          }
        }
      }
    };

    while (!done) {
      ({ value, done } = program.next(input));
      if (!value) break;

      let match = value.match(/== ([a-z- ]+) ==/imu);
      if (match) {
        if (isAuto && !isFirst) {
          graph[currentRoom][input] = match[1];
          if (!graph[match[1]]) graph[match[1]] = {};
          graph[match[1]][OPPOSITES[input]] = currentRoom;
        }

        if (match[1] !== 'Pressure-Sensitive Floor') {
          currentRoom = match[1];
          match = value.match(/Doors here lead:\n((?:- [a-z]+\n)+)/mu);
          currentDirections = match[1]
            .trim()
            .split('\n')
            .map((d) => d.slice(2).trim());

          match = value.match(/Items here:\n((?:- [a-z- ]+\n)+)/imu);
          currentItems = takeableItems = match
            ? match[1]
                .trim()
                .split('\n')
                .map((i) => i.slice(2).trim())
            : [];
          takeableItems = currentItems.filter((i) => !BAD_ITEMS.includes(i));

          isAuto &&
            !isFirst &&
            currentDirections
              .filter((d) => !graph[currentRoom][d])
              .forEach((d) => (graph[currentRoom][d] = null));
        }
      }

      output += value;
      input = null;

      while (!input) {
        input = yield output.trim();
        input = input && input.trim().toLowerCase();

        if (isAuto && !isFirst) {
          if (!testItems && takeableItems.length) {
            input = 'take ' + takeableItems.pop();
          } else {
            const [direction] =
              Object.entries(graph[currentRoom]).find(([_, room]) => !room) ||
              [];
            if (direction) {
              input = direction;
              path.push(OPPOSITES[direction]);
            } else if (path.length) {
              input = path.pop();
              if (!input.match(/(north|east|south|west)/u)) {
                input = Object.entries(graph[currentRoom]).find(
                  ([_, room]) => room === input
                )[0];
              }
            } else if (testItems) {
              let res = yield* runItemTest();
              return res;
            } else {
              path = dijkstra(
                graph,
                currentRoom,
                'Security Checkpoint',
                (graph, key) => Object.values(graph[key])
              )[1]
                .slice(1)
                .reverse();
              testItems = true;
            }
          }
        }

        if (input) outputCmd(input);
        if (
          input === 'take infinite loop' &&
          currentItems.includes('infinite loop')
        ) {
          yield 'interval';
          while (true) {
            outputCmd(input);
            yield output.trim();
          }
        } else if (isAuto && isFirst) {
          isFirst = false;
          graph[currentRoom] = currentDirections.reduce(
            (acc, d) => ({ ...acc, [d]: null }),
            {}
          );
          input = '';
          yield 'interval';
        } else if (input === 'help') {
          output +=
            '\n' +
            dedent`
            Move with commands "north", "east", "south", "west"

            Pickup items with "take <item>"

            Drop items with "drop <item>"

            View inventory with "inv"

            Auto solve with "auto"
          ` +
            '\n';
          input = '';
        }
      }
    }
  };

  let program = runPartOne();
  let res = program.next();
  while (!res.done) {
    res = program.next();
  }

  return res.value;
}

function partTwo() {
  return 'Advent of Code 2019 Complete!';
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
