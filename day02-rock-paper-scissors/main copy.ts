import { readInput } from "../util/file.ts";

function parseInput1(): Round1[] {
  function toHand(c: string): Hand {
    switch (c) {
      case "A":
      case "X":
        return Hand.Rock;
      case "B":
      case "Y":
        return Hand.Paper;
      case "C":
      case "Z":
        return Hand.Scissor;
      default:
        throw Error("fak");
    }
  }

  return readInput().split("\n").map((line) => line.split(" ")).map((
    [t, y],
  ) => ({
    them: toHand(t),
    you: toHand(y),
  }));
}

// function parseInput2(): Round2[] {
//   return readInput().split("\n");
// }

enum Hand {
  Rock = 1,
  Paper = 2,
  Scissor = 3,
}

interface Round1 {
  them: Hand;
  you: Hand;
}

type Outcome = "win" | "lose" | "draw";

interface Round2 {
  them: Hand;
  outcome: Outcome;
}

function outcomeScore(a: Hand, b: Hand): 0 | 3 | 6 {
  if (a === b) {
    return 3;
  } else if (Math.floor(b.valueOf() + 1 / 3) === a.valueOf()) {
    return 6;
  } else {
    return 0;
  }
}

function score1(turn: Round1): number {
  return outcomeScore(turn.you, turn.them) + turn.you.valueOf();
}

// beats(a) - return hand that beats a

function part1() {
  const input = parseInput1();

  return input.map(score1).reduce((a, b) => a + b);
}

function part2() {
  //   const input = parseInput();

  return;
}

console.log("part1", part1());
console.log("part2", part2());
