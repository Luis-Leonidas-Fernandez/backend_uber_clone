/*
    path: api/loginAdmin

*/
const { Router } = require( 'express');
const { check } = require( 'express-validator');

const { crearAdmin, loginAdmin, renewTokenAdmin } = require( '../controllers/authAdmin');
const { validarCampos } = require( '../middlewares/validar-campos');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();



router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], crearAdmin);



router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
], loginAdmin);

router.get('/renew', validarJWT, renewTokenAdmin);

module.exports = router;