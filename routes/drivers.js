/*
    path: api/drivers

*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { selectDriver } = require('../controllers/drivers');
const { obtenerViajeDriver } = require('../controllers/viajeDriver');
const router = Router();

//ALL DRIVERS AVAILABLE
router.get('/', validarJWT, selectDriver, );

//DRIVER RECEIVES AN INCOMING ORDER
router.get('/:_id', validarJWT, obtenerViajeDriver );
module.exports = router;
