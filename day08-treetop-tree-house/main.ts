import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";
import { run } from "../util/starter.ts";

function parseInput(rawInput: string) {
  return rawInput.split("\n").map((line) => line.split("").map(Number));
}

interface Pos {
  x: number;
  y: number;
}

function sightlines(position: Pos, grid: number[][]): number[][] {
  const goRight = (position: Pos) => ({ x: position.x + 1, y: position.y });
  const goDown = (position: Pos) => ({ x: position.x, y: position.y - 1 });
  const goLeft = (position: Pos) => ({ x: position.x - 1, y: position.y });
  const goUp = (position: Pos) => ({ x: position.x, y: position.y + 1 });

  const moves = [goRight, goDown, goLeft, goUp];

  const sightlines = [];
  for (const move of moves) {
    const heights = [];
    let nextPos = position;
    while (true) {
      nextPos = move(nextPos);

      const height = grid[nextPos.x]?.[nextPos.y];
      if (height === undefined) {
        break;
      }
      heights.push(height);
    }
    sightlines.push(heights);
  }
  return sightlines;
}

function isVisible(position: Pos, grid: number[][]) {
  const treeHeight = grid[position.x][position.y];
  for (const sightline of sightlines(position, grid)) {
    if (sightline.every((h) => h < treeHeight)) {
      return true;
    }
  }
}

function viewingDistance(treeHeight: number, sightline: number[]) {
  if (sightline.length === 0) return 0;
  let viewingDistance = 0;
  for (const t of sightline) {
    viewingDistance++;
    if (t >= treeHeight) break;
  }
  return viewingDistance;
}

function treePositions(grid: number[][]) {
  const positions = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      positions.push({ x, y });
    }
  }
  return positions;
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return treePositions(input).reduce(
    (visibleCount, pos) => visibleCount + (isVisible(pos, input) ? 1 : 0),
    0,
  );
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return Math.max(
    ...treePositions(input).map((tp) => {
      const sls = sightlines(tp, input).map((sl) =>
        viewingDistance(input[tp.x][tp.y], sl)
      );

      return sls.reduce((a, b) => a * b);
    }),
  );
}

run({
  part1: {
    test: {
      input: outdent`30373
      25512
      65332
      33549
      35390`,
      expected: 21,
    },
    solution: part1,
  },
  part2: {
    test: {
      input: outdent`30373
      25512
      65332
      33549
      35390`,
      expected: 8,
    },
    solution: part2,
  },
});
