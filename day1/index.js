const fs = require('fs');

function getInputArray() {
    var input = fs.readFileSync('./input.txt', 'utf8');
    const split = input.split('\n')
    return split;
}

function parseFrequency(freq) {
    let value;
    if (freq.startsWith('+')) {
        value = parseInt(freq.slice(1), 10);
    } else {
        value = -1 * parseInt(freq.slice(1), 10)
    }
    return value;
}

function puzzle() {
    const input = getInputArray();
    return input.reduce((acc, curr) => {
        return acc + parseFrequency(curr)
    }, 0)
}


const result = puzzle();
console.log('result: ', result);
