const  cipher = require('./cipher.js');
const { pipeline } = require('stream');
const arguments = process.argv; 
const fs = require('fs');

const file = '../caesar-cipher-cli/input.txt';
const Transform = require('stream').Transform;
const shift = arguments[2];
console.log('chunk.toString', shift);


const getTransformStream = () => {
    return new Transform({
      transform(chunk) {
        this.push(cipher.runCipher(chunk, shift));
        //callback();
      }
    });
  };


pipeline(
  fs.createReadStream(file, 'utf8'),
  getTransformStream(),
  fs.createWriteStream(__dirname + '/output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);