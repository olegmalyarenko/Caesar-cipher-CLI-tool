const fs = require('fs');
const Transform = require('stream').Transform;
const  cipher = require('./cipher.js');

const getTransformStream = (shift, actionVal) => {
    return new Transform({
      transform(chunk) {
        this.push(cipher.runCipher(chunk, shift, actionVal));
      }
    });
  };
  
const getReadableStream = (inputVal) => {
  if (inputVal === undefined) {
    process.stdin.setEncoding('utf8');
      return process.stdin.on('readable', () => {
      process.stdin.read();
      });
   }
   
   let path = `./${inputVal}`;
   return fs.createReadStream(path, 'utf8');
}

const getWritableStream = (outputVal) => {
  console.log('outputVal', outputVal);
  if (outputVal=== undefined) { 
    return  process.stdout;
  }
  let path = __dirname + `/${outputVal}`;
  return fs.createWriteStream(path);

}

module.exports = { getWritableStream, getReadableStream, getTransformStream };