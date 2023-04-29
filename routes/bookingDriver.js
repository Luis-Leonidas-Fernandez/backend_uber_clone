/*
    path: api/travel

*/
const { Router } = require('express');
//const { validarJWT } = require('../middlewares/validar-jwt');
const { assigClient, removeClient } = require('../controllers/assigTravel');

const router = Router();


router.patch('/:_id', assigClient );
router.put('/:_id', removeClient );

module.exports = router;
