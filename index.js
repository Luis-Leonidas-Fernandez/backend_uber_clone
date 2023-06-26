const express = require('express');
const path = require('path');
require('dotenv').config();


// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server), {
    cors:{
        origin: "http//localhost:3001"
    }
};
require('./sockets/socket.js');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



// Mis Rutas Usuarios
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/ubicaciones', require('./routes/ubicaciones'));

// Mis Rutas Drivers
app.use('/api/logindriver', require('./routes/authDriver'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/status', require('./routes/estadoViajes'));


// Mis Rutas Admin
app.use('/api/booking', require('./routes/booking'));
app.use('/api/travel', require('./routes/bookingDriver'));

// Obtener viajes desde distintos roles
app.use('/api/viajes', require('./routes/viajes'));






server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});