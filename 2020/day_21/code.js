import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split('\n');
const inputArrayTest = inputSample.split('\n');

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const products = [];
  const allIngredients = new Set();
  const allAllergens = new Set();
  const found = {};

  for (const line of data) {
    const p = line.split('(contains ');

    const ing = p[0].trim().split(' ');
    const alg = p[1].substr(0, p[1].length - 1).split(', ');

    products.push([ing.sort(), alg.sort()]);
    ing.forEach((i) => allIngredients.add(i));
    alg.forEach((a) => allAllergens.add(a));
  }

  function intersect(arr1, arr2) {
    return arr1.filter((a) => arr2.includes(a));
  }

  function mapAllergens(usedProducts, commonIngredients, commonAllergens) {
    for (const [productId, [productIng, productAlg]] of products.entries()) {
      if (usedProducts.includes(productId)) return;

      const nextIng = intersect(commonIngredients, productIng).filter(
        (i) => !Object.values(found).includes(i)
      );
      const nextAlg = intersect(commonAllergens, productAlg).filter(
        (i) => !Object.keys(found).includes(i)
      );

      if (nextIng.length === 0 || nextAlg.length === 0) continue;

      if (nextIng.length === nextAlg.length) {
        for (const [idx, ingredient] of nextIng.entries()) {
          const allergen = nextAlg[idx];
          found[allergen] = ingredient;
        }
      }
      mapAllergens([...usedProducts, productId], nextIng, nextAlg);
    }
  }

  while (true) {
    const before = Object.keys(found).length;
    mapAllergens([], [...allIngredients], [...allAllergens]);
    const after = Object.keys(found).length;
    if (after === allAllergens.size) {
      break;
    }
    if (before === after) {
      break;
    }
  }

  const safeIngredients = [...allIngredients].filter(
    (ing) => !Object.values(found).includes(ing)
  );

  return products.reduce(
    (acc, [ingredients]) =>
      acc + intersect(ingredients, safeIngredients).length,
    0
  );
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  const products = [];
  const allIngredients = new Set();
  const allAllergens = new Set();
  const found = {};

  for (const line of data) {
    const p = line.split('(contains ');

    const ing = p[0].trim().split(' ');
    const alg = p[1].substr(0, p[1].length - 1).split(', ');

    products.push([ing.sort(), alg.sort()]);
    ing.forEach((i) => allIngredients.add(i));
    alg.forEach((a) => allAllergens.add(a));
  }

  function intersect(arr1, arr2) {
    return arr1.filter((a) => arr2.includes(a));
  }

  function mapAllergens(usedProducts, commonIngredients, commonAllergens) {
    for (const [productId, [productIng, productAlg]] of products.entries()) {
      if (usedProducts.includes(productId)) return;

      const nextIng = intersect(commonIngredients, productIng).filter(
        (i) => !Object.values(found).includes(i)
      );
      const nextAlg = intersect(commonAllergens, productAlg).filter(
        (i) => !Object.keys(found).includes(i)
      );

      if (nextIng.length === 0 || nextAlg.length === 0) continue;

      if (nextIng.length === nextAlg.length) {
        for (const [idx, ingredient] of nextIng.entries()) {
          const allergen = nextAlg[idx];
          found[allergen] = ingredient;
        }
      }
      mapAllergens([...usedProducts, productId], nextIng, nextAlg);
    }
  }

  while (true) {
    const before = Object.keys(found).length;
    mapAllergens([], [...allIngredients], [...allAllergens]);
    const after = Object.keys(found).length;
    if (after === allAllergens.size) {
      break;
    }
    if (before === after) {
      break;
    }
  }

  const safeIngredients = [...allIngredients].filter(
    (ing) => !Object.values(found).includes(ing)
  );

  return Object.keys(found)
    .sort()
    .map((a) => found[a])
    .join(',');
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
