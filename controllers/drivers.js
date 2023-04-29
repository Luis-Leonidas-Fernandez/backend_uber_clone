const { response } = require('express');
const Driver = require('../models/driver');

const selectDriver = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const drivers = await Driver.find({ $and: [{ _id: { $ne: req.uid }}, {online: true},{order: 'libre'}]})
        .sort({online: 'desc', order: -1, viajes: 1})
        .skip(desde)
        .limit(20)

    
    res.json({
        drivers
    })
}



module.exports ={
    selectDriver
}