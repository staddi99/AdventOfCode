const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const coordToAngle = ([x, y]) => {
  let deg = (Math.atan2(-y, x) * 180) / Math.PI;

  if (deg <= 90 && deg >= 0) {
    deg = Math.abs(deg - 90);
  } else if (deg < 0) {
    deg = Math.abs(deg) + 90;
  } else {
    deg = 450 - deg;
  }

  return deg;
};

class Grid {
  constructor(input) {
    this.grid = JSON.parse(JSON.stringify(input));
    this.asteroids = this.getAsteroidsList();

    this.min_x = 0;
    this.min_y = 0;
    this.max_x = this.grid[0].length - 1;
    this.max_y = this.grid.length - 1;
  }

  getAsteroidsList() {
    let asteroids = [];
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x]) {
          asteroids.push([x, y]);
        }
      }
    }

    return asteroids;
  }

  getVectorsFromPoint(coord, sorted_clockwise = false) {
    let slopes = {};
    const [x1, y1] = coord;

    for (let y2 = 0; y2 <= this.max_y; y2++) {
      for (let x2 = 0; x2 <= this.max_x; x2++) {
        if (x1 === x2 && y1 === y2) {
          continue;
        }

        let dy = y2 - y1;
        let dx = x2 - x1;

        let divisor = Math.abs(gcd(dy, dx));
        dy /= divisor;
        dx /= divisor;

        slopes[`${dx}/${dy}`] = true;
      }
    }

    const vectors_to_travel = Object.keys(slopes).map((slope_str) =>
      slope_str.split('/').map((v) => parseInt(v, 10))
    );

    if (sorted_clockwise) {
      vectors_to_travel.sort((p1, p2) => {
        let p1_d = coordToAngle(p1);
        let p2_d = coordToAngle(p2);
        return p1_d - p2_d;
      });
    }

    return vectors_to_travel;
  }

  getCollisionAlongVector(from, vector) {
    let collision_coord = null;
    const [x, y] = from;
    const [vx, vy] = vector;
    let new_x = x + vx;
    let new_y = y + vy;

    while (this.pointInGrid(new_x, new_y)) {
      if (this.grid[new_y][new_x]) {
        collision_coord = [new_x, new_y];
        break;
      }
      new_x += vx;
      new_y += vy;
    }

    return collision_coord;
  }

  vaporize([x, y]) {
    this.grid[y][x] = 0;
  }

  pointInGrid(x, y) {
    return (
      x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y
    );
  }

  /* sumAllAsteroids() {
    let sum = 0;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        sum += this.grid[y][x];
      }
    }

    return sum;
  } */
}

import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input
  .split('\n')
  .map((row) => row.split('').map((v) => (v === '#' ? 1 : 0)));
const inputArrayTest = inputSample
  .split('\n')
  .map((row) => row.split('').map((v) => (v === '#' ? 1 : 0)));

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let grid = new Grid(data);
  let best_count = -1;
  let best_coords = null;
  for (let asteroid of grid.asteroids) {
    let vectors = grid.getVectorsFromPoint(asteroid);
    let count = vectors
      .map((vector) => (grid.getCollisionAlongVector(asteroid, vector) ? 1 : 0))
      .reduce((a, b) => a + b, 0);

    if (count > best_count) {
      best_count = count;
      best_coords = asteroid;
    }
  }

  return [best_count, best_coords];
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let grid = new Grid(data);
  let start_from = partOne(isTest)[1];

  let total_vaporized = 0;
  let vaporized = [];
  do {
    let clockwise_vectors_from_start = grid.getVectorsFromPoint(
      start_from,
      true
    );
    for (let vector of clockwise_vectors_from_start) {
      let collision_coord = grid.getCollisionAlongVector(start_from, vector);
      if (collision_coord) {
        total_vaporized++;
        grid.vaporize(collision_coord);
        vaporized.push(collision_coord);
      }

      if (total_vaporized === 200) {
        let [x, y] = collision_coord;
        return x * 100 + y;
      }
    }
  } while (total_vaporized < 200);
}

// console.log('Part 1: ' + partOne()[0]);
// console.log('Part 2: ' + partTwo());
