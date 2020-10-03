const  cipher = require('./cipher.js');
const { pipeline } = require('stream');
const { Command, action } = require('commander');
const program = new Command();
const arguments = process.argv; 
const fs = require('fs');

const file = '../caesar-cipher-cli/input.txt';
const Transform = require('stream').Transform;


program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);



program
   .option('-a, --action <value>', 'action')
   .option('-s, --shift <number>', 'shift')
   .option('-i, --input <path>', 'input file')
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


pipeline(
  fs.createReadStream(file, 'utf8'),
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