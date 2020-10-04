const { pipeline } = require('stream');
const { Command } = require('commander');
const program = new Command();
const  streamFunc = require('./stream-func.js');

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);

program
   .option('-a, --action <value>', 'action')
   .option('-s, --shift <number>', 'shift')
   .option('-i, --input <value>', 'input file')
   .option('-o, --output <path>', 'output file');

program.parse(process.argv);
let shift = program.opts().shift;
let actionVal = program.opts().action;
const inputVal = program.opts().input;
const outputVal = program.opts().output;

pipeline(
  streamFunc.getReadableStream(inputVal),
  streamFunc.getTransformStream(shift, actionVal),
  streamFunc.getWritableStream(outputVal),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);