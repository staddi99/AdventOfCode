import input from './input.js';

const inputArray = input.split('\n').map(x => x.split(''));

function partOne() {
  const getAdjacentSeats = (i = 0, j = 0) => {
    let seats = [];
    if (i - 1 !== -1 && j - 1 !== -1) seats.push([i - 1, j - 1]);
    if (i - 1 !== -1) seats.push([i - 1, j]);
    if (i - 1 !== -1 && j + 1 < inputArray[0].length) seats.push([i - 1, j + 1]);
    if (j + 1 < inputArray[0].length) seats.push([i, j + 1]);
    if (i + 1 < inputArray.length && j + 1 < inputArray[0].length) seats.push([i + 1, j + 1]);
    if (i + 1 < inputArray.length) seats.push([i + 1, j]);
    if (i + 1 < inputArray.length && j - 1 !== -1) seats.push([i + 1, j - 1]);
    if (j - 1 !== -1) seats.push([i, j - 1]);
    return seats;
  }

  const changeSeatStates = (arr) => {
    let seats = JSON.parse(JSON.stringify(arr));
    let tempSeats = JSON.parse(JSON.stringify(seats));
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let occupiedCount = 0;
        for (const seat of getAdjacentSeats(i, j)) {
          if (tempSeats[seat[0]][seat[1]] === '#') {
            occupiedCount++;
          }
        }
        if (tempSeats[i][j] !== '.' && occupiedCount === 0) {
          seats[i][j] = '#';
        }
        else if (tempSeats[i][j] === '#' && occupiedCount >= 4) {
          seats[i][j] = 'L';
        }
      }
    }
    return seats;
  }

  let oldSeatStates = JSON.parse(JSON.stringify(inputArray));
  let currentSeatStates = changeSeatStates(oldSeatStates);

  while (JSON.stringify(oldSeatStates) !== JSON.stringify(currentSeatStates)) {
    oldSeatStates = JSON.parse(JSON.stringify(currentSeatStates));
    currentSeatStates = changeSeatStates(oldSeatStates);
  }

  return currentSeatStates.flat().filter(x => x === '#').length;
}

function partTwo() {
  const getVisibleSeats = (i = 0, j = 0) => {
    let seats = [];
    if (i - 1 !== -1 && j - 1 !== -1) {
      if (inputArray[i - 1][j - 1] === ".") {
        let seat = [i - 1, j - 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]--;
          seat[1]--;
          if (seat[0] === -1 || seat[1] === -1) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i - 1, j - 1]);
      }
    }
    if (i - 1 !== -1) {
      if (inputArray[i - 1][j] === ".") {
        let seat = [i - 1, j];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]--;
          if (seat[0] === -1) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i - 1, j]);
      }
    }
    if (i - 1 !== -1 && j + 1 < inputArray[0].length) {
      if (inputArray[i - 1][j + 1] === ".") {
        let seat = [i - 1, j + 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]--;
          seat[1]++;
          if (seat[0] === -1 || seat[1] >= inputArray[0].length) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i - 1, j + 1]);
      }
    }
    if (j + 1 < inputArray[0].length) {
      if (inputArray[i][j + 1] === ".") {
        let seat = [i, j + 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[1]++;
          if (seat[1] >= inputArray[0].length) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i, j + 1]);
      }
    }
    if (i + 1 < inputArray.length && j + 1 < inputArray[0].length) {
      if (inputArray[i + 1][j + 1] === ".") {
        let seat = [i + 1, j + 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]++;
          seat[1]++;
          if (seat[0] >= inputArray.length || seat[1] >= inputArray[0].length) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i + 1, j + 1]);
      }
    }
    if (i + 1 < inputArray.length) {
      if (inputArray[i + 1][j] === ".") {
        let seat = [i + 1, j];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]++;
          if (seat[0] >= inputArray.length) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i + 1, j]);
      }
    }
    if (i + 1 < inputArray.length && j - 1 !== -1) {
      if (inputArray[i + 1][j - 1] === ".") {
        let seat = [i + 1, j - 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[0]++;
          seat[1]--;
          if (seat[0] >= inputArray.length || seat[1] === -1) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i + 1, j - 1]);
      }
    }
    if (j - 1 !== -1) {
      if (inputArray[i][j - 1] === ".") {
        let seat = [i, j - 1];
        let push = true;
        while (inputArray[seat[0]][seat[1]] === ".") {
          seat[1]--;
          if (seat[1] === -1) {
            push = false;
            break;
          }
        }
        if (push) seats.push(seat);
      } else {
        seats.push([i, j - 1]);
      }
    }
    return seats;
  }

  const changeSeatStates = (arr) => {
    let seats = JSON.parse(JSON.stringify(arr));
    let tempSeats = JSON.parse(JSON.stringify(seats));
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        let occupiedCount = 0;
        for (const seat of getVisibleSeats(i, j)) {
          if (tempSeats[seat[0]][seat[1]] === "#") {
            occupiedCount++;
          }
        }
        if (tempSeats[i][j] !== "." && occupiedCount === 0) {
          seats[i][j] = "#";
        }
        else if (tempSeats[i][j] === "#" && occupiedCount >= 5) {
          seats[i][j] = "L";
        }
      }
    }
    return seats;
  }

  let oldSeatStates = JSON.parse(JSON.stringify(inputArray));
  let currentSeatStates = changeSeatStates(oldSeatStates);

  while (JSON.stringify(oldSeatStates) !== JSON.stringify(currentSeatStates)) {
    oldSeatStates = JSON.parse(JSON.stringify(currentSeatStates));
    currentSeatStates = changeSeatStates(oldSeatStates);
  }

  return currentSeatStates.flat().filter(x => x === '#').length;
}

console.log("Part 1: " + partOne());
console.log("Part 2: " + partTwo());