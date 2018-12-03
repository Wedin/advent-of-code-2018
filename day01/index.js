function parseFrequency(freq) {
  return freq.startsWith("+") ? parseInt(freq.slice(1), 10) : -parseInt(freq.slice(1), 10);
}

const puzzle = input => {
  const parsed = input.map(parseFrequency);
  return parsed.reduce((acc, curr) => acc + curr, 0);
};

function part2Puzzle(input) {
  const parsed = input.map(parseFrequency);
  const seenFrequenciesMap = {};
  let duplicatedFrequency = undefined;
  let freqChange = 0;

  while (!duplicatedFrequency) {
    for (let index = 0; index < parsed.length; index++) {
      const currFreq = parsed[index];
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

module.exports = {
  part1: puzzle,
  part2: part2Puzzle,
};
