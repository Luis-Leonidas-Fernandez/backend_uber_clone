const { response } = require('express');
const Zona = require('../models/zona');
const Driver = require('../models/driver');
const Admin = require('../models/admin');
const Base = require('../models/base');
const ObjectId = require('mongodb').ObjectId;



const addBaseDriver = async(req = request, res = response) => {          
   
    const  idDriver = req.params._id;
    
    const  { zona, base } = req.body;   
   
   

        //verifica si la zona existe

        const existZona = await Zona.find({ zona: zona})     
        
                             
        if (!existZona) {

         return res.status(400).json({
            ok: false,
            msg: 'la zona no se halla registrada'
        });
      }  
      
      //verifica que el conductor no se halle inscripto en una base
      const existDriver = await Base.findOne({ idDriver: idDriver})
     
     if (existDriver){

        return res.status(400).json({
           ok: false,
           msg: 'El conductor ya fue registrado con anterioridad en esta base'
       });

     }
      
     //busca la base y zona recibida por la request 
      const existBase = await Base.find({  $and: [{base: base}, {zonaName: zona}]})

      const leng =  existBase.length;
     

      if (leng === 0){

        return res.status(400).json({
           ok: false,
           msg: 'la base no se halla registrada ingrese otro numero de base'
       });       

     } 
        

      const id = existBase[0]._id; 
     
      const addDriver = await Base.findOneAndUpdate({_id: new ObjectId(id)}, {$addToSet: { idDriver: idDriver }},{ new: true });
        
      if(!addDriver){

        return res.status(400).json({
          ok: false,
          msg: 'No se ha podido registrar el conductor a la base elegida'
      });
      
    }  else {

      await Driver.findOneAndUpdate({_id: idDriver}, {$set: {base: new ObjectId(id)}}, {new: true});
      
      res.status(200).json({
          ok: true,
          addDriver
      });

    } 
      
    
     }
       

          



const addBaseAdmin = async(req = request, res = response) => {          
   
    const  idAdmin = req.params._id;
    const  { zona, base, ubicacion } = req.body;   
   
    

        const zonaAvailable = await Zona.find({ nombre: zona})      
        

        if (!zonaAvailable){
         return res.status(400).json({
            ok: false,
            msg: 'la zona no se halla registrada'
        });
      }  

      const admin = await Admin.find({ _id: idAdmin})
    
      if (!admin){
        return res.status(400).json({
           ok: false,
           msg: 'el admin no se halla registrado'
       });
     } 

     const existBase = await Base.findOne({ $and: [ {base: base}, {zonaName: zona} ] })         
     
     if (existBase){
        return res.status(400).json({
           ok: false,
           msg: 'la base fue registrada por otro usuario ingrese otro numero de base'
       });
     }  else {
       
        const input = {

            base:      Number(base),
            adminId:   new ObjectId(idAdmin),
            zonaName:      zonaAvailable[0].nombre,            
            ubicacion: {coordinates: ubicacion }

        }      
        
       
        const data = new Base(input);
        
        
        const result = await data.save();        
        

        res.status(200).json({ ok: true, result});


     } 
          
}

module.exports ={
    addBaseDriver,
    addBaseAdmin
}