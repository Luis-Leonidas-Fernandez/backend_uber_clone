/*
    Path: /api/cupon
*/
const { Router } = require('express');
const {addVaucher, addPrice, deletedVauchers} = require('../controllers/cupones');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();

//ADD VAUCHER TO USERS
router.patch('/:_id', addVaucher);
router.patch('/price/:_id', addPrice);
router.patch('/vauchers/:_id', validarJWT, deletedVauchers);


module.exports = router;