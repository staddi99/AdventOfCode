import readline from 'readline';
import colors from 'colors';
const { green, cyan } = colors;

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

    let modes = [];

    for (let i = op.params - 1; i >= 0; i--) {
      modes.push(full_op[i]);
    }

    return {
      ...op,
      modes,
    };
  }

  runOp({ modes, fn, jumps, write }) {
    this.pointer++;
    let values = [];
    for (let i = 0; i < modes.length; i++) {
      let mode = modes[i];
      let value = this.memory[this.pointer + i];

      if (value === undefined) {
        value = 0;
      }

      if (mode !== IMMEDIATE_MODE) {
        const can_switch_to_position = !write || i < modes.length - 1;

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

      values.push(value);
    }

    let result = fn(...values);

    if (!jumps || (jumps && !result)) {
      this.pointer += modes.length;
    }
  }

  output(v) {
    this.outputs.push(v);
  }

  get _() {
    return this.memory.slice(Math.max(0, this.pointer - 1), this.pointer + 8);
  }
}

const EMPTY = 0;
const WALL = 1;
const BLOCK = 2;
const PADDLE = 3;
const BALL = 4;
const DRAW_MAP = {
  [EMPTY]: ' ',
  [WALL]: '+',
  [BLOCK]: '#',
  [PADDLE]: '=',
  [BALL]: 'o',
};

class Tile {
  constructor(x, y, tile_id) {
    this.x = x;
    this.y = y;
    this.tile_id = tile_id;
  }

  toString() {
    return DRAW_MAP[this.tile_id] || ' ';
  }
}

class Grid {
  constructor(tiles) {
    this.grid = {};
    this.tiles = tiles;
    tiles.forEach((tile) => {
      const { x, y } = tile;
      this.grid[`${x},${y}`] = tile;
    });

    this.boundaries = this.setBoundariesFromTiles();
  }

  getNumberOfTilesOfType(type) {
    return this.tiles.filter((tile) => tile.tile_id === type).length;
  }

  printGrid() {
    let screen = '';
    let [min_x, max_x] = this.boundaries.x;
    let [min_y, max_y] = this.boundaries.y;

    for (let y = min_y; y <= max_y; y++) {
      for (let x = min_x; x <= max_x; x++) {
        let coord = `${x},${y}`;
        screen += this.grid[coord].toString();
      }
      screen += '\n';
    }

    console.log(screen);
  }

  setBoundariesFromTiles() {
    let tiles_x_sorted = this.tiles.sort((a, b) => a.x - b.x);
    let x = [tiles_x_sorted[0].x, tiles_x_sorted[tiles_x_sorted.length - 1].x];

    let tiles_y_sorted = this.tiles.sort((a, b) => a.y - b.y);
    let y = [tiles_y_sorted[0].y, tiles_y_sorted[tiles_y_sorted.length - 1].y];

    return { x, y };
  }
}

class Screen {
  constructor(boundaries = { x: [0, 37], y: [0, 20] }) {
    this.grid = {};
    this.score = 0;
    this.paddle;

    this.boundaries = boundaries;
  }

  paint(x, y, tile_id) {
    if (x === -1 && y === 0) {
      return (this.score = tile_id);
    }

    const coord = x + ',' + y;
    if (!this.grid[coord]) {
      this.grid[coord] = new Tile(x, y);
    }

    this.grid[coord].tile_id = tile_id;

    if (tile_id === PADDLE) {
      this.paddle = this.grid[coord];
    }
  }

  toString() {
    let screen = '';
    let [min_x, max_x] = this.boundaries.x;
    let [min_y, max_y] = this.boundaries.y;

    for (let y = min_y; y <= max_y; y++) {
      for (let x = min_x; x <= max_x; x++) {
        let coord = `${x},${y}`;
        let tile = this.grid[coord] || ' ';
        screen += tile.toString();
      }
      if (y === min_y) {
        screen += ' Score: ' + this.score;
      }
      screen += '\n';
    }

    return screen;
  }
}

const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

class Arcade {
  constructor(memory, options = {}) {
    this.computer = new Computer({
      memory,
      pause_on_output: false,
      ...options,
    });
    this.grid;
    this.screen = new Screen();
    this.print_game = options.print_game;

    if (this.print_game) {
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearLine(process.stdout);
    }
  }

  runAndGetGrid() {
    let computer = this.computer;
    let output = this.computer.outputs;

    while (!computer.halted) {
      output = computer.run();
      if (computer.halted) {
        break;
      }
    }

    let tiles = [];
    for (let i = 0; i < output.length - 2; i += 3) {
      let x = output[i];
      let y = output[i + 1];
      let tile_id = output[i + 2];

      tiles.push(new Tile(x, y, tile_id));
    }

    this.grid = new Grid(tiles);
    return this.grid;
  }

  async print(ms) {
    readline.cursorTo(process.stdout, 0, 0);
    console.log(this.screen.toString());
    await wait(ms);
  }

  freePlay() {
    let computer = this.computer;
    let output = this.computer.outputs;

    while (!computer.halted) {
      output = computer.run();
      if (computer.halted) {
        break;
      }

      if (output.length >= 3) {
        const x = output.shift();
        const y = output.shift();
        const tile_id = output.shift();
        let ms = 0;
        if (tile_id === BALL && this.screen.paddle) {
          ms = 3;
          if (x < this.screen.paddle.x) {
            computer.inputs[0] = -1;
          } else if (x > this.screen.paddle.x) {
            computer.inputs[0] = 1;
          }
        }
        this.screen.paint(x, y, tile_id);

        if (this.print_game) {
          this.print(ms);
        }
      }
    }

    return this.screen.score;
  }
}

import input from './input.js';

const inputArray = input.split(',').map((e) => parseInt(e));
const TYPES = { EMPTY, WALL, BLOCK, PADDLE, BALL };

function partOne() {
  let arcade = new Arcade(inputArray);
  let grid = arcade.runAndGetGrid();
  return grid.getNumberOfTilesOfType(TYPES.BLOCK);
}

function partTwo() {
  inputArray[0] = 2;
  let arcade = new Arcade(inputArray, {
    print_game: false,
    pause_on_output: true,
    replenish_input: 0,
  });
  return arcade.freePlay();
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
