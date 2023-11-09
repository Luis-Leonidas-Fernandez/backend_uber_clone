const { response } = require('express');
const Address = require('../models/ubicacion');
const Driver = require('../models/driver');
const mongoose = require('mongoose');

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
    const  noDisponible = 'no disponible';   
    const  driversNotAvailable = 'Conductores no disponibles';

    try {
       
       const resultado = await searchDriver(miId);      
           
       
        if(resultado[0]._id === '1'){

           
            return res.json({ ok: false, driversNotAvailable, miId});

        } else {

            const idDriver = resultado[0]._id.toString();           
            const id  = miId;
                                 

            const userAddress = await Address.findOneAndUpdate({miId: id },
                {$set: { idDriver: idDriver, estado: false }}, { new: true });     
                
            // TODO: ACTUALIZAR DRIVER STATUS: NO DISPONIBLES

            await Driver.findOneAndUpdate({_id: idDriver}, {$set: {status: noDisponible}}, { upsert: true });
                
         
                const data = {
                 userAddress                
             }  

            return res.json({ok: true , data});
            
        }      
    
        } catch (error) {
           
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
          
}


const searchDriver = async (miId) => {   

    const idUser = miId;    
   
    const drivers = await Driver.find({ $and: [{ _id: { $ne: idUser }}, {online: true},{order: 'libre'}, {status: 'disponible'}]})
    .sort({online: 'desc', order: -1, viajes: 1})
    .limit(20)
    .exec()        
    
    const obj =  await comprobarNullDriver(drivers);        
    
    return obj;   
           
      
}

const comprobarNullDriver = async (drivers) => {

    const driverArray = [];
   
    
    const idDriverNull =  [{_id: "1"}];    
    let len = drivers.length;
   
    if(len !== 0){
      
    for(let i= 0; i < len; i++){

        if(drivers[i].length !== 0 ){

            const obj = drivers[i];            
            driverArray.push(obj)
            
        }
        
    } 
    return driverArray;
} else{
    
    return idDriverNull;
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
    searchDriver,
    comprobarNullDriver
}

