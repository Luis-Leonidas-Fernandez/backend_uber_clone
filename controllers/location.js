const Address=  require('../models/ubicacion');

const grabarLocation = async ( location ) => {
     
      const driverLocation = location.mensaje;
     
      /* const coordinatesA = driverLocation.coordinates[0];     
      const coordinatesB = driverLocation.coordinates[1];     
      const latLng = coordinatesA+ "," +coordinatesB;
      console.log(latLng); */

      const idDriver = location.idDriver;
      console.log(idDriver);

      const idOrder = location._id;
      console.log(idOrder);
        
        
      try {
          
          const data = await Address.findOneAndUpdate({_id: idOrder}, 

          {$addToSet: {
            mensaje: driverLocation             
        }});

          console.log(data);      
          return true;
  
      } catch (error) {
          return false;
      }  
      

}

module.exports= {
     grabarLocation
}