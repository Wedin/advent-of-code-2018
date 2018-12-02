const day1 = require(".");

test("part1", () => {
  expect(day1.part1(["+1", "+1", "+1"])).toBe(3);
  expect(day1.part1(["+1", "+1", "-2"])).toBe(0);
  expect(day1.part1(["-1", "-2", "-3"])).toBe(-6);
});
