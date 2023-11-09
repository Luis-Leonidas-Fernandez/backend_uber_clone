const Address = require('../models/ubicacion');
const Driver = require( '../models/driver');


const driverConectado = async(uid = '') => {

    const driver = await Driver.findById(uid);
    driver.online = true;    
    driver.status = 'disponible';
    await driver.save();
    return driver;
}

const driverDesconectado = async(uid = '') => {
    const driver = await Driver.findById(uid);
    driver.online = false;
    driver.status = 'no disponible';
    await driver.save();
    return driver;
}

const grabarLocation = async(payload) => {
   

    try {

        const miId = req.uid;

        Address.findOneAndUpdate({idDriver: miId},{$set: { mensaje: payload }} );

        return true;
    } catch (error) {
        return false;
    }

}


module.exports = {
    driverConectado,
    driverDesconectado,
    grabarLocation,

}