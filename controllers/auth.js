const { response } = require( 'express');
const bcrypt = require( 'bcryptjs');

const Usuario = require( '../models/usuario');
const { generarJWT } = require( '../helpers/jwt');
const { urlMapboxKey, tokenMapBoxKey, idMapBoxKey, mapTokenKey} = require( '../tokens/token.js');


const crearUsuario = async(req, res = response) => {


        //unica funcion modificada 16/05/2023    
        const { email, password, } = req.body;    

        const existeEmail = await Usuario.findOne({ email });
        
        if (existeEmail) {


        return res.status(400).json({
            ok: false,
            msg: 'El correo ya está registrado'
        });
        
        } else {

        const newusuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newusuario.password = bcrypt.hashSync(password, salt);
        await newusuario.save();
        // Generar mi JWT
        const token = await generarJWT(newusuario.id);        
               
        const usuario = {
            role : newusuario.role,
            nombre: newusuario.nombre,
            email: newusuario.email,
            online: newusuario.online,
            uid: newusuario.id,
            urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey


        }

        return res.json({
            ok: true,
            usuario,            
            token,
            

        });

    }
    
}
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);
        
        const usuario = {
            role : usuarioDB.role,
            nombre: usuarioDB.nombre,
            email: usuarioDB.email,
            online: usuarioDB.online,
            uid: usuarioDB.id,
            urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey


        }
       

        res.json({
            ok: true,
            usuario, 
            token,
            
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT(uid);

    // Obtener el usuario por el UID, Usuario.findById... 
    const usuario = await findById(uid);   
    

    res.json({
        ok: true,
        usuario,
        token,
        urlMapbox:   urlMapboxKey,
        tokenMapBox: tokenMapBoxKey,
        idMapBox:    idMapBoxKey,
        mapToken:    mapTokenKey

    });

}


module.exports = {
    crearUsuario,
    login,
    renewToken
    
}