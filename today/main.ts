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

function parseInput(rawInput: string): Map<string, Dir> {
  const root: Node = new Dir("/");

  const dirs: Map<string, Dir> = new Map([["/", root]]);

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
        dirs.set(lineList[1], dir);
      }
    }
  }

  return dirs;
}

// ls -> takewhile not $

// interface File {
//   name: string;
//   size: number;
// }

// interface Dir {
//   name: string;
//   content: Node[];
// }

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  const sizes = [];
  for (const node of input.values()) {
    sizes.push(size(node));
  }
  console.log(sizes);

  console.log(sizes.filter((s) => s <= 100_000));

  return sum(sizes.filter((s) => s <= 100_000));
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return;
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
    // test: {
    //   input: outdent``,
    //   expected: "",
    // },
    solution: part2,
  },
});
