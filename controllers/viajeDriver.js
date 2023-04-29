const Address = require('../models/ubicacion');
const ObjectId = require('mongodb').ObjectId;

const obtenerViajeDriver = async ( req, res = response ) => {

   const _id = req.params._id;
  
 
   const address = await Address.aggregate([

            {
                $match : {$and: [{idDriver: ObjectId(_id)}, {estado: false}] }},
            
            {
                $lookup:
                {
                    from: "usuarios",
                    localField: "miId",//address
                    foreignField: "_id",//usuario
                    as: "user"
                }
            },
             {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$user', 0]}, "$$ROOT"]}}
            },       
              {$project: { 
                    _id: 1,
                    nombre: 1,
                    email: 1,
                    online: 1,
                    estado: 1,
                    ubicacion: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    idDriver: 1,
                                        
                    
                    

                }},
                       
           
]);   
        console.log(address); 
        res.json({ address})

}

module.exports ={
    obtenerViajeDriver
   
}

