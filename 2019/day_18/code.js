class InfiniteGrid {
  constructor({ defaultFactory = (x, y) => 0, string_map = {} } = {}) {
    this.defaultFactory = defaultFactory.bind(this);
    this.string_map = string_map;
    this.grid = new Map();
    this.max_x = -Infinity;
    this.min_x = Infinity;
    this.max_y = -Infinity;
    this.min_y = Infinity;
  }

  static toId(x, y) {
    return `${x},${y}`;
  }

  static toCoords(id, return_as_object = false) {
    let [x, y] = id.split(',');
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    return return_as_object ? { x, y } : [x, y];
  }

  static split(two_dimensional_string) {
    return two_dimensional_string.split('\n').map((row) => row.split(''));
  }

  neighbors(x, y) {
    const neighboring_cells = new Map();
    if (!this.inBounds(x, y)) {
      return neighboring_cells;
    }

    const neighbors_lookup = [
      ['N', [x, y - 1]],
      ['W', [x - 1, y]],
      ['E', [x + 1, y]],
      ['S', [x, y + 1]],
    ];

    for (let [key, coord] of neighbors_lookup) {
      let [cx, cy] = coord;
      if (this.inBounds(cx, cy)) {
        neighboring_cells.set(key, { coord, value: this.get(cx, cy) });
      }
    }

    return neighboring_cells;
  }

  set(x, y, value) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error(
        `x and y must be numbers, got (${typeof x})${x} and (${typeof y})${y}`
      );
    }
    if (x < this.min_x) this.min_x = x;
    if (x > this.max_x) this.max_x = x;
    if (y < this.min_y) this.min_y = y;
    if (y > this.max_y) this.max_y = y;
    const id = InfiniteGrid.toId(x, y);
    this.grid.set(id, value);
  }

  get(x, y) {
    const id = InfiniteGrid.toId(x, y);
    if (!this.grid.has(id)) {
      this.set(x, y, this.defaultFactory(x, y));
    }
    return this.grid.get(id);
  }

  findAll(value, as_coords = true) {
    const found = [];
    for (let [id, cell] of this.grid) {
      const check = value instanceof RegExp ? value.test(cell) : value === cell;
      if (check) {
        found.push([cell, as_coords ? InfiniteGrid.toCoords(id) : id]);
      }
    }

    return found;
  }

  inBounds(x, y) {
    return (
      x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y
    );
  }

  clone() {
    const infinite_grid_clone = new InfiniteGrid();
    const new_map = new Map();
    for (let [key, val] of this.grid) {
      new_map.set(
        key,
        typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val
      );
    }
    infinite_grid_clone.defaultFactory = this.defaultFactory.bind(this);
    infinite_grid_clone.string_map = JSON.parse(
      JSON.stringify(this.string_map)
    );
    infinite_grid_clone.grid = new_map;
    infinite_grid_clone.max_x = this.max_x;
    infinite_grid_clone.min_x = this.min_x;
    infinite_grid_clone.max_y = this.max_y;
    infinite_grid_clone.min_y = this.min_y;

    return infinite_grid_clone;
  }

  toGrid() {
    let grid = [];
    for (let y = this.min_y; y <= this.max_y; y++) {
      let row = [];
      for (let x = this.min_x; x <= this.max_x; x++) {
        let cell = this.get(x, y);
        row.push(cell);
      }
      grid.push(row);
    }

    return grid;
  }

  sum() {
    let sum = 0;
    for (let value of this.grid.values()) {
      sum += value;
    }

    return sum;
  }

  toString() {
    let grid = this.toGrid();
    let rows = '';
    for (let y = 0; y < grid.length; y++) {
      let row = '';
      for (let x = 0; x < grid[y].length; x++) {
        let cell = grid[y][x];
        let cell_string =
          cell in this.string_map ? this.string_map[cell] : String(cell);
        row += cell_string;
      }
      rows += rows.length ? '\n' + row : row;
    }

    return rows;
  }
}

