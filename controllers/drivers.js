const { response } = require('express');
const Driver = require('../models/driver');

const selectDriver = async ( req, res = response ) => {

   
    const idDriverNull = [{idDriver: '1' }];

    const drivers = await Driver.find({ $and: [{ _id: { $ne: req.uid }}, {online: true},{order: 'libre'}]})
        .sort({online: 'desc', order: -1, viajes: 1})
        .limit(20)        
       
        const len = drivers.length;    
        

        if(len === 0){
            return res.json({idDriverNull});
        }
       
        return res.json({drivers});        
        
}



module.exports ={
    selectDriver
}