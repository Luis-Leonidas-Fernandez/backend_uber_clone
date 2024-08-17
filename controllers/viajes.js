const { response } = require( 'express');
const Address = require('../models/ubicacion');
const ObjectId = require('mongodb').ObjectId;


const obtenerViajeUsuario = async(req, res= response) => {

    const _id = req.params._id;    

    const respuesta = await Address.aggregate([

        {
            $match : {$and: [{miId: new ObjectId(_id)}, {estado: false}] }
        },
        
        {
            $lookup:
            {
                from: "drivers",
                localField: "idDriver",//address
                foreignField: "_id",//drivers
                as: "driver"
            }
        },

        {
            $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$driver', 0]}, "$$ROOT"]}}
        },       
        
        {
            $project: { 
                _id: 1,
                nombre: 1,
                apellido: 1,
                vehiculo:1,
                modelo: 1,
                patente:1,
                order: 1,
                email: 1,
                online: 1,
                estado: 1,
                mensaje: "$mensaje",
                idDriver: 1,
                createdAt: 1,
                updatedAt: 1,

            }
        },
                   
       
]);

const resultado = Object.assign({}, ...respuesta);
const order = Object.keys(respuesta).length; 

const data = order ?? null;

if(order !== 0) {      
                    
    const coords = resultado.mensaje.coordinates;
    const points =  coords[coords.length -1];
    const types = resultado.mensaje.type;
    const ubicacion = { type: types, coordinates: points};

    
    const address = {
         ok: true,
        _id: resultado._id,
         email: resultado.email,
         nombre: resultado.nombre,
         apellido: resultado.apellido,
         vehiculo: resultado.vehiculo,
         modelo: resultado.modelo,
         patente: resultado.patente,
         online: resultado.online,
         order: resultado.order,
         estado: resultado.estado,
         createdAt: resultado.createdAt,
         updatedAt: resultado.updatedAt,
         mensaje: ubicacion,
         idDriver: resultado.idDriver

        };

    return res.status(200).json({ address});

}else {    
   
    const emptyObject = {
        idDriver: '0',
        ok: false,
        msg: 'Address no encontrada'
    }
    
    return res.status(201).json({ emptyObject});
}
   

}





module.exports = {
    obtenerViajeUsuario
}