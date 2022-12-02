export function readInput(): string {
  return Deno.readTextFileSync("input.txt");
}

export function run(input: any) {
  console.log("part1", input.part1.solution());
  console.log("part2", input.part2.solution());
}
