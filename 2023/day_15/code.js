import input from './input.js';
import inputSample from './inputSample.js';

const inputArray = input.split(',');
const inputArrayTest = inputSample.split(',');

const hash = (string) => {
  return string.split('').reduce((hash, char) => {
    return ((hash + char.charCodeAt(0)) * 17) % 256;
  }, 0);
};

export function partOne(isTest) {
  const data = isTest ? inputArrayTest : inputArray;
  
  return data.reduce((sum, step) => sum + hash(step), 0);
}

export function partTwo(isTest) {
  const data = isTest ? inputArrayTest : inputArray;

  let boxes = new Array(256).fill(0).map((_) => new Array());
  data.forEach((step) => {
    if (step[step.length - 1] == '-') {
      let label = step.slice(0, -1);
      let index = hash(label);
      for (let i = boxes[index].length - 1; i >= 0; i--) {
        if (boxes[index][i].label == label) {
          boxes[index].splice(i, 1);
          break;
        }
      }
    } else {
      let [label, focal] = step.split(/=/g);
      let index = hash(label);
      let replaced = false;
      for (let i = boxes[index].length - 1; i >= 0; i--) {
        if (boxes[index][i].label == label) {
          boxes[index][i].focal = focal;
          replaced = true;
          break;
        }
      }

      if (!replaced) boxes[index].push({ label, focal });
    }
  });

  return boxes.reduce((totalSum, array, boxNumber) => {
    return (
      totalSum +
      array.reduce((sum, box, index) => {
        return sum + (boxNumber + 1) * (index + 1) * box.focal;
      }, 0)
    );
  }, 0);
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
