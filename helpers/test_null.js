const comprobarNullDriver = async (drivers) => {

    const driverArray = [];
   
    
    const idDriverNull =  [];    
    let len = drivers.length;
   
    if(len !== 0){
      
    for(let i= 0; i < len; i++){

        if(drivers[i].length !== 0 ){

            const obj = drivers[i];                       
            driverArray.push(obj)
            
        }
        
    } 
    return driverArray;
} else{
    
    return idDriverNull;
}


}

module.exports ={
    
    comprobarNullDriver
}