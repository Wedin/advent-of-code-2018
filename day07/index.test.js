const solver = require(".");

const testInput = [
  "Step C must be finished before step A can begin.",
  "Step C must be finished before step F can begin.",
  "Step A must be finished before step B can begin.",
  "Step A must be finished before step D can begin.",
  "Step B must be finished before step E can begin.",
  "Step D must be finished before step E can begin.",
  "Step F must be finished before step E can begin.",
];

test("part1", () => {
  expect(solver.part1(testInput)).toBe("CABDFE");
});

test("part2", () => {
  expect(solver.part2(testInput, { numWorkers: 2, stepStart: 0 })).toBe(15);
});
