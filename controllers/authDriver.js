const { response } = require('express');
const bcrypt = require('bcryptjs');

const Driver=  require('../models/driver');
const {generarJWT} = require('../helpers/jwt');
const {urlMapboxKey, tokenMapBoxKey, idMapBoxKey, mapTokenKey} = require('../tokens/token.js');


const crearDriver = async(req, res = response) => {

const {         
         email,
         password,
         nombre,
         apellido,
         nacimiento,
         domicilio,
         vehiculo,
         modelo,
         patente,
         licencia   
} = req.body;

    try {

        const existeDriver = await Driver.findOne({ email, nacimiento:nacimiento, patente: patente });
        if (existeDriver) {
            return res.status(400).json({
                ok: false,
                msg: 'El conductor ya está registrado'
            });
        }

        //construir objeto
const data = {
        email,
        password,
        nombre,
        apellido,
        nacimiento: req.body.nacimiento,
        domicilio,
        vehiculo,
        modelo: req.body.modelo.toString(),
        patente: req.body.patente.toString(),
        licencia: req.body.licencia.toString(),


        }

        const driver = new Driver(data);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        driver.password = bcrypt.hashSync(password, salt);

        await driver.save();

        // Generar mi JWT
        const token = await generarJWT(driver.id);

        res.json({
            ok: true,
            driver,
            urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const loginDriver = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {

        const driverDB = await Driver.findOne({ email });
        
        if (!driverDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, driverDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generarJWT(driverDB.id);



        res.json({
            ok: true,
            driver: driverDB,
            urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const renewTokenDriver = async(req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generarJWT(uid);

    // Obtener el usuario por el UID, Usuario.findById... 
    const driver = await Driver.findById(uid);

    res.json({
        ok: true,
        driver,
        urlMapbox:   urlMapboxKey,
            tokenMapBox: tokenMapBoxKey,
            idMapBox:    idMapBoxKey,
            mapToken:    mapTokenKey,
        token,

    });

}


module.exports ={
    crearDriver,
    loginDriver,
    renewTokenDriver
    
}