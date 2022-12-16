import { run } from "../util/starter.ts";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";
import { sum } from "https://deno.land/x/sum@v1.1.0/mod.ts";

class File {
  constructor(public name: string, public size: number) {
  }
}

class Dir {
  constructor(
    public name: string,
    public parent?: Dir,
    public content: Node[] = [],
  ) {
  }
}

type Node = File | Dir;

function parseCmd(cmd: string) {
  const cmdList = cmd.split(" ");
  return [cmdList[1], cmdList[2]];
}

function getDirs(node: Dir): Dir[] {
  const dirs: Dir[] = [];
  const stack: Node[] = [node];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current instanceof Dir) {
      stack.push(...current.content);
      dirs.push(current);
    }
  }
  return dirs;
}

function dirSizes(root: Dir): number[] {
  const sizes = [];
  for (const dir of getDirs(root)) {
    sizes.push(size(dir));
  }
  return sizes;
}

function size(node: Dir): number {
  let total = 0;
  const stack: Node[] = [node];
  while (stack.length > 0) {
    const current = stack.pop()!;

    if (current instanceof File) {
      total += current.size;
    } else {
      stack.push(...current.content);
    }
  }
  return total;
}

function parseInput(rawInput: string): Dir {
  const root: Node = new Dir("/");

  const lines = rawInput.split("\n").slice(1);
  let currentNode: Dir | undefined = root;
  for (const line of lines) {
    if (line.startsWith("$")) {
      const [cmd, name] = parseCmd(line);
      if (cmd === "cd") {
        if (name === "..") {
          currentNode = currentNode?.parent;
        } else if (name === "/") {
          currentNode = root;
        } else {
          const child = currentNode?.content.find((c) => c.name === name);
          if (child instanceof File) {
            throw new Error("should be Dir");
          }
          currentNode = child;
        }
      } // else ls continue
    } else {
      // only files here
      const lineList = line.split(" ");
      if (Number(lineList[0])) {
        const file = new File(
          lineList[1],
          Number(lineList[0]),
        );
        currentNode?.content.push(file);
      } else {
        const dir = new Dir(
          lineList[1],
          currentNode,
        );
        currentNode?.content.push(dir);
      }
    }
  }

  return root;
}

function part1(rawInput: string) {
  const root = parseInput(rawInput);

  const sizes = dirSizes(root);

  return sum(sizes.filter((s) => s <= 100_000));
}

function part2(rawInput: string) {
  const root = parseInput(rawInput);

  const sizes = dirSizes(root);

  sizes.sort((a, b) => a - b);

  const totalUsed = sizes.at(-1)!; // root

  return sizes.find((size) => (70_000_000 - totalUsed + size) > 30_000_000);
}

run({
  part1: {
    test: {
      input: outdent`$ cd /
      $ ls
      dir a
      14848514 b.txt
      8504156 c.dat
      dir d
      $ cd a
      $ ls
      dir e
      29116 f
      2557 g
      62596 h.lst
      $ cd e
      $ ls
      584 i
      $ cd ..
      $ cd ..
      $ cd d
      $ ls
      4060174 j
      8033020 d.log
      5626152 d.ext
      7214296 k`,
      expected: 95437,
    },
    solution: part1,
  },
  part2: {
    test: {
      input: outdent`$ cd /
      $ ls
      dir a
      14848514 b.txt
      8504156 c.dat
      dir d
      $ cd a
      $ ls
      dir e
      29116 f
      2557 g
      62596 h.lst
      $ cd e
      $ ls
      584 i
      $ cd ..
      $ cd ..
      $ cd d
      $ ls
      4060174 j
      8033020 d.log
      5626152 d.ext
      7214296 k`,
      expected: 24933642,
    },
    solution: part2,
  },
});
