const  jwt = require('jsonwebtoken');

const validarJWTDRIVER = ( req, res, next ) => {

    // Leer token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { id } = jwt.verify( token, process.env.JWT_KEY);
        req.id = id;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }




}


module.exports ={
    validarJWTDRIVER
}


