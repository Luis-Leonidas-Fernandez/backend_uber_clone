/*
    path: api/location

*/
const { Router } = require('express');
const { validarJWTDRIVER } = require('../middlewares/validar-jwt-driver');
const { locationDriverUpdate } = require('../controllers/estadoViajes');



const router = Router();


//update driver position real time
router.put('/driver-position',validarJWTDRIVER, locationDriverUpdate);
module.exports = router;