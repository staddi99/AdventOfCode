import input from './input.js';

const inputArray = input.split('\n\n');

const rots = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [-z, -y, -x],
  ([x, y, z]) => [-y, -x, -z],
];

const transform = (scanner, rot, dist) => {
  return scanner.map((beacon) => {
    return rot(beacon).map((coord, i) => {
      return coord + dist[i];
    });
  });
};

function partOne() {
  const scanners = inputArray.map((scanner) => {
    return scanner
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map(Number));
  });

  const transforms = scanners.map(() => ({}));
  transforms[0] = {
    0: [
      {
        rot: rots[0],
        dist: [0, 0, 0],
      },
    ],
  };
  for (let i = 1; i < scanners.length; i++) {
    const scanner1 = scanners[i];

    scanner2Loop: for (let j = 0; j < scanners.length; j++) {
      if (i === j) {
        continue;
      }

      const scanner2 = scanners[j];
      for (const rot of rots) {
        const distCounts = {};
        for (const beacon1 of scanner1) {
          const [x1, y1, z1] = rot(beacon1);
          for (const beacon2 of scanner2) {
            const [x2, y2, z2] = beacon2;
            const dist = [x2 - x1, y2 - y1, z2 - z1].join();
            distCounts[dist] = (distCounts[dist] ?? 0) + 1;
            if (distCounts[dist] === 12) {
              transforms[i][j] = [
                {
                  rot,
                  dist: dist.split(',').map(Number),
                },
              ];
              continue scanner2Loop;
            }
          }
        }
      }
    }
  }

  while (transforms.some((t) => !t[0])) {
    for (let i = 1; i < transforms.length; i++) {
      if (transforms[i][0]) {
        continue;
      }

      for (const j in transforms[i]) {
        if (!transforms[j][0]) {
          continue;
        }

        transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
        break;
      }
    }
  }

  const beacons = new Set(scanners[0].map((beacon) => beacon.join()));
  for (let i = 1; i < scanners.length; i++) {
    let scanner = scanners[i];
    for (const { rot, dist } of transforms[i][0]) {
      scanner = transform(scanner, rot, dist);
    }
    for (const beacon of scanner) {
      beacons.add(beacon.join());
    }
  }
  return beacons.size;
}

function partTwo() {
  const scanners = inputArray.map((scanner) => {
    return scanner
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map(Number));
  });

  const transforms = scanners.map(() => ({}));
  transforms[0] = {
    0: [
      {
        rot: rots[0],
        dist: [0, 0, 0],
      },
    ],
  };

  for (let i = 1; i < scanners.length; i++) {
    const scanner1 = scanners[i];

    scanner2Loop: for (let j = 0; j < scanners.length; j++) {
      if (i === j) {
        continue;
      }

      const scanner2 = scanners[j];
      for (const rot of rots) {
        const distCounts = {};
        for (const beacon1 of scanner1) {
          const [x1, y1, z1] = rot(beacon1);
          for (const beacon2 of scanner2) {
            const [x2, y2, z2] = beacon2;
            const dist = [x2 - x1, y2 - y1, z2 - z1].join();
            distCounts[dist] = (distCounts[dist] ?? 0) + 1;
            if (distCounts[dist] === 12) {
              transforms[i][j] = [
                {
                  rot,
                  dist: dist.split(',').map(Number),
                },
              ];
              continue scanner2Loop;
            }
          }
        }
      }
    }
  }

  while (transforms.some((t) => !t[0])) {
    for (let i = 1; i < transforms.length; i++) {
      if (transforms[i][0]) {
        continue;
      }

      for (const j in transforms[i]) {
        if (!transforms[j][0]) {
          continue;
        }

        transforms[i][0] = transforms[i][j].concat(transforms[j][0]);
        break;
      }
    }
  }

  const scannerCoords = [[0, 0, 0]];
  for (let i = 1; i < scanners.length; i++) {
    let scanner = [[0, 0, 0]];
    for (const { rot, dist } of transforms[i][0]) {
      scanner = transform(scanner, rot, dist);
    }
    scannerCoords.push(scanner[0]);
  }

  let maxDist = 0;
  for (let i = 0; i < scannerCoords.length - 1; i++) {
    const [x1, y1, z1] = scannerCoords[i];
    for (let j = 1; j < scannerCoords.length; j++) {
      const [x2, y2, z2] = scannerCoords[j];
      maxDist = Math.max(
        maxDist,
        Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)
      );
    }
  }
  return maxDist;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
