import input from './input.js';
import inputSample from './inputSample.js';
import lodash from 'lodash';
const { intersection } = lodash;

const inputArray = input.split('\n').map((orbit) => orbit.split(')'));
const inputArrayTest = inputSample.split('\n').map((orbit) => orbit.split(')'));

class Planet {
  constructor(name) {
    this.name = name;
    this.orbits;
  }

  setOrbits(planet) {
    this.orbits = planet;
  }

  count() {
    return this.orbits ? 1 + this.orbits.count() : 0;
  }

  listToCom() {
    let ps = [];
    let o = this.orbits;
    while (o) {
      ps.push(o.name);
      o = o.orbits;
    }

    return ps;
  }
}

class OrbitMap {
  constructor(input) {
    this.planets = {};

    for (let [p1, p2] of input) {
      if (!this.planets[p1]) {
        this.planets[p1] = new Planet(p1);
      }

      if (!this.planets[p2]) {
        this.planets[p2] = new Planet(p2);
      }
    }

    for (let [p1, p2] of input) {
      this.planets[p2].setOrbits(this.planets[p1]);
    }
  }
}

let orbit_map = new OrbitMap(inputArray);

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let orbit_map = new OrbitMap(data);
  return Object.values(orbit_map.planets)
    .map((p) => p.count())
    .reduce((a, b) => a + b);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let orbit_map = new OrbitMap(data);
  const p1_to_com = orbit_map.planets['YOU'].listToCom();
  const p2_to_com = orbit_map.planets['SAN'].listToCom();

  const first_common_planet = intersection(p1_to_com, p2_to_com)[0];
  const p1_distance_to_first_common_planet =
    p1_to_com.indexOf(first_common_planet);
  const p2_distance_to_first_common_planet =
    p2_to_com.indexOf(first_common_planet);

  return (
    p1_distance_to_first_common_planet + p2_distance_to_first_common_planet
  );
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
