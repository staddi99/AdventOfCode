import input from './input.js';

const inputArray = input.split(/\n{2,}/);
let validation = inputArray[0].split('\n').map((field) => {
  const [
    ,
    name,
    r1min,
    r1max,
    r2min,
    r2max,
  ] = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(field);

  return [
    name.trim(),
    parseInt(r1min),
    parseInt(r1max),
    parseInt(r2min),
    parseInt(r2max),
  ];
});
const myTicket = inputArray[1]
  .split('\n')
  .slice(1)
  .map((line) => line.split(',').map(Number))[0];
const nearbyTickets = inputArray[2]
  .split('\n')
  .slice(1)
  .map((line) => line.split(',').map(Number));

function partOne() {
  return nearbyTickets.flat().reduce((errorRate, ticket) => {
    if (
      !validation.some(
        ([, r1min, r1max, r2min, r2max]) =>
          (ticket >= r1min && ticket <= r1max) ||
          (ticket >= r2min && ticket <= r2max)
      )
    ) {
      errorRate += ticket;
    }

    return errorRate;
  }, 0);
}

function partTwo() {
  const columns = Array.from({ length: myTicket.length }).map((_, i) => [
    i,
    nearbyTickets
      .filter((ticket) => {
        return ticket.every((number) =>
          validation.some(
            ([, r1min, r1max, r2min, r2max]) =>
              (number >= r1min && number <= r1max) ||
              (number >= r2min && number <= r2max)
          )
        );
      })
      .map((numbers) => numbers[i]),
  ]);

  let result = 1;

  while (columns.length) {
    const [column, numbers] = columns.shift();

    const matches = validation.filter(([, r1min, r1max, r2min, r2max]) => {
      return numbers.every(
        (number) =>
          (number >= r1min && number <= r1max) ||
          (number >= r2min && number <= r2max)
      );
    });

    if (matches.length === 1) {
      validation = validation.filter(([name]) => name !== matches[0][0]);

      if (/departure/.test(matches[0][0])) {
        result *= myTicket[column];
      }
    } else {
      columns.push([column, numbers]);
    }
  }

  return result;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