const ENTRANCE = '@';
const PASSAGE = '.';
const WALL = '#';
const DOOR_RE = /[A-Z]/;
const KEY_RE = /[a-z]/;

const cloneJSON = (obj) => JSON.parse(JSON.stringify(obj));

class Maze {
  constructor(raw_input, auto_create_pathfinders = true) {
    this.grid = Maze.parseInput(raw_input);
    this.entrances = this.grid.findAll(ENTRANCE);
    this.doors = this.grid.findAll(DOOR_RE);
    this.keys = this.grid.findAll(KEY_RE);

    this.count_cache = {};

    if (auto_create_pathfinders) {
      this.pathfinders = this.generatePathfinders();
    }
  }

  static parseInput(raw_input) {
    const grid = new InfiniteGrid({ defaultFactory: (x, y) => '.' });
    const input_arr = raw_input.split('\n').map((row) => row.split(''));
    for (let y = 0; y < input_arr.length; y++) {
      for (let x = 0; x < input_arr[y].length; x++) {
        let cell = input_arr[y][x];
        grid.set(x, y, cell);
      }
    }

    return grid;
  }

  setupPartTwo() {
    let [ox, oy] = this.entrances[0][1];

    let top_x = ox - 1;
    let top_y = oy - 1;

    let new_center = InfiniteGrid.split('@#@' + '\n' + '###' + '\n' + '@#@');
    for (let y = 0; y < new_center.length; y++) {
      for (let x = 0; x < new_center[y].length; x++) {
        let cell = new_center[y][x];
        this.grid.set(top_x + x, top_y + y, cell);
      }
    }

    this.entrances = this.grid.findAll(ENTRANCE);
  }

  countSteps(from_id, to_coord, keys_collected) {
    const sorted_keys = keys_collected.split('').sort().join('');
    let current = to_coord;
    let count = 0;
    if (!this.count_cache[sorted_keys]) {
      this.count_cache[sorted_keys] = {};
    }
    const came_from = this.pathfinders.get(from_id);
    const cache_key = `${InfiniteGrid.toId(...current)}/${from_id}`;
    if (this.count_cache[sorted_keys][cache_key] === undefined) {
      while (InfiniteGrid.toId(...current) !== from_id) {
        count++;
        current = came_from.get(InfiniteGrid.toId(...current));
      }
      this.count_cache[sorted_keys][cache_key] = count;
    }

    return this.count_cache[sorted_keys][cache_key];
  }

  getReachableKeys(from_id, keys_collected) {
    const reachable_keys = new Map();
    for (let [key, key_coord] of this.keys) {
      const key_id = InfiniteGrid.toId(...key_coord);
      if (from_id === key_id || keys_collected.includes(key)) {
        continue;
      }

      let current = key_coord;
      const came_from = this.pathfinders.get(from_id);

      while (InfiniteGrid.toId(...current) !== from_id) {
        current = came_from.get(InfiniteGrid.toId(...current));

        if (!current) {
          break;
        }

        const cell = this.grid.get(...current);
        const is_locked_door =
          Boolean(this.doors.find(([door]) => door === cell)) &&
          !keys_collected.includes(cell.toLowerCase());
        const is_uncollected_key =
          KEY_RE.test(cell) && !keys_collected.includes(cell);

        if (is_locked_door || is_uncollected_key) {
          break;
        }

        const assert_walkable =
          cell === PASSAGE ||
          cell === ENTRANCE ||
          KEY_RE.test(cell) ||
          (DOOR_RE.test(cell) && keys_collected.includes(cell.toLowerCase()));
        if (!assert_walkable) {
          throw new Error(
            `Unknown cell: ${cell}, keys_collected: ${keys_collected}`
          );
        }
      }

      if (current && InfiniteGrid.toId(...current) === from_id) {
        reachable_keys.set(key, cloneJSON(key_coord));
      }
    }

    return reachable_keys;
  }

