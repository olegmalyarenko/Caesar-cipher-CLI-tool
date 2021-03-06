const alphabet = "abcdefghijklmnopqrstuvwxyz";
const fullAlphabet = alphabet + alphabet + alphabet;

function runCipher( chunk, shift, actionVal ){

  if (actionVal != 'encode' && actionVal != 'decode') {
    process.stderr.write('stderr: Write correct action!');
    process.exit(1);
  }
  if(isNaN(shift)) {
    process.stderr.write('stderr: Write correct shift value!');
    process.exit(1);
  }
  
  let textChunk = chunk.toString();
  const cipherText = textChunk.toLowerCase();
  const cipherOffset = Number(shift.toString());
  let cipherFinish = '';

  for(i=0; i<cipherText.length; i++){
     let letter = cipherText[i];
     let index = alphabet.indexOf(letter);
    
     if(index == -1){
       cipherFinish += letter;
     } else { 
       if(actionVal === 'encode') index = Number(index) + Number(cipherOffset) + Number(alphabet.length);
       if(actionVal === 'decode') index = Number(index) - Number(cipherOffset) + Number(alphabet.length);
       let nextLetter = fullAlphabet[index];
       if(textChunk[i] === letter.toUpperCase()) nextLetter = nextLetter.toUpperCase();
       cipherFinish += nextLetter;
     }
  }
 
  return cipherFinish;
}


module.exports = {  runCipher };
