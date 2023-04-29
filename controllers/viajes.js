const Address = require('../models/ubicacion');
const ObjectId = require('mongodb').ObjectId;




const obtenerViajeUsuario = async(req, res) => {

    const _id = req.params._id;
    

    const orderUser = await Address.aggregate([

        {
            $match : {$and: [{miId: ObjectId(_id)}, {estado: false}] }},
        
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
          {$project: { 
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
                mensaje: "$mensaje.coordinates",
                idDriver: 1,
                createdAt: 1,
                updatedAt: 1,
               
                                    
                
                

            }},
                   
       
]);   
    console.log(orderUser); 
    res.json({ orderUser})

}





module.exports = {
    obtenerViajeUsuario
}