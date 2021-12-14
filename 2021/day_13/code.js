import input from './input.js';

const inputArray = input.split('\n');

const dots = inputArray.filter(
  (line) => line.length > 0 && !line.startsWith('fold')
);

const instructions = inputArray
  .filter((line) => line.startsWith('fold'))
  .map((line) => line.substring('fold along '.length).split('='));

const fold = (dots, axis, position) => {
  return dots.map((dot) => {
    const [x, y] = dot.split(',').map((v) => parseInt(v, 10));
    if (axis === 'x' && x > position) {
      const diff = x - position;
      return [x - 2 * diff, y].join(',');
    }
    if (axis === 'y' && y > position) {
      const diff = y - position;
      return [x, y - 2 * diff].join(',');
    }
    return [x, y].join(',');
  });
};

function partOne() {
  const [first] = instructions;
  const [axis, position] = first;
  return new Set(fold(dots, axis, position)).size;
}

function partTwo() {
  const printMatrix = (matrix) => {
    const rows = ['\n'];
    for (const row of matrix) {
      rows.push(row.join(''));
    }

    return rows.join('\n');
  };

  let current = dots;
  for (const instruction of instructions) {
    const [axis, position] = instruction;
    current = fold(current, axis, position);
  }
  const result = new Set(current);
  const afterFold = Array.from(result).map((dot) =>
    dot.split(',').map((val) => parseInt(val))
  );
  const maxX = Math.max(...afterFold.map((dot) => dot[0]));
  const maxY = Math.max(...afterFold.map((dot) => dot[1]));
  const matrix = Array(maxY + 1)
    .fill('.')
    .map(() => Array(maxX + 1).fill(' '));
  for (const dot of afterFold) {
    const [x, y] = dot;
    matrix[y][x] = '█';
  }
  return printMatrix(matrix);
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
