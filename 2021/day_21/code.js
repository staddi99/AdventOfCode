import input from './input.js';

const inputArray = input.split('\n');

const rolls = [1, 2, 3];

function partOne() {
  const positions = inputArray.map((line) => +line.split(': ')[1]);
  const scores = [0, 0];

  let rollCount = 0;
  while (true) {
    for (const i of [0, 1]) {
      for (const r of rolls) {
        rollCount++;
        const roll = ((rollCount - 1) % 100) + 1;
        positions[i] = ((positions[i] + roll - 1) % 10) + 1;
      }
      scores[i] += positions[i];
      if (scores[i] >= 1000) {
        return scores[(i + 1) % 2] * rollCount;
      }
    }
  }
}

function partTwo() {
  let positions = inputArray.map((line) => +line.split(': ')[1]);
  let scores = [0, 0];

  const wins = [0, 0];

  let gameCounts = {
    [[positions, scores].join(';')]: 1,
  };
  while (Object.entries(gameCounts).length > 0) {
    for (const i of [0, 1]) {
      const nextGameCounts = {};
      for (const [state, gameCount] of Object.entries(gameCounts)) {
        [positions, scores] = state
          .split(';')
          .map((s) => s.split(',').map(Number));

        for (const r1 of rolls) {
          for (const r2 of rolls) {
            for (const r3 of rolls) {
              const nextPositions = [...positions];
              nextPositions[i] = ((positions[i] + r1 + r2 + r3 - 1) % 10) + 1;

              const nextScores = [...scores];
              nextScores[i] += nextPositions[i];

              if (nextScores[i] >= 21) {
                wins[i] += gameCount;
                continue;
              }

              const nextState = [nextPositions, nextScores].join(';');
              nextGameCounts[nextState] =
                (nextGameCounts[nextState] ?? 0) + gameCount;
            }
          }
        }
      }
      gameCounts = nextGameCounts;
    }
  }

  return Math.max(...wins);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
