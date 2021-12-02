class InfiniteGrid {
  constructor({ defaultFactory = (x, y) => 0, string_map = {} } = {}) {
    this.defaultFactory = defaultFactory;
    this.string_map = string_map;
    this.grid = new Map();
    this.max_x = -Infinity;
    this.min_x = Infinity;
    this.max_y = -Infinity;
    this.min_y = Infinity;
  }

  static toId(x, y) {
    return `${x},${y}`;
  }

  set(x, y, value) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error(
        `x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`
      );
    }
    if (x < this.min_x) this.min_x = x;
    if (x > this.max_x) this.max_x = x;
    if (y < this.min_y) this.min_y = y;
    if (y > this.max_y) this.max_y = y;
    const id = InfiniteGrid.toId(x, y);
    this.grid.set(id, value);
  }

  get(x, y) {
    const id = InfiniteGrid.toId(x, y);
    if (!this.grid.has(id)) {
      this.set(x, y, this.defaultFactory(x, y));
    }
    return this.grid.get(id);
  }

  toGrid() {
    let grid = [];
    for (let y = this.min_y; y <= this.max_y; y++) {
      let row = [];
      for (let x = this.min_x; x <= this.max_x; x++) {
        let cell = this.get(x, y);
        row.push(cell);
      }
      grid.push(row);
    }

    return grid;
  }

  sum() {
    let sum = 0;
    for (let value of this.grid.values()) {
      sum += value;
    }

    return sum;
  }

  toString() {
    let grid = this.toGrid();
    let rows = '';
    for (let y = 0; y < grid.length; y++) {
      let row = '';
      for (let x = 0; x < grid[y].length; x++) {
        let cell = grid[y][x];
        let cell_string =
          cell in this.string_map ? this.string_map[cell] : String(cell);
        row += cell_string;
      }
      rows += rows.length ? '\n' + row : row;
    }

    return rows;
  }
}

const ADD = '01'; // Add
const MUL = '02'; // Multiply
const INP = '03'; // Input
const OUT = '04'; // Output
const JIT = '05'; // Jump-if-true
const JIF = '06'; // Jump-if-false
const LTH = '07'; // Less Than
const EQU = '08'; // Equals
const ARB = '09'; // Adjust relative base
const STP = '99'; // Stop

const POSITION_MODE = '0';
const IMMEDIATE_MODE = '1';
const RELATIVE_MODE = '2';

class Computer {
  constructor({
    memory,
    inputs = [],
    replenish_input = undefined,
    pause_on_output = true,
    id = 0,
    clone_memory = false,
  }) {
    this.id = String.fromCharCode('A'.charCodeAt(0) + id);

    this.original_memory = clone_memory && memory.slice(0);
    this.memory = memory.slice(0);
    this.pointer = 0;
    this.relative_base = 0;
    this.pause_on_output = pause_on_output;

    this.inputs = Array.isArray(inputs) ? inputs.slice(0) : [inputs];
    this.replenish_input = replenish_input;
    this.outputs = [];

    this.parseOpTime = 0;

    this.OPS = {
      [ADD]: {
        name: ADD,
        realName: 'ADD',
        params: 3,
        fn: (a, b, c) => {
          this.memory[c] = a + b;
        },
        write: true,
      },

      [MUL]: {
        name: MUL,
        realName: 'MUL',
        params: 3,
        fn: (a, b, c) => {
          this.memory[c] = a * b;
        },
        write: true,
      },

      [INP]: {
        name: INP,
        realName: 'INP',
        params: 1,
        fn: (a) => {
          this.memory[a] = this.inputs.shift();
          if (this.replenish_input !== undefined) {
            this.inputs.push(this.replenish_input);
          }
        },
        write: true,
      },

      [OUT]: {
        name: OUT,
        realName: 'OUT',
        params: 1,
        fn: (a) => this.output(a),
      },

      [ARB]: {
        name: ARB,
        realName: 'ARB',
        params: 1,
        fn: (a) => (this.relative_base += a),
      },

      [STP]: {
        name: STP,
        realName: 'STP',
        params: 0,
        fn: () => (this.halted = true),
      },

      [JIT]: {
        name: JIT,
        realName: 'JIT',
        params: 2,
        fn: (a, b) => {
          if (a) {
            this.pointer = b;
            return true;
          }
          return false;
        },
        jumps: true,
      },

      [JIF]: {
        name: JIF,
        realName: 'JIF',
        params: 2,
        fn: (a, b) => {
          if (!a) {
            this.pointer = b;
            return true;
          }
          return false;
        },
        jumps: true,
      },

      [LTH]: {
        name: LTH,
        realName: 'LTH',
        params: 3,
        fn: (a, b, c) => {
          this.memory[c] = a < b ? 1 : 0;
        },
        write: true,
      },

      [EQU]: {
        name: EQU,
        realName: 'EQU',
        params: 3,
        fn: (a, b, c) => {
          this.memory[c] = a === b ? 1 : 0;
        },
        write: true,
      },
    };

    const ops_list = Object.values(this.OPS);
    const max_params = Math.max(...ops_list.map((v) => v.params));
    const shared_modes = Array(max_params).fill('0');

    for (let op of ops_list) {
      op.modes = shared_modes;
      op.values = Array(op.params).fill(0);
    }

    this.halted = false;
  }

