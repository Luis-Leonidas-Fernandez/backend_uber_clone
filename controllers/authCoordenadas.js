const { response } = require('express');
const { validarDistanciaEntreCoordendas} = require('../middlewares/validar-distancia');
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
            mensaje: {coordinates: [ -58.984374,-27.451225]}
          
            
        }

        const distancia = await validarDistanciaEntreCoordendas(ubicacion);        

        if(distancia === 1){           
           
            const address = new Address(imput);         
       
            const data =await address.save();                    
                        
            return res.status(200).json({data});

        } else{
            const data = {
                
                miId: null
            }
            return res.status(201).json({ data});;
        }

        

    } catch (error) {
       
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const removeAddress = async(req = request, res = response) => {   
           
    const {order, miId,  } = req.body;    
       
   try {
    
    
      const UserAddress = await Address.findOneAndUpdate({miId: miId}, {$unset: {miId: "", estado: ""}});                          
     

       if (!UserAddress){
        return res.status(400).json({
           ok: false,
           msg: 'El pedido no puede ser cancelado'
       });
     } 
     
     
     const idDriver = UserAddress.idDriver;        

        await Address.findOneAndUpdate({idDriver: idDriver}, {$unset:{idDriver: ""}});
        await Driver.findOneAndUpdate({_id: idDriver},
             {$set: 
                { order: order,
                    status: 'disponible',
                      upsert: true ,
                       }} );  

      

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
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getUbicacionesAutomatic = async(res= response ) => {
    
        const idAdmin = '6439d6398dbdb6d5224e0bd6';
        const idOrderNull =  [{miId: "1"}];
    try {

        const data = await Address.find({ $and: [{ _id: { $ne: idAdmin }}, {estado: true}]})
        .sort({createdAt: 'asc'})
        .limit(20)       
        
         const obj = await comprobarNull(data);        
        
         if (obj === null) {           
        
            return idOrderNull ;
        } else {
            return obj;
        }      
        
        

    } catch (error) {
       
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const comprobarNull = async (resultado) => {

    let result = [];
    const idOrderNull =  [{miId: "1"}];    
    let len = resultado.length;

    if(len !== 0){

    for(let i= 0; i < len; i++){

        if(resultado[i].length !== 0 ){

            const obj = resultado[i];            
            result.push(obj)
            
        }
        
    } 
    return result;
} else{
    return idOrderNull;
}
    
    
}


module.exports = {
    postUbicacion,
    getUbicaciones,
    finishTravelUser,
    removeAddress,
    getUbicacionesAutomatic
}

