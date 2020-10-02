const fs = require('fs');
//const { pipeline } = require('stream');

const file = '../caesar-cipher-cli/input.txt';
const myReadable = fs.createReadStream(file, 'utf8');

myReadable.on('data', (chunk) => {
    console.log(chunk);
});