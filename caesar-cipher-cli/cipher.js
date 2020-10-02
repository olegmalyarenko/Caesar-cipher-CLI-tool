const arguments = process.argv; 


console.log(arguments);

  
 function cipher(chunk, shift) { 
    const lowerCaseStr = chunk.toString().toLowerCase();
    console.log(lowerCaseStr);
    console.log('число', shift.toString());
    const alphabet = 'abcdefghijklomnopqrstuvwxyz'.split(' ');
    let newString = null;
  
    for (let i = 0; i < lowerCaseStr.length; i++) {
        let curLetter = lowerCaseStr[i];
        /*if (curLetter = NaN) {
          newString = curLetter;
          return  newString = curLetter;
        }*/
       
        const curIndex = alphabet[0].indexOf(curLetter);
        console.log('curIndex', curIndex);
        console.log('num', shift);
        let newIndex = Number(curIndex) + Number(shift);
        console.log('newIndex', newIndex);
        if(newIndex > 25) {
            newIndex = newIndex - 26;
            }    
        if(newIndex < 0 ) {
            newIndex = newIndex + 26;
            }
        if(lowerCaseStr[i] === chunk.toString()[i].toUpperCase() ) {
            newString += alphabet[0][newIndex].toUpperCase(); 
        } else {
          newString += alphabet[0][newIndex];
        }
         
    }
    // To extract number from string 
    console.log(newString);
    return  newString;
} 

//let sum = cipher(arguments[2], arguments[3]);
  
//console.log("Arg", sum);
module.exports = { cipher };