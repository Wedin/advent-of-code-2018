function part1(input) {
  let polymer = input[0];

  let lastLength = 0;
  let currentLength = 1;
  while (lastLength !== currentLength) {
    polymer = polymer.replace(/([a-z][A-Z])/g, s => (s[0].toLowerCase() == s[1].toLowerCase() ? "" : s));
    polymer = polymer.replace(/([A-Z][a-z])/g, s => (s[0].toLowerCase() == s[1].toLowerCase() ? "" : s));
    lastLength = currentLength;
    currentLength = polymer.length;
  }

  return polymer.length;
}

function part2(input) {
  input = input[0];
  let lowestScore = 100000;

  for (let letterIndex = 10; letterIndex < 37; letterIndex++) {
    const letter = letterIndex.toString(36);

    const replacer = new RegExp(`[${letter}]|[${letter.toUpperCase()}]`, "g");
    const score = part1([input.replace(replacer, "")]);
    lowestScore = score < lowestScore ? score : lowestScore;
  }

  return lowestScore;
}

module.exports = {
  part1,
  part2,
};
