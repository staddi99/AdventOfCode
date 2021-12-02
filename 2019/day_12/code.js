import G from 'generatorics';

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const _lcm = (a, b) => {
  if (b === 0) return 0;
  return (a * b) / gcd(a, b);
};

const lcm = (...args) => args.reduce((a, b) => _lcm(a, b));

class Moon {
  constructor([x, y, z]) {
    this.initial_x = x;
    this.x = x;
    this.vx = 0;

    this.initial_y = y;
    this.y = y;
    this.vy = 0;

    this.initial_z = z;
    this.z = z;
    this.vz = 0;
  }

  move(dimensions) {
    for (let dimension of dimensions) {
      let velocity = `v${dimension}`;
      this[dimension] += this[velocity];
    }
  }

  getPotentialEnergy() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  getKineticEnergy() {
    return Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz);
  }

  getTotalEnergy() {
    return this.getPotentialEnergy() * this.getKineticEnergy();
  }

  toString() {
    return `${this.x},${this.y},${this.z},${this.vx},${this.vy},${this.vz}`;
  }

  atStart(dimension) {
    const position = this[dimension];
    const initial_position = this[`initial_${dimension}`];
    const velocity = this[`v${dimension}`];

    return position === initial_position && velocity === 0;
  }
}

class Moons {
  constructor(moons) {
    this.moons = moons.map((moon_position) => new Moon(moon_position));
    this.time = 0;

    this.time_dimensions = { x: 0, y: 0, z: 0 };
  }

  applyGravity(dimensions = ['x', 'y', 'z']) {
    for (let pair of G.combination(this.moons, 2)) {
      Moons.applyGravityToTwoMoons(pair, dimensions);
    }
  }

  static applyGravityToTwoMoons([moon_a, moon_b], dimensions) {
    for (let position of dimensions) {
      let velocity = `v${position}`;

      if (moon_a[position] > moon_b[position]) {
        moon_a[velocity]--;
        moon_b[velocity]++;
      } else if (moon_a[position] < moon_b[position]) {
        moon_a[velocity]++;
        moon_b[velocity]--;
      }
    }
  }

  updatePositions(dimensions = ['x', 'y', 'z']) {
    for (let moon of this.moons) {
      moon.move(dimensions);
    }
  }

  getTotalEnergy() {
    return this.moons
      .map((moon) => moon.getTotalEnergy())
      .reduce((a, b) => a + b, 0);
  }
}

import input from './input.js';

const strsToInts = (...nums) => nums.map((n) => parseInt(n, 10));
const inputArray = input.split('\n').map((line) => {
  let [, x, y, z] = /^\<x=(-?\d+), y=(-?\d+), z=(-?\d+)\>$/.exec(line);
  [x, y, z] = strsToInts(x, y, z);
  return [x, y, z];
});

function partOne() {
  let system = new Moons(inputArray);

  do {
    system.applyGravity();
    system.updatePositions();
    system.time++;
  } while (system.time < 1000);

  return system.getTotalEnergy();
}

function partTwo() {
  let system = new Moons(inputArray);

  for (let dimension of ['x', 'y', 'z']) {
    let at_start = false;
    while (!at_start) {
      system.applyGravity([dimension]);
      system.updatePositions([dimension]);
      system.time_dimensions[dimension]++;

      at_start = system.moons.every((moon) => moon.atStart(dimension));
    }
  }

  return lcm(...Object.values(system.time_dimensions));
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
