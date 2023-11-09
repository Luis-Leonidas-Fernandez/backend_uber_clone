const { response } = require('express');
const Driver =  require('../models/driver');


const assigClient = async(req = request, res = response) => {          
   
    const { _id } = req.params;       
    const { idAddress }= req.body;    
    
    try {

       const UserAddress = await Driver.findByIdAndUpdate({_id: _id}, {$set: { idAddress: idAddress }}, { new: true });                       
        if (!UserAddress){
         return res.status(400).json({
            ok: false,
            msg: 'La direccion no puede ser registrada'
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

const removeClient = async(req = request, res = response) => {          
   
    const { _id } = req.params;       
    const { idAddress }= req.body;    
    
    try {

       const address = await Driver.findByIdAndUpdate({_id: _id}, {$pull: { idAddress: idAddress }});                       
     
       if (!address){
         return res.status(400).json({
            ok: false,
            msg: 'La direccion no puede ser eliminada'
        });
      }  
        const data = {
            address,                
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
    assigClient,
    removeClient
}

