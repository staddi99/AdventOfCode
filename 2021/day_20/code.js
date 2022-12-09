import input from './input.js';
import inputSample from './inputSample.js';

const getData = (isTest) => (isTest ? inputSample : input).split('\n\n');

const run = (nTimes, isTest) => {
  let [alg, img] = getData(isTest);
  alg = alg.split('').map((char) => +(char === '#'));
  img = img
    .split('\n')
    .map((row) => row.split('').map((char) => +(char === '#')));

  for (let t = 0; t < nTimes; t++) {
    const nextImg = [];
    for (let i = -1; i < img.length + 1; i++) {
      const nextImgRow = [];
      for (let j = -1; j < img.length + 1; j++) {
        const pixels = [];
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            pixels.push(img[i + di]?.[j + dj] ?? (alg[0] && t % 2));
          }
        }
        const num = parseInt(pixels.join(''), 2);
        nextImgRow.push(alg[num]);
      }
      nextImg.push(nextImgRow);
    }
    img = nextImg;
  }
  return img.flat().filter(Boolean).length;
};

export function partOne(isTest) {
  return run(2, isTest);
}

export function partTwo(isTest) {
  return run(50, isTest);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
