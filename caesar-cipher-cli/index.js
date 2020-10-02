const  cipher = require('./cipher.js');

const { pipeline } = require('stream');
const arguments = process.argv; 
const fs = require('fs');

const file = '../caesar-cipher-cli/input.txt';
const Transform = require('stream').Transform;
const shift = arguments[2];
console.log('chunk.toString', shift);
//console.log(cipher.cipher(file, arguments[2]));

const getTransformStream = (shift) => {
    return new Transform({
      transform(chunk, encoding, callback) {
        this.push(cipher.cipher(chunk, shift));
        callback();
      }
    });
  };


pipeline(
  fs.createReadStream(file, 'utf8'),
  getTransformStream(shift),
  fs.createWriteStream(__dirname + '/outputT.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);