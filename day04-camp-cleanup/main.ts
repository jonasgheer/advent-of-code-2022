import { run } from "../util/starter.ts";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

function parseInput(rawInput: string) {
  return rawInput.split("\n").map((line) =>
    line.split(",").map((range) => range.split("-").map(Number))
  );
}

function rangeLength(a: number, b: number) {
  return b - a + 1;
}

function overlaps(rangeA: number[], rangeB: number[]) {
  const low = rangeA[0] > rangeB[0] ? rangeB : rangeA;
  const high = rangeA[0] > rangeB[0] ? rangeA : rangeB;

  return low[1] >= high[0];
}

function fullyOverlaps(rangeA: number[], rangeB: number[]) {
  const lenA = rangeLength(rangeA[0], rangeA[1]);
  const lenB = rangeLength(rangeB[0], rangeB[1]);

  const shortest = lenA > lenB ? rangeB : rangeA;
  const longest = lenA > lenB ? rangeA : rangeB;

  return shortest[0] >= longest[0] && shortest[1] <= longest[1];
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return input.map((pair) => fullyOverlaps(pair[0], pair[1])).filter(Boolean)
    .length;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return input.map((pair) => overlaps(pair[0], pair[1])).filter(Boolean).length;
}

run({
  part1: {
    test: {
      input: outdent`2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`,
      expected: 2,
    },
    solution: part1,
  },
  part2: {
    test: {
      input: outdent`2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`,
      expected: 4,
    },
    solution: part2,
  },
});
