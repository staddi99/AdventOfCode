import input from './input.js';
import inputSample from './inputSample.js';

import { init } from 'z3-solver';

const { Context, em } = await init();
const Z3 = Context('main');

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const range = [200000000000000, 400000000000000];

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const hailstones = data.map((line) => line.match(/-?\d+/g).map(Number));

  let count = 0;
  for (let i = 0; i < hailstones.length - 1; i++) {
    const [x1, y1, z1, vx1, vy1, vz1] = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const [x2, y2, z2, vx2, vy2, vz2] = hailstones[j];

      const t2 =
        (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1);
      const t1 =
        (y2 - y1 + (vy2 * (x1 - x2)) / vx2) / (vy1 - (vy2 * vx1) / vx2);
      const x = x2 + vx2 * t2;
      const y = y2 + vy2 * t2;
      if (
        t1 > 0 &&
        t2 > 0 &&
        x >= range[0] &&
        x <= range[1] &&
        y >= range[0] &&
        y <= range[1]
      ) {
        count++;
      }
    }
  }
  return count;
}

export async function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const hailstones = data.map((line) => line.match(/-?\d+/g).map(Number));

  const solver = new Z3.Solver();
  const x = Z3.Int.const('x');
  const y = Z3.Int.const('y');
  const z = Z3.Int.const('z');
  const vx = Z3.Int.const('vx');
  const vy = Z3.Int.const('vy');
  const vz = Z3.Int.const('vz');
  for (let i = 0; i < 3; i++) {
    const [x1, y1, z1, vx1, vy1, vz1] = hailstones[i];

    const t = Z3.Int.const(`t${i}`);
    solver.add(x.add(vx.mul(t)).eq(t.mul(vx1).add(x1)));
    solver.add(y.add(vy.mul(t)).eq(t.mul(vy1).add(y1)));
    solver.add(z.add(vz.mul(t)).eq(t.mul(vz1).add(z1)));
  }
  await solver.check();
  const model = solver.model();

  em.PThread.terminateAllThreads();

  return [x, y, z]
    .map((p) => +model.get(p).toString())
    .reduce((acc, n) => acc + n);
}

console.log('Part 1: ' + partOne());
partTwo().then((res) => console.log('Part 2: ' + res));
