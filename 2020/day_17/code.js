import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let activeCubes = new Map();
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] === '#') {
        activeCubes.set(`${x},${y},0`, true);
      }
    }
  }
  let height = [0, data.length];
  let width = [0, data[0].length];
  let depth = [0, 1];
  for (let t = 0; t < 6; t++) {
    const activeAfterRound = new Map();
    depth[0]--;
    depth[1]++;
    width[0]--;
    width[1]++;
    height[0]--;
    height[1]++;
    for (let z = depth[0]; z < depth[1]; z++) {
      for (let y = width[0]; y < width[1]; y++) {
        for (let x = height[0]; x < height[1]; x++) {
          let activeNeighbors = 0;
          for (let zz = z - 1; zz <= z + 1; zz++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
              for (let xx = x - 1; xx <= x + 1; xx++) {
                if (
                  !(xx === x && yy === y && zz === z) &&
                  activeCubes.get(`${xx},${yy},${zz}`)
                ) {
                  activeNeighbors++;
                }
              }
            }
          }
          const isActive = activeCubes.get(`${x},${y},${z}`);
          if (activeNeighbors === 3 || (activeNeighbors === 2 && isActive)) {
            activeAfterRound.set(`${x},${y},${z}`, true);
          }
        }
      }
    }
    activeCubes = activeAfterRound;
  }
  return activeCubes.size;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let activeCubes = new Map();
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] === '#') {
        activeCubes.set(`${x},${y},0,0`, true);
      }
    }
  }
  let height = [0, data.length];
  let width = [0, data[0].length];
  let depth = [0, 1];
  let hyper = [0, 1];
  for (let t = 0; t < 6; t++) {
    const activeAfterRound = new Map();
    depth[0]--;
    depth[1]++;
    width[0]--;
    width[1]++;
    height[0]--;
    height[1]++;
    hyper[0]--;
    hyper[1]++;
    for (let w = hyper[0]; w < hyper[1]; w++) {
      for (let z = depth[0]; z < depth[1]; z++) {
        for (let y = width[0]; y < width[1]; y++) {
          for (let x = height[0]; x < height[1]; x++) {
            let activeNeighbors = 0;
            for (let ww = w - 1; ww <= w + 1; ww++) {
              for (let zz = z - 1; zz <= z + 1; zz++) {
                for (let yy = y - 1; yy <= y + 1; yy++) {
                  for (let xx = x - 1; xx <= x + 1; xx++) {
                    if (
                      !(xx === x && yy === y && zz === z && ww === w) &&
                      activeCubes.get(`${xx},${yy},${zz},${ww}`)
                    ) {
                      activeNeighbors++;
                    }
                  }
                }
              }
            }
            const isActive = activeCubes.get(`${x},${y},${z},${w}`);
            if (activeNeighbors === 3 || (activeNeighbors === 2 && isActive)) {
              activeAfterRound.set(`${x},${y},${z},${w}`, true);
            }
          }
        }
      }
    }
    activeCubes = activeAfterRound;
  }
  return activeCubes.size;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
