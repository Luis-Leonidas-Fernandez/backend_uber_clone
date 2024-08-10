const { response } = require('express');
const Address      = require('../models/ubicacion');
const Driver       = require('../models/driver');
const { buscarZonas, buscarZonaCercana } = require('../middlewares/buscar-zona');
const { searchDrivers, updateStatusDriverAsing  } = require('../middlewares/drivers-to-base');
const { addDriverToAddress, } = require('../middlewares/address');

const assigDriver = async(req = request, res = response) => {          
   
    const  miId = req.body.miId;   
   
    try {

        const drivers = await Driver.find({ $and: [{ _id: { $ne: miId }}, {online: true},{order: 'libre'}]})
        .sort({online: 'desc', order: -1, viajes: 1})        
        .limit(20)
        
        

        const driver = drivers[0];        
        const result = driver._id; 
        const idDriver = result.toString();
       

       const UserAddress = await Address.findOneAndUpdate({miId: miId}, {$set: { idDriver: idDriver, estado: false }}, { new: true });                       
        if (!UserAddress){
         return res.status(400).json({
            ok: false,
            msg: 'El conductor no puede ser registrado'
        });
      }  
        const data = {
            UserAddress,                
        } 
                        
        res.json({
            data
        });
    
        } catch (error) {
           
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
          
}

const assigDriverAutomatic = async( req = request, res = response ) => {          
   
    const  miId = req.params._id;
    const ubicacion = req.body;    
    
    const  noDisponible = 'no disponible';   
    const  driversNotAvailable = 'Conductores no disponibles';

    try {

        
        //Busca Zona mas Cercana - Extrae idBase y Distancia de la base
         
        const res = await buscarZonaCercana(ubicacion);       
      
        const idBase    = res.baseId;
        const distancia = res.dist;        
        

        if(distancia > 3000) {   
          
          return res.json({
            ok: false,
            driversNotAvailable,
            miId
          })

        }
       
     
        ///*** SEGUNDA PARTE BUSCAR Y ASIGNAR CONDUCTOR***
       

       // Buscar Conductores disponibles de una determinada base       
       const driverList = await searchDrivers(idBase);     
            

       if(driverList.length > 0){

            //Obteniendo Id de un Conductor           
         
            const idDriver = driverList[0]._id.toString();           
            const id  = miId;
                                 
            // Agregando Un Conductor a una address

            const userAddress = await addDriverToAddress(id,idDriver);
            
            if(userAddress.length == 0) {
               
              return res.json({
                ok: false,
                driversNotAvailable,
                miId
             });  
            }
                
            // Actualizando el Modelo DRIVER en su campo Status: NO DISPONIBLES

            await updateStatusDriverAsing(idDriver, noDisponible);
                
         
             const data = {
                userAddress                
             }  

            return res.json({ok: true , data});
            
        } else {

            return res.json({ ok: false, driversNotAvailable, miId});
        }
        
    }catch (error) {
           
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    } 
          
}




const removeDriver = async(req = request, res = response) => {   
           
     const { idDriver } = req.body.idDriver;    
        
    try {
        
       const UserAddress = await Address.findOneAndUpdate({idDriver: idDriver},{$unset: { idDriver: ""}} );
                                               
        if (!UserAddress){
         return res.status(400).json({
            ok: false,
            msg: 'El conductor no puede ser eliminado'
        });
      }  
        const data = {
            UserAddress,                
        } 
                        
        res.json({
            data
        });
    
        } catch (error) {
           
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
          
}



module.exports ={
    assigDriver,
    removeDriver,
    assigDriverAutomatic,
    
    
}

