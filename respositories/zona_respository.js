
const Zona = require('../models/zona');

class ZonaRepository {
  
  //Buscar si existe una Zona
  
  async findAll() {
    return Zona.find();
  }
  
  
  //Buscar la zona mas cercana
  
  async findZonaCercana(ubicacion) {

    const latUser = ubicacion[1];
    const longUser  = ubicacion[0];
   
    try {

      const zona = await Zona.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [ longUser, latUser] },
            distanceField: "dist.calculated",
            maxDistance: 3000,                 
            includeLocs: "dist.location",
            spherical: true
          }
        }
      ])          
       
      return zona;
        
    } catch (error) {

    const distancia = 5000;
    return distancia;
        
    }
    
  }


  async findById(id) {
    return Zona.findById(id);
  }

  async create(userData) {
    const zona = new Zona(userData);
    return zona.save();
  }

  async update(id, userData) {
    return Zona.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return Zona.findByIdAndDelete(id);
  }
}

module.exports = new ZonaRepository();
