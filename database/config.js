const  mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect( process.env.DB_URL,             
        );

       
        

    } catch (error) {       
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}

module.exports = {
    dbConnection
}