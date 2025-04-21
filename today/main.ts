import { run } from "../util/starter.ts";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

function parseInput(rawInput: string) {
  return rawInput;
}

type Dir = "R" | "D" | "L" | "U";

interface Motion {
  dir: Dir;
  amount: number;
}

function part1(rawInput: string) {
  const motions = parseInput(rawInput).split("\n").map((l) => {
    const [dir, amount] = l.split(" ");
    return {
      dir,
      amount: Number(amount),
    } as Motion;
  });

  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  return visitedCount;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return;
}

run({
  part1: {
    test: {
      input: outdent`R 4
      U 4
      L 3
      D 1
      R 4
      D 1
      L 5
      R 2`,
      expected: 13,
    },
    solution: part1,
  },
  part2: {
    // test: {
    //   input: outdent``,
    //   expected: "",
    // },
    solution: part2,
  },
});
