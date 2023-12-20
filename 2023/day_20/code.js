import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const gcf = (a, b) => (b == 0 ? a : gcf(b, a % b));

const lcm = (a, b) => (a / gcf(a, b)) * b;

const pressButton = (modules, pulses, cycles, count) => {
  let queue = [{ from: 'button', to: 'broadcaster', value: false }];
  if (pulses) pulses.low++;

  while (queue.length != 0) {
    let current = queue.shift();

    if (cycles != null && cycles[current.from] != null && current.value) {
      cycles[current.from] = count + 1;
    }

    if (modules[current.to] != null) {
      if (modules[current.to].type == 'BROADCASTER') {
        for (let module of modules[current.to].outputs) {
          if (pulses) {
            if (current.value) pulses.high++;
            else pulses.low++;
          }

          queue.push({ from: 'broadcaster', to: module, value: current.value });
        }
      } else if (modules[current.to].type == 'FLIPFLOP') {
        if (!current.value) {
          modules[current.to].current = !modules[current.to].current;
          for (let module of modules[current.to].outputs) {
            if (pulses) {
              if (modules[current.to].current) pulses.high++;
              else pulses.low++;
            }

            queue.push({
              from: current.to,
              to: module,
              value: modules[current.to].current,
            });
          }
        }
      } else if (modules[current.to].type == 'CONJUNCTION') {
        modules[current.to].memory[current.from] = current.value;
        const output = !Object.values(modules[current.to].memory).every(
          (value) => value
        );

        for (let module of modules[current.to].outputs) {
          if (pulses) {
            if (output) pulses.high++;
            else pulses.low++;
          }

          if (modules[module] != null)
            queue.push({ from: current.to, to: module, value: output });
        }
      }
    }
  }
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const modules = data.reduce((obj, line) => {
    const [module, outputs] = line.split(/ -> /);

    if (module == 'broadcaster')
      obj.broadcaster = { type: 'BROADCASTER', outputs: outputs.split(/, /) };
    else if (module[0] == '%')
      obj[module.slice(1)] = {
        type: 'FLIPFLOP',
        outputs: outputs.split(/, /),
        current: false,
      };
    else
      obj[module.slice(1)] = {
        type: 'CONJUNCTION',
        outputs: outputs.split(/, /),
        memory: {},
      };
    return obj;
  }, {});

  Object.entries(modules).forEach(([key, state]) => {
    for (let i = 0; i < state.outputs.length; i++) {
      if (
        modules[state.outputs[i]] != null &&
        modules[state.outputs[i]].type == 'CONJUNCTION'
      ) {
        modules[state.outputs[i]].memory[key] = false;
      }
    }
  });

  let pulses = { low: 0, high: 0 };

  for (let button = 0; button < 1000; button++) {
    pressButton(modules, pulses);
  }

  return pulses.low * pulses.high;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let final;
  const modules = data.reduce((obj, line) => {
    const [module, outputs] = line.split(/ -> /);

    if (module == 'broadcaster')
      obj.broadcaster = { type: 'BROADCASTER', outputs: outputs.split(/, /) };
    else if (module[0] == '%')
      obj[module.slice(1)] = {
        type: 'FLIPFLOP',
        outputs: outputs.split(/, /),
        current: false,
      };
    else
      obj[module.slice(1)] = {
        type: 'CONJUNCTION',
        outputs: outputs.split(/, /),
        memory: {},
      };

    if (outputs.includes('rx')) final = module.slice(1);
    return obj;
  }, {});

  Object.entries(modules).forEach(([key, state]) => {
    for (let i = 0; i < state.outputs.length; i++) {
      if (
        modules[state.outputs[i]] != null &&
        modules[state.outputs[i]].type == 'CONJUNCTION'
      ) {
        modules[state.outputs[i]].memory[key] = false;
      }
    }
  });

  let cycleCounts = Object.keys(modules[final].memory).reduce((obj, key) => {
    obj[key] = -1;
    return obj;
  }, {});

  let presses = 0;
  while (true) {
    pressButton(modules, null, cycleCounts, presses);
    presses++;

    if (Object.values(cycleCounts).every((count) => count != -1)) break;
  }

  return Object.values(cycleCounts).reduce(
    (multiple, num) => lcm(multiple, num),
    1
  );
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
