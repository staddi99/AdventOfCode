class Formula {
  constructor(recipes) {
    this.recipes = JSON.parse(JSON.stringify(recipes));
    this.leftover;
  }

  calculateOreTo(element, amount = 1) {
    this.leftover = Object.keys(this.recipes).reduce(
      (obj, element) => ((obj[element] = 0), obj),
      {}
    );

    let ore = this.recursiveCalculateOreTo(element, amount);

    return {
      ore,
      leftover: this.leftover,
    };
  }

  recursiveCalculateOreTo(element, amount = 1) {
    if (element === 'ORE') {
      return amount;
    }

    let { creates, needs: ingredients } = this.recipes[element];

    let amount_minus_leftover = amount - this.leftover[element];

    let need_to_create = Math.max(amount_minus_leftover, 0);

    let multiplier = Math.ceil(need_to_create / creates);

    let total_from_running_m_times = creates * multiplier;

    let total_plus_leftover =
      total_from_running_m_times + this.leftover[element];

    let leftover_after_synthesis = total_plus_leftover - amount;

    this.leftover[element] = leftover_after_synthesis;

    if (need_to_create === 0) {
      return 0;
    }

    let ore_sum = 0;

    for (let [ingredient_element, ingredient_amount] of ingredients) {
      ore_sum += this.recursiveCalculateOreTo(
        ingredient_element,
        multiplier * ingredient_amount
      );
    }

    return ore_sum;
  }

  calculateMaxFuelGivenOre(total_ore = 1000000000000) {
    let lower_bound = 1;
    let upper_bound = total_ore;
    while (upper_bound - lower_bound > 1) {
      let midway_point = Math.floor((upper_bound + lower_bound) / 2);
      let { ore } = this.calculateOreTo('FUEL', midway_point);

      if (ore > total_ore) {
        upper_bound = midway_point - 1;
      } else if (ore < total_ore) {
        lower_bound = midway_point + 1;
      } else {
        return midway_point;
      }
    }

    let { ore } = this.calculateOreTo('FUEL', lower_bound);
    if (ore > total_ore) {
      return lower_bound - 1;
    } else {
      return lower_bound;
    }
  }
}

import input from './input.js';
import inputSample from './inputSample.js';

const parseLines = (raw_lines) => {
  const formula = {};

  const lines = String(raw_lines).trim().split('\n');

  for (let line of lines) {
    let [needs, creates] = line.split(' => ');
    let [creates_amount, creates_element] = creates.split(' ');
    creates_amount = parseInt(creates_amount, 10);

    let needs_parsed = needs.split(', ').map((raw_need) => {
      let [needs_amount, needs_element] = raw_need.split(' ');
      needs_amount = parseInt(needs_amount, 10);

      return [needs_element, needs_amount];
    });

    formula[creates_element] = {
      creates: creates_amount,
      needs: needs_parsed,
    };
  }

  return formula;
};

const inputArray = parseLines(input);
const inputArrayTest = parseLines(inputSample);

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let formula = new Formula(data);
  let { ore } = formula.calculateOreTo('FUEL', 1);
  return ore;
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  let formula = new Formula(data);
  let fuel = formula.calculateMaxFuelGivenOre();
  return fuel;
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
