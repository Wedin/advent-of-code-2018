const day2 = require(".");

const part1TestInput = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"];
const part2TestInput = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];

test("part1", () => {
  expect(day2.part1(part1TestInput)).toBe(12);
});

test("part2", () => {
  expect(day2.part2(part2TestInput)).toBe("fgij");
});
