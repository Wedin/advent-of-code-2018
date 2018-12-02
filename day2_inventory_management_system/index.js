/* global __dirname */
const fs = require("fs");
var path = require("path");

function getInput() {
  var inputPath = path.join(__dirname, "input.txt");
  var input = fs.readFileSync(inputPath, "utf8");
  return input.split("\n");
}

function countChars(string) {
  const splitId = string.split("");
  return splitId.reduce((acc, char) => {
    acc[char] ? acc[char]++ : (acc[char] = 1);
    return acc;
  }, {});
}

function part1(input) {
  const counter = input.reduce(
    (acc, id) => {
      const charCounts = countChars(id);

      if (Object.values(charCounts).includes(2)) acc[2]++;
      if (Object.values(charCounts).includes(3)) acc[3]++;

      return acc;
    },
    { 2: 0, 3: 0 }
  );

  return counter[2] * counter[3];
}

function part2(input) {
  const calcCharDiff = (string1, string2) => {
    let charDifference = 0;
    for (let index = 0; index < string1.length; index++) {
      string1[index] === string2[index] ? 0 : charDifference++;
    }

    return charDifference;
  };

  const getCommonChars = (string1, string2) => {
    return string1.split("").reduce((acc, currChar, idx) => {
      if (currChar == string2[idx]) acc += currChar;
      return acc;
    }, "");
  };

  for (let i = 0; i < input.length; i++) {
    const id1 = input[i];
    for (let j = 0; j < input.length; j++) {
      if (i === j) continue;

      const id2 = input[j];
      const charDiff = calcCharDiff(id1, id2);

      if (charDiff === 1) {
        return getCommonChars(id1, id2);
      }
    }
  }
}

part1(getInput());
part2(getInput());

module.exports = {
  part1,
  part2,
};
