const solver = require(".");

const testInput = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];

test("part1", () => {
  expect(solver.part1(testInput)).toBe(17);
});

test("part2", () => {
  expect(solver.part2(testInput, true)).toBe(16);
});
