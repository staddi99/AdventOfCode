import input from './input.js';

const inputArray = input.split('').map((e) => parseInt(e));
const width = 25;
const height = 6;


let layers = [];
const size = width * height;
for (let i = 0; i < inputArray.length / size; i++) {
  layers.push(inputArray.slice(i * size, (i + 1) * size));
}

function partOne() {
  let layers_count = [];
  for (let layer of layers) {
    let layer_count = layer.reduce((obj, num) => {
      if (!obj[num]) {
        obj[num] = 0;
      }

      obj[num]++;

      return obj;
    }, {});

    layers_count.push(layer_count);
  }

  let layer_zeros_sorted = layers_count.sort((a, b) => {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    else return 0;
  });

  let least_zeroes = layer_zeros_sorted[0];
  let ones_times_twos = least_zeroes[1] * least_zeroes[2];

  return ones_times_twos;
}

function partTwo() {
  let image = layers[0];
  for (let i = 1; i < layers.length; i++) {
    let layer = layers[i];
    for (let p = 0; p < layer.length; p++) {
      let top_p = image[p];
      let current_p = layer[p];

      // "0 is black, 1 is white, and 2 is transparent.""
      if (top_p === 2) {
        image[p] = current_p;
      }
    }
  }

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      let pixel = image[x + y * width];
      line += pixel === 0 ? ' ' : '#';
    }
    console.log(line);
  }
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
