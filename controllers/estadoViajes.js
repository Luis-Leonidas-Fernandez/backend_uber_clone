const { response } = require('express');
const Driver = require('../models/driver');
const Address = require('../models/ubicacion');
const mongoose = require('mongoose');

const statusDriverDisconnect = async(req = request, res = response) => {          
   
      
    const {_id, online }= req.body;    
    
   try {
      
      const driverStatus = await Driver.findOneAndUpdate({_id: _id}, {$set: { online: online }});
                                              
       if (!driverStatus){
        return res.status(400).json({
           ok: false,
           msg: 'El conductor no puede actualizar el estado del viaje'
       });
     }  
       const data = {
           driverStatus,
                          
       } 
                       
       res.json({
           driverStatus,
           
       });
   
       } catch (error) {
          
           res.status(500).json({
               ok: false,
               msg: 'Hable con el administrador'
           });
   }
         
}

const statusDriverArrived = async(req = request, res = response) => {          
   
      
    const {_id, status }= req.body;    
    
   try {
      
      const driverStatus = await Driver.findOneAndUpdate({_id: _id}, {$set: { order: status }});
                                              
       if (!driverStatus){
        return res.status(400).json({
           ok: false,
           msg: 'El conductor no puede actualizar el estado del viaje'
       });
     }  
       const data = {
           driverStatus,
                          
       } 
                       
       res.json({
           driverStatus,
           
       });
   
       } catch (error) {
          
           res.status(500).json({
               ok: false,
               msg: 'Hable con el administrador'
           });
   }
         
}

const locationDriverUpdate = async(req = request, res = response) => {          
   
      
    const { mensaje, idDriver, idOrder,  } = req.body;
    const positionDriver = JSON.parse(mensaje);        
    const point = (positionDriver.coordinates).reverse();    

   
   try {
      
    const driverLocation = await Address.findOneAndUpdate({_id: idOrder}, 

        {$addToSet: {
            mensaje: {coordinates: point}
        }});   
                                              
       if (!driverLocation){
        return res.status(400).json({
           ok: false,
           msg: 'la ubicacion del conductor no se puede actualizar'
       });
     }  
       const data = {
           driverLocation,
                          
       } 
                       
       res.json({
           driverLocation,
           
       });
   
       } catch (error) {
         
           res.status(500).json({
               ok: false,
               msg: 'Hable con el administrador'
           });
   }
         
}


const statusUpdate = async(req = request, res = response) => {          
   
      
     const { _id, order, viajes }= req.body;    
     
    try {
       
       const driverStatus = await Driver.findByIdAndUpdate({_id: _id}, {$set: { order: order }, $inc: { viajes: viajes}}, { upsert: true });
                                               
        if (!driverStatus){
         return res.status(400).json({
            ok: false,
            msg: 'El conductor no puede actualizar el estado del viaje'
        });
      }  
        const data = {
            driverStatus,
                           
        } 
                        
        res.json({
            driverStatus,
            
        });
    
        } catch (error) {
           
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
          
}

const finishTravel = async(req = request, res = response) => {   
           
    const  idDriver  = req.body.idDriver;
    const  order     = req.body.order;
    const status   = req.body.status; 
    
   try {

      const UserAddress = await Address.findOneAndUpdate({idDriver: idDriver},{$set: { estado: true }, $unset: { idDriver: "", }} );
                          await Driver.findOneAndUpdate({_id: idDriver}, {$set: { order: order,  status: status}});                       
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

module.exports = {
    statusUpdate,
    finishTravel,
    locationDriverUpdate,
    statusDriverArrived,
    statusDriverDisconnect
      
}

