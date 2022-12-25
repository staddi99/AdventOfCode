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
  constructor(
    memory,
    inputs,
    pause_on_output = true,
    id = 0,
    clone_memory = false
  ) {
    this.id = String.fromCharCode('A'.charCodeAt(0) + id);

    this.original_memory = clone_memory && memory.slice(0);
    this.memory = memory.slice(0);
    this.pointer = 0;
    this.relative_base = 0;
    this.pause_on_output = pause_on_output;

    this.inputs = Array.isArray(inputs) ? inputs.slice(0) : [inputs];
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

class Circuit {
  constructor(memory, phase_settings, circuit_size = 5) {
    this.memory = memory;
    this.phase_settings = phase_settings;
    this.circuit = Array(circuit_size)
      .fill()
      .map((c, i) => {
        let phase_setting = [phase_settings[i]];
        if (i === 0) {
          phase_setting.push(0);
        }

        return new Computer(memory, phase_setting, i);
      });

    this.current_computer = 0;
  }

  run() {
    let computer = this.circuit[this.current_computer];
    let output, last_output;

    while (!computer.halted) {
      let new_output = computer.run();
      if (computer.halted) {
        break;
      }

      output = new_output;

      let next_computer = this.moveToNextComputer();

      last_output = output.shift();
      next_computer.inputs.push(last_output);

      computer = next_computer;
    }

    return last_output;
  }

  moveToNextComputer() {
    this.current_computer++;
    this.current_computer %= this.circuit.length;

    return this.circuit[this.current_computer];
  }
}

import input from './input.js';

const inputArray = input.split(',').map((e) => parseInt(e));

export function partOne() {
  let computer = new Computer(inputArray, [1]);
  return computer.run()[0];
}

export function partTwo() {
  let computer = new Computer(inputArray, [2]);
  return computer.run()[0];
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
