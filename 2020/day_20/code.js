import input from './input.js';
import inputSample from './inputSample.js';

export function partOne(isTest) {
  const data = isTest ? inputSample : input;
  class Tile {
    constructor(str) {
      let rows = str.split('\n');
      this.id = +rows[0].match(/Tile (\d+)/)[1];
      this.grid = rows.slice(1).map((r) => r.trim());
      this.edges = new Map();
    }

    getEdge(t) {
      if (!this.edges.get(t)) {
        if (t == 0) {
          this.edges.set(t, this.grid[0]);
        }
        if (t == 1) {
          this.edges.set(t, this.grid.map((r) => r[r.length - 1]).join(''));
        }
        if (t == 2) {
          this.edges.set(t, this.grid.map((r) => r[0]).join(''));
        }
        if (t == 3) {
          this.edges.set(t, this.grid[this.grid.length - 1]);
        }
      }

      return this.edges.get(t);
    }

    match(tile) {
      for (let i = 0; i < 4; i++) {
        let edge = this.getEdge(i);
        for (let j = 0; j < 4; j++) {
          let edge2 = tile.getEdge(j);
          if (edge == edge2 || edge == edge2.split('').reverse().join('')) {
            return true;
          }
        }
      }
      return false;
    }
  }

  const tiles = data.split(/\r?\n\r?\n/).map((r) => new Tile(r));

  let product = 1;

  for (let i = 0; i < tiles.length; i++) {
    let count = 0;
    for (let j = 0; j < tiles.length; j++) {
      if (i == j) {
        continue;
      }

      if (tiles[i].match(tiles[j])) {
        count++;
      }
    }

    if (count == 2) {
      product *= tiles[i].id;
    }
  }

  return product;
}

export function partTwo(isTest) {
  const data = isTest ? inputSample : input;
  class Tile2 {
    constructor(str) {
      let rows = str.split('\n');
      this.id = +rows[0].match(/Tile (\d+)/)[1];
      this.rot = 0;
      this.grid = rows.slice(1).map((r) => r.trim());
      this.grids = new Map();
      this.grids.set(0, this.grid);
      this.neighbors = new Map();
    }

    getEdge(t) {
      if (t == 0) {
        return this.grid[0];
      }
      if (t == 1) {
        return this.grid.map((r) => r[r.length - 1]).join('');
      }
      if (t == 2) {
        return this.grid[this.grid.length - 1];
      }
      if (t == 3) {
        return this.grid.map((r) => r[0]).join('');
      }
    }

    addNeighbor(tile, edge) {
      this.neighbors.set(edge, tile);
      tile.neighbors.set((edge + 2) % 4, this);
    }

    getNeighbor(edge) {
      return this.neighbors.get(edge);
    }

    rotate90() {
      this.rot = (this.rot + 1) % 4;

      if (!this.grids.get(this.rot)) {
        let grid = [];
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid.length; j++) {
            grid[j] = this.grid[i][j] + (grid[j] || '');
          }
        }
        this.grids.set(this.rot, grid);
      }

      this.grid = this.grids.get(this.rot);
    }

    flip() {
      this.grid = this.grid.map((r) => r.split('').reverse().join(''));
      this.grids.clear();
      this.grids.set(this.rot, this.grid);
    }

    match(tile) {
      for (let f = 0; f < 2; f++) {
        for (let i = 0; i < 4; i++) {
          let edge = this.getEdge(i);

          for (let j = 0; j < 4; j++) {
            if (edge == tile.getEdge((i + 2) % 4)) {
              return i;
            }
            tile.rotate90();
          }
        }
        tile.flip();
      }
    }
  }

  const match = (row, start, pattern) => {
    for (let i of pattern) {
      if (row[start + i] != '#') {
        return false;
      }
    }
    return true;
  };

  const replace = (row, start, pattern) => {
    row = [...row];
    for (let i of pattern) {
      row[start + i] = 'O';
    }
    return row.join('');
  };

  const monster = [[18], [0, 5, 6, 11, 12, 17, 18, 19], [1, 4, 7, 10, 13, 16]];

  let tiles = data.split(/\r?\n\r?\n/).map((r) => new Tile2(r));

  let queue = [tiles[0]];
  let visited = new Set();

  while (queue.length) {
    let tile = queue.shift();

    if (visited.has(tile.id)) {
      continue;
    }

    visited.add(tile.id);

    for (let other of tiles) {
      if (visited.has(other.id)) {
        continue;
      }

      let dir = tile.match(other);
      if (dir != null) {
        queue.push(other);
        tile.addNeighbor(other, dir);
      }
    }
  }

  let tile = tiles[0];
  while (tile.getNeighbor(0) || tile.getNeighbor(3)) {
    tile = tile.getNeighbor(0) || tile.getNeighbor(3);
  }

  let large = new Array(Math.sqrt(tiles.length) * (tile.grid.length - 2));
  large.fill('');

  let i = 0;
  while (tile) {
    let row = tile;

    while (row) {
      for (let j = 1; j < row.grid.length - 1; j++) {
        large[i + j - 1] += row.grid[j].substring(1, row.grid[j].length - 1);
      }

      row = row.neighbors.get(1);
    }
    i += tile.grid.length - 2;
    tile = tile.neighbors.get(2);
  }

  let largeTile = new Tile2('Tile 0:\n' + large.join('\n'));

  for (let f = 0; f < 2; f++) {
    for (let r = 0; r < 4; r++) {
      let grid = largeTile.grid;
      let matched = false;

      for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[i].length - 20; j++) {
          if (
            match(grid[i], j, monster[1]) &&
            match(grid[i + 1], j, monster[2]) &&
            match(grid[i - 1], j, monster[0])
          ) {
            matched = true;
            grid[i - 1] = replace(grid[i - 1], j, monster[0]);
            grid[i] = replace(grid[i], j, monster[1]);
            grid[i + 1] = replace(grid[i + 1], j, monster[2]);
          }
        }
      }
      if (matched) {
        return grid
          .map((r) => [...r].filter((r) => r == '#').length)
          .reduce((a, b) => a + b);
      }
      largeTile.rotate90();
    }
    largeTile.flip();
  }
}

// console.log('Part 1: ' + partOne());
// console.log('Part 2: ' + partTwo());
