import input from './input.js';

const getInput = () => {
  const iinput = input.split('\n').map((line) => line.split('-'));
  const nodes = new Map();
  for (let line of iinput) {
    const [begin, end] = line;
    if (!nodes.get(begin)) nodes.set(begin, new Node(begin));
    if (!nodes.get(end)) nodes.set(end, new Node(end));

    const from = nodes.get(begin);
    const to = nodes.get(end);
    from.addNeighbour(to);
    to.addNeighbour(from);
  }
  return nodes;
};

class Node {
  constructor(name) {
    this.name = name;
    this.neighbours = new Set();
  }

  addNeighbour(neighbour) {
    this.neighbours.add(neighbour);
  }

  isSmall() {
    if (this.name === 'start') return false;
    if (this.name === 'end') return false;
    return this.name.toLowerCase() === this.name;
  }
}

class Path {
  constructor(previousPath) {
    this.visited = (previousPath && new Set(previousPath.visited)) || new Set();
    this.crumb = (previousPath && previousPath.crumb.slice(0)) || [];
  }

  visit(node) {
    if (node.name === 'start' && this.hasVisited(node)) return false;
    if (node.isSmall() && this.hasVisited(node)) return false;

    this.visited.add(node.name);
    this.crumb.push(node.name);
    return node.name !== 'end';
  }

  hasVisited(node) {
    return this.visited.has(node.name);
  }

  getPath() {
    return this.crumb;
  }

  isEnd() {
    return this.visited.has('end');
  }
}

class ExtraVisitPath extends Path {
  constructor(previousPath) {
    super(previousPath);
    this.selectedSmallNode = previousPath && previousPath.selectedSmallNode;
  }

  hasVisited(node) {
    if (
      this.visited.has(node.name) &&
      node.isSmall() &&
      !this.selectedSmallNode
    ) {
      this.selectedSmallNode = node.name;
      return false;
    }
    return this.visited.has(node.name);
  }
}

const generatePaths =
  (PathClass) =>
  (current, path = new PathClass(), allPaths = []) => {
    const result = path.visit(current);
    if (!result) {
      if (path.isEnd()) {
        allPaths.push(path);
      }
      return;
    }

    for (let neighbour of current.neighbours) {
      generatePaths(PathClass)(neighbour, new PathClass(path), allPaths);
    }
    return allPaths;
  };

function partOne() {
  const map = getInput();
  const paths = generatePaths(Path)(map.get('start'));
  return paths.length;
}

function partTwo() {
  const map = getInput();
  const paths = generatePaths(ExtraVisitPath)(map.get('start'));
  return paths.length;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
