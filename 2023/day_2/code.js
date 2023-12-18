import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const games = data.map((line) => {
    return line
      .split(/: /g)[1]
      .split(/;/g)
      .reduce((array, sets) => {
        array.push(
          sets
            .trim()
            .split(/, /)
            .reduce((obj, colors) => {
              let [amount, color] = colors.split(/ /g);
              obj[color] = parseInt(amount);
              return obj;
            }, {})
        );
        return array;
      }, []);
  });

  let limit = { red: 12, green: 13, blue: 14 };
  return games.reduce((sum, game, index) => {
    let possible = true;

    for (let i = 0; i < game.length; i++) {
      Object.keys(limit).forEach((color) => {
        if (game[i][color] && game[i][color] > limit[color]) possible = false;
      });
    }

    if (possible) sum += index + 1;
    return sum;
  }, 0);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const games = data.map((line) => {
    return line
      .split(/: /g)[1]
      .split(/;/g)
      .reduce((array, sets) => {
        array.push(
          sets
            .trim()
            .split(/, /)
            .reduce((obj, colors) => {
              let [amount, color] = colors.split(/ /g);
              obj[color] = parseInt(amount);
              return obj;
            }, {})
        );
        return array;
      }, []);
  });

  return games.reduce((sum, game) => {
    let max = { red: -Infinity, green: -Infinity, blue: -Infinity };

    for (let i = 0; i < game.length; i++) {
      Object.keys(max).forEach((color) => {
        if (game[i][color]) max[color] = Math.max(max[color], game[i][color]);
      });
    }

    sum += max.red * max.green * max.blue;
    return sum;
  }, 0);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
