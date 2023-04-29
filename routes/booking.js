/*
    path: api/booking

*/
const { Router } = require('express');
const { validarJWTDRIVER } = require('../middlewares/validar-jwt-driver');
const { assigDriver, removeDriver } = require('../controllers/assigDriver');

const router = Router();

router.patch('/', validarJWTDRIVER, assigDriver );
router.put('/remove', removeDriver );


module.exports = router;
