function readInput(): string {
  return Deno.readTextFileSync("input.txt");
}

export function run(input: any) {
  if (input.part1.test) {
    const output = input.part1.solution(input.part1.test.input);
    const expected = input.part1.test.expected;
    if (
      output === expected
    ) {
      console.log("%cPart1 test passed", "color: green");
    } else {
      console.log("%cTest part1 failed", "color: red");
      console.log(`%cgot: ${output}`, "color: red");
      console.log(`%cexpected: ${expected}`, "color: red");
      return;
    }
    console.log("part1", input.part1.solution(readInput()));
  }
  if (input.part2.test) {
    const output = input.part2.solution(input.part2.test.input);
    const expected = input.part2.test.expected;
    if (
      output === expected
    ) {
      console.log("%cPart2 test passed", "color: green");
    } else {
      console.log("%cTest part2 failed", "color: red");
      console.log(`%cgot: ${output}`, "color: red");
      console.log(`%cexpected: ${expected}`, "color: red");
      return;
    }
    console.log("part2", input.part2.solution(readInput()));
  }
}
