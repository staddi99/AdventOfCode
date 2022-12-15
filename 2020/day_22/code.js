import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n\n');
const inputArrayTest = inputSample.split('\n\n');

const game = ([deck1, deck2], recursive) => {
  const previousRounds = new Set();
  while (deck1.length > 0 && deck2.length > 0) {
    const round = JSON.stringify([deck1, deck2]);
    if (recursive && previousRounds.has(round)) return 1;
    previousRounds.add(round);
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    let p1win = card1 > card2;
    if (recursive && deck1.length >= card1 && deck2.length >= card2) {
      p1win =
        game([deck1.slice(0, card1), deck2.slice(0, card2)], recursive) === 1;
    }
    if (p1win) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }
  return deck1.length === 0 ? 2 : 1;
};

const getWinnerScore = (recursive, isTest) => {
  const data = isTest ? inputArrayTest : inputArray;
  const decks = data.map((x) => x.split('\n').slice(1).map(Number));
  const winner = game(decks, recursive);
  return decks[winner - 1]
    .reverse()
    .reduce((acc, x, i) => acc + x * (i + 1), 0);
};

export function partOne(isTest) {
  return getWinnerScore(false, isTest);
}

export function partTwo(isTest) {
  return getWinnerScore(true, isTest);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
