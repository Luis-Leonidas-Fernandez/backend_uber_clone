/*
    path: api/status

*/
const { Router } = require('express');
const { validarJWTDRIVER } = require('../middlewares/validar-jwt-driver');
const { statusUpdate, finishTravel } = require('../controllers/estadoViajes');



const router = Router();

//update the driver's order field
router.put('/update',validarJWTDRIVER, statusUpdate );
//update to finish travel
router.put('/finish-travel',validarJWTDRIVER,  finishTravel);

module.exports = router;
