const fs = require('fs');

function getInputArray() {
    var input = fs.readFileSync('./input.txt', 'utf8');
    return input.split('\n')
}

function parseFrequency(freq) {
    return freq.startsWith('+')
        ? parseInt(freq.slice(1), 10)
        : -parseInt(freq.slice(1), 10)
}

function puzzle() {
    const input = getInputArray();
    return input.reduce((acc, curr) => {
        return acc + parseFrequency(curr)
    }, 0)
}

function part2Puzzle() {
    const input = getInputArray();
    const frequencyMap = {};
    let duplicatedFrequency = undefined;
    let freqChange = 0;

    while (!duplicatedFrequency) {
        for (let index = 0; index < input.length; index++) {
            const currFreq = parseFrequency(input[index]);
            freqChange = freqChange + currFreq;

            if (frequencyMap[freqChange]) {
                duplicatedFrequency = freqChange;
                break;
            } else {
                frequencyMap[freqChange] = true;
            }
        }
    }

    return duplicatedFrequency;
}


const resultPart1 = puzzle();
const resultPart2 = part2Puzzle();
console.log('result part 1: ', resultPart1);
console.log('result part 2: ', resultPart2);
