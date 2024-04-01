/*
    path: api/base

*/
const { Router } = require( 'express');
const { check } = require( 'express-validator');

const { addBaseAdmin, addBaseDriver } = require( '../controllers/addBase');
const { validarCampos } = require( '../middlewares/validar-campos');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();


//create base from admin
router.post('/new/:_id', [
    check('zona', 'La zona es obligatoria').not().isEmpty(),
    check('base', 'La base es obligatoria').not().isEmpty(),
    check('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
    validarCampos, validarJWT
], addBaseAdmin);

//add driver to base
router.put('/add-driver-to-base/:_id', [       
    check('zona', 'La zona es obligatoria').not().isEmpty(),
    check('base', 'La base es obligatoria').not().isEmpty(),
    validarCampos, validarJWT
], addBaseDriver);



module.exports = router;