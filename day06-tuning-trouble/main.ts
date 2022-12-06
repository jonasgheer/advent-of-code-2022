import { run } from "../util/starter.ts";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";
import { slidingWindows } from "https://deno.land/std@0.110.0/collections/mod.ts";
import { distinct } from "https://deno.land/std@0.110.0/collections/mod.ts";

function parseInput(rawInput: string) {
  return rawInput.split("");
}

function processCount(chars: string[], windowSize: number) {
  let count = windowSize;
  for (const window of slidingWindows(chars, windowSize)) {
    if (distinct(window).length === windowSize) return count;
    count++;
  }
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  return processCount(input, 4);
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return processCount(input, 14);
}

run({
  part1: {
    test: {
      input: outdent`nppdvjthqldpwncqszvftbrmjlhg`,
      expected: 6,
    },
    solution: part1,
  },
  part2: {
    test: {
      input: outdent`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
      expected: 29,
    },
    solution: part2,
  },
});
