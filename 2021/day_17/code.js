import input from './input.js';
import inputSample from './inputSample.js';

const getData = (isTest) => (isTest ? inputSample : input);

const getMinVx = (xMin) => {
  let x = 0;
  let vx = 0;
  while (x < xMin) {
    vx++;
    x += vx;
  }
  return vx;
};

const getMaxY = ([vx, vy], [[xMin, xMax], [yMin, yMax]]) => {
  let [x, y] = [0, 0];
  let maxY = 0;
  while (y >= yMin) {
    maxY = Math.max(maxY, y);
    x += vx;
    y += vy;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      return maxY;
    }
    vx = Math.sign(vx) * (Math.abs(vx) - 1);
    vy--;
  }
  return null;
};

export function partOne(isTest) {
  let [, xRange, yRange] = getData(isTest).match(/x=(.+), y=(.+)/);
  const [xMin, xMax] = xRange.split('..').map(Number);
  const [yMin, yMax] = yRange.split('..').map(Number);

  let maxY = 0;
  for (let vx = getMinVx(xMin); vx <= xMax; vx++) {
    for (let vy = yMin; vy < -yMin; vy++) {
      const nextMaxY = getMaxY(
        [vx, vy],
        [
          [xMin, xMax],
          [yMin, yMax],
        ]
      );
      if (nextMaxY !== null) {
        maxY = Math.max(maxY, nextMaxY);
      }
    }
  }
  return maxY;
}

export function partTwo(isTest) {
  let [, xRange, yRange] = getData(isTest).match(/x=(.+), y=(.+)/);
  const [xMin, xMax] = xRange.split('..').map(Number);
  const [yMin, yMax] = yRange.split('..').map(Number);

  const velocities = [];
  let maxY = 0;
  for (let vx = getMinVx(xMin); vx <= xMax; vx++) {
    for (let vy = yMin; vy < -yMin; vy++) {
      const nextMaxY = getMaxY(
        [vx, vy],
        [
          [xMin, xMax],
          [yMin, yMax],
        ]
      );
      if (nextMaxY !== null) {
        maxY = Math.max(maxY, nextMaxY);
        velocities.push([vx, vy]);
      }
    }
  }
  return velocities.length;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