  run() {
    let op = this.parseOp();

    while (!this.halted) {
      this.runOp(op);

      if ((this.pause_on_output && op.name === OUT) || this.halted) {
        break;
      }

      op = this.parseOp();
    }

    return this.outputs;
  }

  parseOp() {
    let temp_op = String(this.memory[this.pointer]).padStart(2, '0');

    let op = this.OPS[temp_op.substr(-2, 2)];

    let full_op = temp_op.padStart(op.params + 2, '0');

    for (let i = op.params - 1; i >= 0; i--) {
      op.modes[Math.abs(i - op.params + 1)] = full_op[i];
    }

    return op;
  }

  runOp({ modes, values, params, fn, jumps, write }) {
    this.pointer++;
    for (let i = 0; i < params; i++) {
      let mode = modes[i];
      let value = this.memory[this.pointer + i];

      if (value === undefined) {
        value = 0;
      }

      if (mode !== IMMEDIATE_MODE) {
        const can_switch_to_position = !write || i < params - 1;

        if (can_switch_to_position && mode === POSITION_MODE) {
          value = this.memory[value];
        } else if (mode === RELATIVE_MODE) {
          if (can_switch_to_position) {
            value = this.memory[value + this.relative_base];
          } else {
            value = value + this.relative_base;
          }
        }
      }

      if (value === undefined) {
        value = 0;
      }

      values[i] = value;
    }

    let result;

    switch (params) {
      case 0:
        result = fn();
        break;
      case 1:
        result = fn(values[0]);
        break;
      case 2:
        result = fn(values[0], values[1]);
        break;
      case 3:
        result = fn(values[0], values[1], values[2]);
        break;
      default:
        result = fn(...values);
        break;
    }

    if (!jumps || (jumps && !result)) {
      this.pointer += params;
    }
  }

  output(v) {
    this.outputs.push(v);
  }

  get _() {
    return this.memory.slice(Math.max(0, this.pointer - 1), this.pointer + 8);
  }
}

class TractorBeam {
  constructor(memory, options = {}) {
    this.memory = memory.slice(0);
    this.grid = new InfiniteGrid({ string_map: { 1: '#', 0: '.' } });
  }

  calculateNewEdges(bottom_edge, top_edge, allow_for_bottom_jumps = true) {
    let output;

    if (bottom_edge) {
      do {
        bottom_edge.y++;
        output = this.computeAt(bottom_edge.x, bottom_edge.y);
        this.grid.set(bottom_edge.x, bottom_edge.y, output);
      } while (output === 1);

      do {
        bottom_edge.x++;
        output = this.computeAt(bottom_edge.x, bottom_edge.y);
        this.grid.set(bottom_edge.x, bottom_edge.y, output);
      } while (output === 0);
    }

    if (top_edge) {
      do {
        top_edge.y++;
        do {
          top_edge.x++;
          output = this.computeAt(top_edge.x, top_edge.y);
          this.grid.set(top_edge.x, top_edge.y, output);
        } while (output === 1);
      } while (allow_for_bottom_jumps && top_edge.y !== bottom_edge.y);

      top_edge.x--;
    }
  }

  getWidth(bottom_edge, top_edge) {
    return top_edge.x - bottom_edge.x + 1;
  }

  computeAt(x, y) {
    let computer = new Computer({ memory: this.memory, inputs: [x, y] });
    let [output] = computer.run();

    return output;
  }
}

import input from './input.js';

const inputArray = input.split(',').map((e) => parseInt(e));

function partOne() {
  let tractor_beam = new TractorBeam(inputArray);
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      let output = tractor_beam.computeAt(x, y);

      tractor_beam.grid.set(x, y, output);
    }
  }

  return tractor_beam.grid.sum();
}

function partTwo() {
  let tractor_beam = new TractorBeam(inputArray);
  tractor_beam.grid.set(0, 0, 1);
  let square_size = 100;
  let start;
  let col = 1;
  let x = 1;
  let y = 0;
  while (!start) {
    let output = tractor_beam.computeAt(x, y);

    if (output === 1) {
      tractor_beam.grid.set(x, y, 1);
      start = { x, y };
      break;
    }

    if (x === 0) {
      x = ++col;
      y = 0;
    } else {
      x--;
      y++;
    }
  }

  let top_edge = { ...start };
  let found_top_left;
  while (!found_top_left) {
    let bottom_left_x = top_edge.x - square_size + 1;
    let bottom_left_y = top_edge.y + square_size - 1;
    let output = tractor_beam.computeAt(bottom_left_x, bottom_left_y);
    tractor_beam.grid.set(x, y, output);
    if (output) {
      found_top_left = { x: bottom_left_x, y: top_edge.y };
    } else {
      tractor_beam.calculateNewEdges(undefined, top_edge, false);
    }
  }

  return found_top_left.x * 10000 + found_top_left.y;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
