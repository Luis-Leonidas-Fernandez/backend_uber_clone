const { response } = require('express');
const Driver = require('../models/driver');
const Address = require('../models/ubicacion');
const mongoose = require('mongoose');

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
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
    }
          
}

const finishTravel = async(req = request, res = response) => {   
           
    const  idDriver  = req.body.idDriver;
    const  order     = req.body.order; 
    
   try {

      const UserAddress = await Address.findOneAndUpdate({idDriver: idDriver},{$set: { estado: true }, $unset: { idDriver: "" }} );
                          await Driver.findOneAndUpdate({_id: idDriver}, {$set: { order: order,  upsert: true }} );                       
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
           console.log(error);
           res.status(500).json({
               ok: false,
               msg: 'Hable con el administrador'
           });
   }
         
}

module.exports = {
    statusUpdate,
    finishTravel
      
}

