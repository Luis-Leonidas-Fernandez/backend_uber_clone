const { redondearNumber } = require('../helpers/redondear');
const Base = require('../models/base');


const buscarBases = async (ubicacion ) =>  {      
   
        
        // validar si existen bases
        const bases= await Base.find(); 
            
        if ( !bases ) return 3000;
        
        // buscar las bases mas cercanas
        const base = await buscarBaseCercana(ubicacion);
        
        // elije la base mas cercana y redondea la distancia
        const dist = redondearNumber(base);
       
       
        return dist;
    
}



const buscarBaseCercana = async(ubicacion) => {

    const latUser = ubicacion[0];
    const longUser  = ubicacion[1];
   
    try {

       const base = await Base.aggregate([
            {
              $geoNear: {
                 near: { type: "Point", coordinates: [ longUser, latUser] },
                 distanceField: "dist.calculated",
                 maxDistance: 5000,                 
                 includeLocs: "dist.location",
                 spherical: true
              }
            }
         ]) 

         return base;
        
    } catch (error) {


        const distancia = [];
        return distancia;
        
    }
}




module.exports ={
    buscarBases
}
