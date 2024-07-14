const { redondearNumber } = require('../helpers/redondear');
const zonaRepository = require('../respositories/zona_respository');


const buscarZonas = async () =>  {  
   
        
        // validar si existen zonas
        const zonas = await zonaRepository.findAll(); 
            
        if ( !zonas ) {
            return true;  
        } else {
            return false;
        }
        
        
        /* // buscar las zonas mas cercanas
        const zona = await zonaRepository.findZonaCercana(ubicacion);
        
        // elije la base mas cercana y redondea la distancia
        const dist = redondearNumber(zona);
        
        
        const result = {
            zona,
            dist: dist
        }
        return result; */

    
}

const buscarZonaCercana= async (ubicacion) => {

    // buscar las zonas mas cercanas
    const zona = await zonaRepository.findZonaCercana(ubicacion);
        
    // elije la base mas cercana y redondea la distancia
    const dist = redondearNumber(zona);
    
    
    const result = {
        zona,
        dist: dist
    }
    return result;

}



module.exports = {
    buscarZonas,
    buscarZonaCercana
    
}
