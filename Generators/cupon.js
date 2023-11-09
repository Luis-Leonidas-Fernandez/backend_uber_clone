const crypto = require('crypto');
const { response } = require('express');



function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();
        // return required number of characters        

}

const generateVaucher = async(res = response) =>{

    const vaucher = randomValueHex(4)+"-"+randomValueHex(4)+"-"+randomValueHex(4);    
    return vaucher;

}




module.exports ={
    generateVaucher,
  
    
}
