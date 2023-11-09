const Address=  require('../models/ubicacion');

const grabarLocation = async ( location ) => {
     
      const driverLocation  = location.mensaje;
      const idOrder = location.idOrder;      
      //const idDriver = location.idDriver;     
            
     
        
      try {
          
         
          
          const data = await Address.findOneAndUpdate({_id: idOrder}, 

          {$addToSet: {
            mensaje: driverLocation             
        }});
           
          return true;
  
      } catch (error) {
          return false;
      }  
      

}

module.exports= {
     grabarLocation
}