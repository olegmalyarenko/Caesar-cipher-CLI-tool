const alphabet = "abcdefghijklmnopqrstuvwxyz";
const fullAlphabet = alphabet + alphabet + alphabet;

function runCipher( chunk, shift ){
  let textChunk = chunk.toString();
  const cipherText = textChunk.toLowerCase();
  const cipherOffset = Number(shift.toString());
  //cipherOffset = (cipherOffset % alphabet.length);
  let cipherFinish = '';

  for(i=0; i<cipherText.length; i++){
     let letter = cipherText[i];
    
     let index = alphabet.indexOf(letter);
    
     if(index == -1){
       cipherFinish += letter;
     } else {
       index = Number(index) + Number(cipherOffset) + Number(alphabet.length);
       let nextLetter = fullAlphabet[index];
       console.log('stringch', textChunk[i]);
       if(textChunk[i] === letter.toUpperCase()) nextLetter = nextLetter.toUpperCase();
       cipherFinish += nextLetter;
     }
  }
  console.log(cipherFinish);
  return cipherFinish;
}


module.exports = {  runCipher };
