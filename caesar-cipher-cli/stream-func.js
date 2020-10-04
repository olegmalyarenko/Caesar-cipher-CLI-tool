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
    const readStream = fs.createReadStream(path, 'utf8');
    readStream.on('error', function () {
      process.stderr.write('stderr: input file doesn\'t exist or is not readable');
      process.exit(1);
    });
   
  return readStream; 
  
}

const getWritableStream = (outputVal) => {
  if (outputVal=== undefined) { 
    return  process.stdout;
  }
  let path = __dirname + `/${outputVal}`;
  return fs.createWriteStream(path, {
    flags: 'a'
  });

}

module.exports = { getWritableStream, getReadableStream, getTransformStream };