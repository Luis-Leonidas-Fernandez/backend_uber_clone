const { redondearNumber } = require('../helpers/redondear');
const driverRepository = require('../respositories/drivers_repository');


const searchDrivers = async (idBase ) =>  {     
        
    // Buscar Conductores de una base
    const drivers = await driverRepository.findAll(idBase); 
    
    return drivers;   
    
}


const updateStatusDriverAsing = async (idDriver, noDisponible) => {   
    
    //Actualiza el Estatus del Conductor
    const resp = await driverRepository.findByIdUpdateStatus(idDriver, noDisponible);
    return resp;  
}







module.exports = {
    searchDrivers,
    updateStatusDriverAsing
    
    
}