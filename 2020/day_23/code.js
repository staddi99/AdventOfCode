import input from './input.js';

const inputArray = input
  .split('\n')[0]
  .split('')
  .map((cup) => Number(cup));

class Cup {
  constructor(label, next) {
    this.label = label;
    if (!next) {
      this.next = this;
      this.prev = this;
    } else {
      this.prev = next.prev;
      this.next = next;
      this.prev.next = this;
      this.next.prev = this;
    }
  }

  insertAfter(cups) {
    cups[0].prev = this;
    cups[cups.length - 1].next = this.next;
    this.next.prev = cups[cups.length - 1];
    this.next = cups[0];
  }

  extractAfter(amount) {
    let extracted = [];
    let nextCup = this.next;
    for (let i = 0; i < amount; i++) {
      extracted = [...extracted, nextCup];
      nextCup = nextCup.next;
    }
    this.next = nextCup;
    nextCup.prev = this;
    return extracted;
  }
}

class CupsCircle {
  constructor(cupLabels) {
    this.head = null;
    this.length = 0;
    this.labelLookup = {};
    cupLabels.forEach((label) => this.insertCup(label));
  }

  insertCup(label) {
    const cup = new Cup(label, this.head);
    if (!this.head) this.head = cup;
    this.labelLookup[label] = cup;
    this.length++;
  }

  getCupWithLabel(label) {
    return this.labelLookup[label];
  }

  destinationCup(currentCup, pickedUpCups) {
    const pickedUpLabels = pickedUpCups.map((cup) => cup.label);
    let destinationCup = currentCup.label;
    do {
      destinationCup = mod(destinationCup - 2, this.length) + 1;
    } while (pickedUpLabels.includes(destinationCup));
    return this.getCupWithLabel(destinationCup);
  }

  doTheCrabMove(currentCup) {
    const pickedUpCups = currentCup.extractAfter(3);
    const destinationCup = this.destinationCup(currentCup, pickedUpCups);
    destinationCup.insertAfter(pickedUpCups);
  }

  playCrabGame(numRounds) {
    let currentCup = this.head;
    for (let i = 0; i < numRounds; i++) {
      this.doTheCrabMove(currentCup);
      currentCup = currentCup.next;
    }
  }

  toArray() {
    if (!this.head) return [];
    let labels = [this.head.label];
    for (let elem = this.head.next; elem !== this.head; elem = elem.next)
      labels = [...labels, elem.label];
    return labels;
  }
}

function mod(value, modulo) {
  return (value + modulo) % modulo;
}

function padCups(cups, len) {
  return [...cups, ...[...Array(len + 1).keys()].slice(cups.length + 1)];
}

function partOne() {
  const circle = new CupsCircle(inputArray);
  circle.playCrabGame(100);
  circle.head = circle.getCupWithLabel(1);
  return Number(circle.toArray().slice(1).join(''));
}

function partTwo() {
  const circle = new CupsCircle(padCups(inputArray, 1000000));
  circle.playCrabGame(10000000);
  const cupOne = circle.getCupWithLabel(1);
  return cupOne.next.label * cupOne.next.next.label;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
