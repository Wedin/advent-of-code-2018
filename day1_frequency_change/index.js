const fs = require("fs");

function getInputArray() {
  var input = fs.readFileSync("./input.txt", "utf8");
  return input.split("\n").map(parseFrequency);
}

function parseFrequency(freq) {
  return freq.startsWith("+") ? parseInt(freq.slice(1), 10) : -parseInt(freq.slice(1), 10);
}

const fixInput = input => input.map(parseFrequency);
const puzzle = input => input.reduce((acc, curr) => acc + curr, 0);

function part2Puzzle(input) {
  const seenFrequenciesMap = {};
  let duplicatedFrequency = undefined;
  let freqChange = 0;

  while (!duplicatedFrequency) {
    for (let index = 0; index < input.length; index++) {
      const currFreq = input[index];
      freqChange = freqChange + currFreq;

      if (seenFrequenciesMap[freqChange]) {
        duplicatedFrequency = freqChange;
        break;
      } else {
        seenFrequenciesMap[freqChange] = true;
      }
    }
  }

  return duplicatedFrequency;
}

function main() {
  const resultPart1 = puzzle(getInputArray());
  const resultPart2 = part2Puzzle(getInputArray());
  console.log("result part 1: ", resultPart1);
  console.log("result part 2: ", resultPart2);
}

// main()

module.exports = {
  part1: puzzle,
  part2: part2Puzzle,
  fixInput,
  main,
};
