const addressRepository = require('../respositories/address_repository');


const addDriverToAddress = async (id, idDriver) =>  {     
        
    //Buscar Una Address agrega un Conductor a la misma
    const address = await addressRepository.findByIdAddDriver(id, idDriver); 
    return address;   
    
}



module.exports = {
    addDriverToAddress
    
}