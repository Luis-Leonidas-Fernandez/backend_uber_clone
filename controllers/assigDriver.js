const { response } = require('express');
const Address      = require('../models/ubicacion');
const Driver       = require('../models/driver');
const { buscarZonaCercana } = require('../middlewares/buscar-zona');
const { updateStatusDriverAsing  } = require('../middlewares/drivers-to-base');
const { addDriverToAddress, } = require('../middlewares/address');
const {findBasesByIdsAndDrivers} = require('../middlewares/buscar-base');


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

        
        //Busca Zona mas Cercana - Extrae idBase y Distancia de las bases
         
        const zona = await buscarZonaCercana(ubicacion);       
        
        const idBase    = zona.basesIds;
        const distancia = zona.dist;        
        

         if(distancia > 3000) {   
          
          return res.json({
            ok: false,
            driversNotAvailable,
            miId
          })

        }
        
        // **** BUSCA TODAS LAS BASES DE UNA DETERMINADA ZONA MAS SUS CONDUCTORES *****
        const driverList = await findBasesByIdsAndDrivers(idBase);        
      
        //*** SEGUNDA PARTE ASIGNAR CONDUCTOR***              

        if( driverList.length !== 0 ){

            //Obteniendo Id de un Conductor           
         
            const idDriver = driverList[0].drivers._id.toString();           
            const id  = miId;
                               
            // Agregando Un Conductor a una address
       
            const userAddress = await addDriverToAddress(id, idDriver);           
            
            // no existe conductor para asignar
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
                          
        
    } catch (error) {
           
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

