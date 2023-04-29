/*
    Path: /api/viajes
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { obtenerViajeUsuario } = require('../controllers/viajes');
const router = Router();

//USER CHECK THE STATUS OF THEIR ORDER
router.get('/:_id', validarJWT, obtenerViajeUsuario);

module.exports = router;