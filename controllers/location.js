const Address=  require('../models/ubicacion');

const grabarLocation = async (location) => {

 const lat = location.mensaje.coordinates[0];
 const long = location.mensaje.coordinates[1];
      
  const idOrder = location.idOrder;              
  
      
    try {
         // Buscar el documento por id
          const documento = await Address.findById(idOrder);
      
          if (!documento) {           
            return false;
          }
      
          // Verificar si las coordenadas ya existen
          const coordenadasExistentes = documento.mensaje.coordinates;
          const existLat = coordenadasExistentes.includes(lat);
          const existLong = coordenadasExistentes.includes(long);
      
          if (existLat && existLong) {           
            return true;
          }      
      
          // Actualizar el documento
          const point = location.mensaje.coordinates;
          const data = await Address.findOneAndUpdate(
            { _id: idOrder },
            {
              $addToSet: { 'mensaje.coordinates': point }
            },
            { new: true } // Devuelve el documento actualizado
          );
      
         
          return true;
        } catch (error) {         
          return false;
        }
      };
      
      

module.exports= {
     grabarLocation
}