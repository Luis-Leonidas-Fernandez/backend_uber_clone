const  mongoose = require('mongoose');
const url = "mongodb://134.122.112.7/test";

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect( url,             
        );

        console.log('DB Online');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}

module.exports = {
    dbConnection
}