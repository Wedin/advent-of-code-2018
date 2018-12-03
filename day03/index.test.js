const solver = require(".");

const part1TestInput = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"];

test("part1", () => {
  expect(solver.part1(part1TestInput)).toBe(4);
});

test("part1", () => {
  expect(solver.part1(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2", "#4 @ 3,3: 2x2"])).toBe(4);
});
