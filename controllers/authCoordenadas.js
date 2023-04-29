const { response } = require('express');
const Address=  require('../models/ubicacion');
const Usuario = require('../models/usuario');
const Driver = require('../models/driver');

const postUbicacion = async(req, res = response) => {

   
    const { miId, estado, ubicacion } = req.body;

    try {

        const usuarioDb    = await Usuario.findOne({miId});
       
        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'la Ubicacion no puede ser registrada'
            });
        }



        const imput = {
            miId: miId,
            estado: estado,            
            ubicacion: ubicacion,
            mensaje: {coordinates: [-27.451225, -58.984374]}
          
            
        }
       
        const address = new Address(imput);
       

        const data ={
            miId: miId,
            estado: estado,            
            ubicacion: ubicacion,
           
        }
        

        await address.save();

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
const removeAddress = async(req = request, res = response) => {   
           
    const {order, miId,  } = req.body;    
       
   try {
    
    
      const UserAddress = await Address.findOneAndUpdate({miId: miId}, {$unset: {miId: "", idDriver: "", estado: ""}});
                          
      console.log(UserAddress);                                      
       if (!UserAddress){
        return res.status(400).json({
           ok: false,
           msg: 'El conductor no puede ser eliminado'
       });
     } 
     
     const idDriver = UserAddress.idDriver;

     await Driver.findOneAndUpdate({_id: idDriver}, {$set: { order: order,  upsert: true }} );  



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

const finishTravelUser = async(req, res = response) => {

    
    const  idDriver  = req.body.idDriver;
    const  order     = req.body.order; 
 
     try {
 
        const UserAddress = await Address.findOneAndUpdate({idDriver: idDriver},{ $unset: { idDriver: "" }} );
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
 



const getUbicaciones = async(req, res = response) => {
    
    try {

        const addresses = await Address.find({ $and: [{ _id: { $ne: req._id }}, {estado: true}]})
        .sort({createdAt: 'asc'})
        
        if (!addresses) {
            return res.status(404).json({
                ok: false,
                msg: 'las ordenes no puede ser halladas'
            });
        }       
        

        res.json({            
            
            addresses

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
    postUbicacion,
    getUbicaciones,
    finishTravelUser,
    removeAddress
}

