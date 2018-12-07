const getPossibleSteps = (instructions, addedLetters, allLetters) => {
  const restrictedActions = new Set();

  instructions.forEach(([c1, c2]) => {
    // action is possible
    if (!addedLetters.has(c1)) {
      restrictedActions.add(c2);
    }
  });

  return allLetters.filter(l => !addedLetters.has(l) && restrictedActions.has(l) === false).sort();
};

const getAllLetters = instructions => {
  const allLettersSet = new Set();
  instructions.forEach(([x, y]) => {
    allLettersSet.add(x);
    allLettersSet.add(y);
  });

  return [...allLettersSet];
};

function part1(input) {
  const instructions = input.map(input => [input[5], input[36]]);
  const addedLetters = new Set();
  const allLetters = getAllLetters(instructions);

  while (addedLetters.size !== allLetters.length) {
    const possibleSteps = getPossibleSteps(instructions, addedLetters, allLetters);
    addedLetters.add(possibleSteps[0]);
  }

  return [...addedLetters].join("");
}

function part2(input, { numWorkers = 5, stepStart = 60 } = {}) {
  const instructions = input.map(input => [input[5], input[36]]);
  const addedLetters = new Set();
  const stepsInWork = new Set();
  const allLetters = getAllLetters(instructions);
  let tick = 0;
  const workers = {};

  while (addedLetters.size !== allLetters.length) {
    const possibleSteps = getPossibleSteps(instructions, addedLetters, allLetters);

    for (let worker = 0; worker < numWorkers; worker++) {
      if (workers[worker] === undefined) {
        // Worker is not working
        const step = possibleSteps.filter(step => !stepsInWork.has(step))[0];
        if (!step) continue;

        workers[worker] = { step, doneAtTick: tick + stepStart + (step.charCodeAt(0) - 65) };
        stepsInWork.add(step);
      }

      if (workers[worker].doneAtTick === tick) {
        addedLetters.add(workers[worker].step);
        workers[worker] = undefined;
      }
    }

    tick++;
  }

  return tick;
}

module.exports = {
  part1,
  part2,
};
