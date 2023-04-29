/*
    path: api/ubicaciones

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarDistanciaEntreCoordendas} = require('../middlewares/validar-distancia');
const { postUbicacion, getUbicaciones, removeAddress }= require('../controllers/authCoordenadas');
const router = Router();

//USER ENTERS AN ORDER
router.post('/lugar', validarJWT, validarDistanciaEntreCoordendas, postUbicacion);
router.put('/remove/address', validarJWT, removeAddress);

//GET ALL THE ORDERS
router.get('/', validarJWT, getUbicaciones );

module.exports =router;