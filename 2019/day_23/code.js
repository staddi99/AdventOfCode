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
  static ADD = ADD;
  static MUL = MUL;
  static INP = INP;
  static OUT = OUT;
  static JIT = JIT;
  static JIF = JIF;
  static LTH = LTH;
  static EQU = EQU;
  static ARB = ARB;
  static STP = STP;

  static POSITION_MODE = POSITION_MODE;
  static IMMEDIATE_MODE = IMMEDIATE_MODE;
  static RELATIVE_MODE = RELATIVE_MODE;

  constructor({
    memory,
    inputs = [],
    defaultInput,
    pause_on = { [OUT]: true },
    address,
    clone_memory = false,
  }) {
    this.address = address;
    if (this.address !== inputs[0]) {
      throw new Error(
        `Invalid address: ${address}, inputs: ${JSON.stringify(inputs)}`
      );
    }

    this.original_memory = clone_memory && memory.slice(0);
    this.memory = memory.slice(0);
    this.pointer = 0;
    this.relative_base = 0;
    this.pause_on = pause_on;

    this.inputs = Array.isArray(inputs) ? inputs.slice(0) : [inputs];
    this.outputs = [];

    this.defaultInput = defaultInput;

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
          if (this.defaultInput && this.inputs.length === 0) {
            let default_input_value = this.defaultInput(this);
            this.inputs.push(default_input_value);
          }
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

      if (this.pause_on[op.name] || this.halted) {
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

class Network {
  constructor(program, nics_count = 50) {
    this.original_program = [...program];
    this.packet_queue = Array(nics_count)
      .fill()
      .map((_) => []);

    this.nics = Array(nics_count)
      .fill()
      .map((_, i) => {
        return new Computer({
          memory: program,
          inputs: [i],
          address: i,
          defaultInput: (computer) => {
            if (this.packet_queue[computer.address].length === 0) {
              return -1;
            } else {
              let packet = this.packet_queue[computer.address][0];
              if (packet.length === 2) {
                let x = packet.shift();
                return x;
              } else {
                let [y] = this.packet_queue[computer.address].shift();
                return y;
              }
            }
          },
          pause_on: {
            [Computer.OUT]: true,
            [Computer.INP]: true,
          },
        });
      });
  }

  packetQueueSize() {
    return this.packet_queue.reduce((sum, queue) => sum + queue.length, 0);
  }
}

import input from './input.js';

const inputArray = input.split(',').map((e) => parseInt(e));

export function partOne() {
  let network = new Network(inputArray);
  let break_on_address = 255;
  while (true) {
    for (let nic of network.nics) {
      let outputs = nic.run();
      if (outputs.length === 3) {
        let address = outputs.shift();
        let x = outputs.shift();
        let y = outputs.shift();

        if (address === break_on_address) {
          return { x, y };
        }
        network.packet_queue[address].push([x, y]);
      }
    }
  }
}

export function partTwo() {
  let network = new Network(inputArray);
  let nat_address = 255;
  let nat_packet;
  let last_nat_sent = [];

  const IDLE_RESET = 4;

  let idle = IDLE_RESET;
  while (true) {
    idle--;
    for (let nic of network.nics) {
      let outputs = nic.run();
      if (outputs.length === 3) {
        idle = IDLE_RESET;
        let address = outputs.shift();
        let x = outputs.shift();
        let y = outputs.shift();

        if (address === nat_address) {
          nat_packet = [x, y];
        } else {
          network.packet_queue[address].push([x, y]);
        }
      }
    }

    if (idle < 0 && network.packetQueueSize() === 0) {
      network.packet_queue[0].push(nat_packet);

      if (last_nat_sent[1] === nat_packet[1]) {
        return { x: nat_packet[0], y: nat_packet[1] };
      }

      last_nat_sent = [...nat_packet];
      idle = IDLE_RESET;
    }
  }
}

console.log('Part 1: ' + partOne().y);
console.log('Part 2: ' + partTwo().y);
