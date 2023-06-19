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

        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        // Generar mi JWT
        const token = await generarJWT(usuario.id);        
        

        return res.json({
            ok: true,
            usuario,
            token,
            urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey

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
        
       

        res.json({
            ok: true,
            usuario: usuarioDB, 
            token,
            urlMapbox:   "https://api.mapbox.com/styles/v1/luisleonidas/clawgaqa5000f17n1ck3nlma9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVpc2xlb25pZGFzIiwiYSI6ImNrbnhhcWFiazBpNGoycG40YzVmbng1dW8ifQ.H3n7NYagN5ZjNWTPZxJVAw",
            tokenMapBox: "pk.eyJ1IjoibHVpc2xlb25pZGFzIiwiYSI6ImNrbnhhcWFiazBpNGoycG40YzVmbng1dW8ifQ.H3n7NYagN5ZjNWTPZxJVAw",
            idMapBox:    "sk.eyJ1IjoibHVpc2xlb25pZGFzIiwiYSI6ImNsZHozNmNpdTBpMmgzbnBvbXpwazZqejQifQ.BmLWsc31KgWMRxGg6HQH3w",
            mapToken:    "mapbox.mapbox-streets-v8"
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