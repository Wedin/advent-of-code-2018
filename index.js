/* global process */
const fs = require("fs");

function getArgs() {
  const day = process.argv[2];
  const part = process.argv[3];

  return { day, part };
}

function getPath(args) {
  const path = fs.readdirSync("./").reduce((dir, curr) => {
    if (curr.startsWith(args.day)) {
      dir = curr;
    }
    return dir;
  }, "");
  return `./${path}`;
}

function getInput(path) {
  const input = fs.readFileSync(`${path}/input.txt`, "utf8");
  return input.split("\n");
}

function runSolution(solver, day, part, input) {
  if (!solver[part]) {
    console.log(`No solution for ${day} ${part}!`);
    return;
  }
  const result = solver[part](input);
  console.log(`Running ${day} ${part}:`);
  console.log(result);
}

function run() {
  const args = getArgs();
  const path = getPath(args);

  if (path == "" || path == "./") {
    console.log(`No solution for ${args.day}!`);
    return;
  }

  const solver = require(`${path}/index.js`);
  const input = getInput(path);

  if (args.part) {
    runSolution(solver, args.day, args.part, input);
  } else {
    runSolution(solver, args.day, "part1", input);
    runSolution(solver, args.day, "part2", input);
  }
}

run();
