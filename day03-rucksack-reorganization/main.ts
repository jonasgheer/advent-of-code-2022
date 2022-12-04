import { readInput, run } from "../util/starter.ts";
import { intersect } from "https://deno.land/std@0.167.0/collections/intersect.ts";
import { sum } from "https://deno.land/x/sum/mod.ts";
import { chunk } from "https://deno.land/std@0.167.0/collections/chunk.ts";

function parseInput() {
  return readInput().split("\n").map((line) => line.split(""));
}

function priority(item: string): number {
  return item === item.toUpperCase()
    ? item.charCodeAt(0) - 38
    : item.charCodeAt(0) - 96;
}

function part1() {
  const input = parseInput().map(
    (line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)],
  );

  return sum(
    input.map((rucksack) => intersect(...rucksack)).map((r) => priority(r[0])),
  );
}

function part2() {
  const input = parseInput();
  return sum(
    chunk(input, 3).map((group) => intersect(...group)).map((r) =>
      priority(r[0])
    ),
  );
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
});
