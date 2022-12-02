import { readInput } from "../util/file.ts";

function parseInput() {
  return readInput().split("\n");
}

function score(round: string): number {
  switch (round) {
    case "A X":
      return 4;
    case "A Y":
      return 8;
    case "A Z":
      return 3;
    case "B X":
      return 1;
    case "B Y":
      return 5;
    case "B Z":
      return 9;
    case "C X":
      return 7;
    case "C Y":
      return 2;
    case "C Z":
      return 6;
    default:
      throw Error("bleh");
  }
}

function transform(round: string): string {
  switch (round) {
    case "A X":
      return "A Z";
    case "A Y":
      return "A X";
    case "A Z":
      return "A Y";
    case "B X":
      return "B X";
    case "B Y":
      return "B Y";
    case "B Z":
      return "B Z";
    case "C X":
      return "C Y";
    case "C Y":
      return "C Z";
    case "C Z":
      return "C X";
    default:
      throw Error("bleh");
  }
}

function part1() {
  const input = parseInput();
  return input.map(score).reduce((a, b) => a + b);
}

function part2() {
  const input = parseInput();
  return input.map(transform).map(score).reduce((a, b) => a + b);
}

console.log("part1", part1());
console.log("part2", part2());
