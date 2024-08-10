const { response } = require( 'express');
const Usuario =  require( '../models/usuario');
const {generateVaucher} = require('../Generators/cupon');



const getActiveUsers = async ( ) => {
  
    const {id} = "64d7d5fe08b40f10d3d53bf9";   
   
      
        const usuarios = await Usuario.find({ _id: { $ne: id }});
      

        if(!usuarios){
            return [];            
            
        }
        return usuarios;


    
}

const addPrice = async ( req = request, res = response ) => {
  
    const idUser = req.params._id;
    const body = req.body;
    
     try {       

        const costo = body.venta;        
        
        const  existVaucher = await  comprobarVauchers(idUser);

        if(existVaucher == false) return res.json({msg: 'Por favor ingrese un vaucher previamente'});
         
        const savePrice  =  await Usuario.findOneAndUpdate({_id: idUser}, {$set: { "cupon.1": costo }}, {new: true});
        
        

        if(!savePrice){
        
            return res.status(400).json({
                ok: false,
                msg: 'Error al ingresar el costo del vaucher'
            });

        }else{

            return res.json({
                ok: true,
                savePrice, 
    
            });
        }

    } catch (error) {

        
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }    
   
}


const addVaucher = async ( req = request, res = response ) => {
  
    const idUser = req.params._id;
    
    try {   

        const newVaucher = await generateVaucher();        

        const userDb  =  await Usuario.findOneAndUpdate({_id: idUser}, {$set: { "cupon.0": newVaucher }}, {new: true});       
        

        if(!userDb){
        
            return res.status(400).json({
                ok: false,
                msg: 'Eror al ingresar el vaucher'
            });

        }else{

            return res.json({
                ok: true,
                userDb, 
    
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }   
   
}

const deletedVauchers = async ( req = request, res = response) => {

    const idUser = req.params._id;
   
   try {
      
       const data = await Usuario.findOneAndUpdate({_id: idUser},{$set: { cupon: []}},{ new: true});     
     

       if (!data){
           return res.status(400).json({
              ok: false,
              msg: 'El cupon no pudo ser eliminado'
          });
        }  
                          
          return res.json({
              data
          });
      

       
   } catch (error) {
       
    
      return res.status(500).json({
           ok: false,
           msg: 'Hable con el administrador'
       });
       
   }

}



const comprobarVauchers = async(idUser) =>{
    
    
    const vauchers = await Usuario.find({_id: idUser}, {role: 0, _id:0, nombre: 0, password: 0, online:0, __v: 0, email: 0});  
    
    
   const cupon  = vauchers[0].cupon;
   const len = cupon.length;
  

   if(len > 0){

    
    return true;
   }else{
   
    return false;
   }
   
}




module.exports = {
    getActiveUsers,
    addVaucher,
    addPrice,
    comprobarVauchers,
    deletedVauchers
    
}