import input from './input.js';

const inputArray = input.split('\n');

let ship = {
  angle: 0,
  direction: ['E', 'N', 'W', 'S'],
  north: 0,
  east: 0,
};

let operations = {
  N: (distance) => (ship.north += distance),
  S: (distance) => (ship.north -= distance),
  E: (distance) => (ship.east += distance),
  W: (distance) => (ship.east -= distance),
  L: (angle) => (ship.angle += angle),
  R: (angle) => (ship.angle += 360 - angle),
  F: (distance) => {
    let dir = ship.direction[(ship.angle / 90) % 4];
    return operations[dir](distance);
  },
};

function partOne() {
  inputArray.forEach((element) => {
    let [dir, val] = [element.match(/[A-Z]+/g), element.match(/[0-9]+/g)];
    operations[dir](Number(val));
  });

  return Math.abs(ship.north) + Math.abs(ship.east);
}

function partTwo() {
  ship = {
    angle: 0,
    direction: ['E', 'N', 'W', 'S'],
    north: 0,
    east: 0,
  };

  let wayMatrix = [
    [1, 10],
    [0, 0],
  ];

  const rotateMatrix = (amount) => {
    for (let i = 0; i < amount; i++) {
      wayMatrix = wayMatrix[0].map((val, index) =>
        wayMatrix.map((row) => row[index]).reverse()
      );
    }
  };

  let operations2 = {
    N: (distance) => (wayMatrix[0][0] += distance),
    S: (distance) => (wayMatrix[1][1] += distance),
    E: (distance) => (wayMatrix[0][1] += distance),
    W: (distance) => (wayMatrix[1][0] += distance),
    L: (angle) => rotateMatrix(((360 - angle) / 90) % 4),
    R: (angle) => rotateMatrix((angle / 90) % 4),
    F: (distance) => {
      //[[N,E],[W,S]]
      operations['N'](distance * wayMatrix[0][0]);
      operations['S'](distance * wayMatrix[1][1]);
      operations['E'](distance * wayMatrix[0][1]);
      operations['W'](distance * wayMatrix[1][0]);
    },
  };

  inputArray.forEach((element) => {
    let [dir, val] = [element.match(/[A-Z]+/g), element.match(/[0-9]+/g)];
    operations2[dir](Number(val));
  });

  return Math.abs(ship.north) + Math.abs(ship.east);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
