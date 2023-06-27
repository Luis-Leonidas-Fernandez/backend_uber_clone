const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');


// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

//Cors
app.use(cors());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST",  "PATCH","PUT"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true
});



/* require('socket.io')(server),{
    cors: {
        origin: ["https://inriservice.com:3001"],
        path: "/api/socket.io"
        //withCredentials: true para cookies
        //'*:*'
    }
}; */

/* const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8100",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true
}); */
//io.set("transports", ["websocket"]);
//io.set('origins', 'https://inriservice.com:80');
require('./sockets/socket.js');

//https://stackoverflow.com/questions/24058157/socket-io-node-js-cross-origin-request-blocked


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