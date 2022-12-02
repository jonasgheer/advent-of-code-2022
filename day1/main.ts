import { readInput } from "../util/file.ts";

function parseInput() {
  return readInput().split("\n\n").map((group) => group.split("\n").map(Number))
    .map((group) => group.reduce((a, b) => a + b));
}

function part1() {
  const input = parseInput();
  return Math.max(...input);
}

function part2() {
  const input = parseInput();
  input.sort((a, b) => b - a);
  return input.slice(0, 3).reduce((a, b) => a + b);
}

console.log("part1", part1());
console.log("part2", part2());
