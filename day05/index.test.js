const solver = require(".");

test("part1", () => {
  expect(solver.part1(["dabAcCaCBAcCcaDA"])).toBe(10);
});

test("part2", () => {
  expect(solver.part2(["dabAcCaCBAcCcaDA"])).toBe(4);
});
