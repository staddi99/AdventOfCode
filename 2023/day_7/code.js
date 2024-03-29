import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

const ranks = {
  FIVE_KIND: 6,
  FOUR_KIND: 5,
  FULL_HOUSE: 4,
  THREE_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
  HIGH_CARD: 0,
};

const getHandRank = (hand) => {
  const counts = Object.values(
    hand.split('').reduce((obj, character) => {
      if (obj[character] == null) obj[character] = 0;
      obj[character]++;
      return obj;
    }, {})
  );

  if (counts.includes(5)) return ranks.FIVE_KIND;
  else if (counts.includes(4)) return ranks.FOUR_KIND;
  else if (counts.includes(3) && counts.includes(2)) return ranks.FULL_HOUSE;
  else if (counts.includes(3)) return ranks.THREE_KIND;
  else if (counts.filter((num) => num == 2).length == 2) return ranks.TWO_PAIR;
  else if (counts.includes(2)) return ranks.ONE_PAIR;
  return ranks.HIGH_CARD;
};

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const hands = data.map((line) => {
    const [hand, bid] = line.split(/ /g);
    return { hand, rank: getHandRank(hand), bid: parseInt(bid) };
  });

  const cards = 'AKQJT98765432';

  return hands
    .sort((a, b) => {
      if (a.rank != b.rank) return a.rank - b.rank;

      for (let i = 0; i < a.hand.length; i++) {
        if (a.hand[i] != b.hand[i]) {
          return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i]);
        }
      }
      // return 0;
    })
    .reduce((sum, hand, index) => sum + hand.bid * (index + 1), 0);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const hands = data.map((line) => {
    const [hand, bid] = line.split(/ /g);

    let jCount = 0;
    const cards = hand.split('').map((card) => {
      if (card == 'J') {
        jCount++;
        return 'AKQT98765432'.split('');
      } else return [card];
    });

    let rank = ranks.FIVE_KIND;
    if (jCount < 4) {
      rank = cartesian(...cards).reduce((max, hand) => {
        return Math.max(max, getHandRank(hand.join('')));
      }, -Infinity);
    }

    return { hand, rank, bid: parseInt(bid) };
  });

  const cards = 'AKQT98765432J';

  return hands
    .sort((a, b) => {
      if (a.rank != b.rank) return a.rank - b.rank;

      for (let i = 0; i < a.hand.length; i++) {
        if (a.hand[i] != b.hand[i]) {
          return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i]);
        }
      }
      // return 0;
    })
    .reduce((sum, hand, index) => sum + hand.bid * (index + 1), 0);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
