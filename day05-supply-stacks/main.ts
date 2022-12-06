import { run } from "../util/starter.ts";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

function parseInput(rawInput: string): { stacks: string[][]; moves: Move[] } {
  const [rawStacks, rawMoves] = rawInput.split("\n\n");

  return {
    stacks: transposeStacks(rawStacks),
    moves: rawMoves.split("\n").map((line) => {
      const parts = line.split(" ");
      return {
        count: Number(parts[1]),
        from: Number(parts[3]),
        to: Number(parts[5]),
      };
    }),
  };
}

function transposeStacks(rawStacks: string) {
  const l1 = rawStacks.replaceAll("[", " ").replaceAll("]", " ").split(
    "\n",
  );
  const l2 = l1.slice(0, l1.length - 1)
    .map((
      line,
    ) => line.split(""));

  const result: string[][] = [];
  for (let i = 0; i < l2[0].length; i++) {
    const column: string[] = [];
    for (let j = l2.length - 1; j >= 0; j--) {
      column.push(l2[j][i]);
    }
    result.push(column);
  }

  return result.filter((row) => !row.every((e) => e === " ")).map((row) =>
    row.filter((e) => e !== " ")
  );
}

interface Move {
  from: number;
  to: number;
  count: number;
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  for (const move of input.moves) {
    for (let i = 0; i < move.count; i++) {
      const create = input.stacks[move.from - 1].pop()!;

      input.stacks[move.to - 1].push(create);
    }
  }

  return input.stacks.map((stack) => stack.pop()).join("");
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  for (const move of input.moves) {
    const fromStack = input.stacks[move.from - 1];
    const crates = fromStack.slice(fromStack.length - move.count);

    fromStack.splice(fromStack.length - move.count);

    input.stacks[move.to - 1].push(...crates);
  }

  return input.stacks.map((stack) => stack.pop()).join("");
}

run({
  part1: {
    test: {
      input: outdent`    [D]    
      [N] [C]    
      [Z] [M] [P]
       1   2   3 
      
      move 1 from 2 to 1
      move 3 from 1 to 3
      move 2 from 2 to 1
      move 1 from 1 to 2`,
      expected: "CMZ",
    },
    solution: part1,
  },
  part2: {
    test: {
      input: outdent`    [D]    
      [N] [C]    
      [Z] [M] [P]
       1   2   3 
      
      move 1 from 2 to 1
      move 3 from 1 to 3
      move 2 from 2 to 1
      move 1 from 1 to 2`,
      expected: "MCD",
    },
    solution: part2,
  },
});
