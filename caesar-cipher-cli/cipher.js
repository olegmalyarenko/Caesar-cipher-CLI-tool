const alphabet = "abcdefghijklmnopqrstuvwxyz";
const fullAlphabet = alphabet + alphabet + alphabet;

function runCipher( chunk, shift, actionVal ){
  console.log('action cipher', typeof actionVal); //encode/decode 
  if (actionVal != 'encode' && actionVal != 'decode') {
    console.error('Write correct action!');
    return; 
  }
  console.log('shift cipher', shift);
  let textChunk = chunk.toString();
  console.log('chank cipher', textChunk);
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
       if(actionVal === 'encode') index = Number(index) + Number(cipherOffset) + Number(alphabet.length);
       if(actionVal === 'decode') index = Number(index) - Number(cipherOffset) + Number(alphabet.length);
       let nextLetter = fullAlphabet[index];
       //console.log('stringch', textChunk[i]);
       if(textChunk[i] === letter.toUpperCase()) nextLetter = nextLetter.toUpperCase();
       cipherFinish += nextLetter;
     }
  }
  console.log('cipherFinish', cipherFinish);
  return cipherFinish;
}


module.exports = {  runCipher };
