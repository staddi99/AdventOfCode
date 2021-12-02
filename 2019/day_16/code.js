import input from './input.js';

const inputArray = input.split('').map((v) => +v);

function partOne() {
  const base_pattern = [0, 1, 0, -1];
  let current = inputArray;

  for (let phase = 1; phase <= 100; phase++) {
    let new_arr = [];
    for (let n = 0; n < current.length; n++) {
      let sum = 0;

      let index = 0;
      let position = n + 1;
      for (let i = 0; i < current.length; i++) {
        position--;
        if (position <= 0) {
          position = n + 1;
          index = (index + 1) % base_pattern.length;
        }

        let v = current[i];
        let scalar = base_pattern[index];
        let new_val = v * scalar;

        sum += new_val;
      }

      let last_digit = Math.abs(sum % 10);

      new_arr.push(last_digit);
    }

    current = new_arr;
  }

  return current.slice(0, 8).join('');
}

function partTwo() {
  const partTwoInput = [];
  for (let i = 0; i < 10000; i++) {
    partTwoInput.push(...inputArray);
  }
  const offset = parseInt(partTwoInput.slice(0, 7).join(''), 10);
  const slice_to_iterate = partTwoInput.slice(offset);
  for (let j = 0; j < 100; j++) {
    for (let i = slice_to_iterate.length - 2; i >= 0; i--) {
      slice_to_iterate[i] =
        (slice_to_iterate[i + 1] + slice_to_iterate[i]) % 10;
    }
  }

  return slice_to_iterate.slice(0, 8).join('');
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
