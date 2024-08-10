const { redondearNumber } = require('../helpers/redondear');
const zona_respository = require('../respositories/zona_respository');
const zonaRepository = require('../respositories/zona_respository');


const buscarZonas = async () =>  {  
   
        
        // validar si existen zonas
        const zonas = await zonaRepository.findAll(); 
            
        if ( !zonas ) {
            return true;  
        } else {
            return false;
        }
               
    
}

const buscarZonaCercanaPost= async (ubicacion) => {

    // buscar las zonas mas cercanas
    const zonas = await zonaRepository.findZonaCercana(ubicacion);  
   
    const baseId = zonas[0].basesId;   

    if(typeof baseId === "undefined") {

        const distance = 4000;
        return distance;

    } else {

        // elije la base mas cercana y redondea la distancia
      const dist = redondearNumber(zonas);
     
      return dist;

    }

      

}



const buscarZonaCercana= async (ubicacion) => {

    // buscar las zonas mas cercanas
    const zonas = await zonaRepository.findZonaCercana(ubicacion);
    
    
    const baseId = zonas[0].basesId;
    
    if(typeof baseId === "undefined") {
      
        const result = {
            baseId,
            dist: 4000
        }

        
        return result;

    } else {

      // elije la base mas cercana y redondea la distancia
      const dist = redondearNumber(zonas);
    
    
      const result = {
        baseId,
        dist: dist
      }
    return result;

    }
     
    

}



module.exports = {
    buscarZonas,
    buscarZonaCercana,
    buscarZonaCercanaPost
    
}
