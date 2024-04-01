const { response } = require( 'express');
const bcrypt = require( 'bcryptjs');

const Admin = require( '../models/admin');
const { generarJWT } = require( '../helpers/jwt');


const crearAdmin = async(req, res = response) => {


    //unica funcion modificada 16/05/2023    
    const { email, password, } = req.body;  

    const existeEmail = await Admin.findOne({ email });
    
    if (existeEmail) {


    return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
    });
    
    } else {

    const newAdmin = new Admin(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();

    newAdmin.password = bcrypt.hashSync(password, salt);
    await newAdmin.save();

    // Generar mi JWT
    const token = await generarJWT(newAdmin.id);        
           
    const admin = {
       
        nombre: newAdmin.nombre,
        email:  newAdmin.email,       
        uid:    newAdmin.id,
    }

    return res.json({
        ok: true,
        admin,            
        token,
        

    });

}

}
const loginAdmin = async(req, res = response) => {

const { email, password } = req.body;

try {

    const adminDB = await Admin.findOne({ email });

    if (!adminDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Email no encontrado'
        });
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, adminDB.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña no es valida'
        });
    }


    // Generar el JWT
    const token = await generarJWT(adminDB.id);
    
    const admin = {
        
        nombre: adminDB.nombre,
        email:  adminDB.email,   
        uid:    adminDB.id,          
        

    }
   

    res.json({
        ok: true,
        admin, 
        token,
        
    });


} catch (error) {
    
    return res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
}

}

const renewTokenAdmin = async(req, res = response) => {

const uid = req.uid;

// generar un nuevo JWT, generarJWT... uid...
const token = await generarJWT(uid);

// Obtener el usuario por el UID, Usuario.findById... 
const admin = await findById(uid);   


res.json({
    ok: true,
    admin,
    token,    
    
});

}


module.exports = {
    crearAdmin,
    loginAdmin,
    renewTokenAdmin
    
}