  getShortestPath() {
    const entrances_coords = this.entrances.map(([, coord]) => coord);

    let paths = [
      {
        keys_collected: '',
        at_end: false,
        steps: 0,
        robots_coords: cloneJSON(entrances_coords),
      },
    ];
    while (paths.some((path) => !path.at_end)) {
      let new_paths = [];

      /* console.log(
        `${paths[0].keys_collected.length} / ${this.keys.length} (${paths.length} paths)`
      ); */
      for (let path of paths) {
        const reachable_keys_by_robots = path.robots_coords.map(([x, y]) => {
          return this.getReachableKeys(
            InfiniteGrid.toId(x, y),
            path.keys_collected
          );
        });

        for (let r = 0; r < reachable_keys_by_robots.length; r++) {
          let [from_x, from_y] = path.robots_coords[r];
          const from_id = InfiniteGrid.toId(from_x, from_y);
          let reachable_keys = reachable_keys_by_robots[r];
          for (let [reachable_key, reachable_key_coord] of reachable_keys) {
            let [key_x, key_y] = reachable_key_coord;
            const steps = this.countSteps(
              from_id,
              reachable_key_coord,
              path.keys_collected
            );
            const new_robots_coords = cloneJSON(path.robots_coords);
            new_robots_coords[r][0] = key_x;
            new_robots_coords[r][1] = key_y;
            new_paths.push({
              keys_collected: path.keys_collected + reachable_key,
              at_end: false,
              steps: path.steps + steps,
              robots_coords: new_robots_coords,
            });
          }
        }
      }

      let pruned_paths = new Map();
      for (let path of new_paths) {
        if (path.keys_collected.length === this.keys.length) {
          path.at_end = true;
        }
        const sorted_keys_str = path.keys_collected.split('').sort().join('');
        const path_id = `${JSON.stringify(
          path.robots_coords
        )};${sorted_keys_str}`;
        if (pruned_paths.has(path_id)) {
          if (pruned_paths.get(path_id, path).steps > path.steps) {
            pruned_paths.set(path_id, path);
          }
        } else {
          pruned_paths.set(path_id, path);
        }
      }

      paths = [...pruned_paths.values()].sort((a, b) => a.steps - b.steps);
    }

    return paths;
  }

  generatePathfinders() {
    const pathfinders = new Map();
    for (let iter of [this.entrances, this.keys]) {
      for (let [, coord] of iter) {
        const [x, y] = coord;
        const frontier = [];
        frontier.push([x, y]);
        const came_from = new Map([[InfiniteGrid.toId(x, y), null]]);
        while (frontier.length) {
          const current_coord = frontier.shift();
          const neighbor_coords = this.grid
            .neighbors(...current_coord)
            .values();
          for (let { coord: next_coord, value: next_cell } of neighbor_coords) {
            if (next_cell === WALL) continue;

            const next_id = InfiniteGrid.toId(...next_coord);
            if (came_from.has(next_id)) continue;

            const is_walkable =
              next_cell === PASSAGE ||
              next_cell === ENTRANCE ||
              KEY_RE.test(next_cell) ||
              DOOR_RE.test(next_cell);

            if (is_walkable) {
              frontier.push(next_coord);
            } else {
              throw new Error(`Unknown cell: ${next_cell}`);
            }

            came_from.set(next_id, current_coord);
          }
        }

        pathfinders.set(InfiniteGrid.toId(x, y), came_from);
      }
    }

    return pathfinders;
  }
}

import input from './input.js';

const inputArray = input;

function partOne() {
  let maze = new Maze(input);

  const paths = maze.getShortestPath();
  return paths[0].steps;
}

function partTwo() {
  let maze = new Maze(input, false);
  maze.setupPartTwo();
  maze.pathfinders = maze.generatePathfinders();

  const paths = maze.getShortestPath();
  return paths[0].steps;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
