const  cipher = require('./cipher.js');
const { pipeline } = require('stream');
const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
const Transform = require('stream').Transform;
const readline = require('readline');


program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);



program
   .option('-a, --action <value>', 'action')
   .option('-s, --shift <number>', 'shift')
   .option('-i, --input <value>', 'input file')
   .option('-o, --output <path>', 'output file');

  
 
program.parse(process.argv);
console.log(program.opts()); 
let shift = program.opts().shift;
let actionVal = program.opts().action;



  console.log('shift', shift);
  console.log('ACTION', actionVal); 

if (program.input) console.log(`input- ${program.input}`);
if (program.output) console.log(`input- ${program.output}`);


const getTransformStream = (shift, actionVal) => {
    return new Transform({
      transform(chunk) {
      
        this.push(cipher.runCipher(chunk, shift, actionVal));
        
        //callback();
      }
    });
  };
  const inputVal = program.opts().input;
    
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

pipeline(
  getReadableStream(inputVal),
  getTransformStream(shift, actionVal),
  fs.createWriteStream(__dirname + '/output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);