const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const {dispatchDrivers}  = require('./service/dispatch_server');

const {getPrice}        = require('./Generators/price');
const { createVauchers}  = require('./service/cupon_server');
const { createPrice}    = require('./service/price_server');

const cron     = require("node-cron");


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
module.exports.io = require('socket.io')(server);

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
app.use('/api/location', require('./routes/locationDriver'));


// Mis Rutas Admin
app.use('/api/booking', require('./routes/booking'));
app.use('/api/travel', require('./routes/bookingDriver'));

// Obtener viajes desde distintos roles
app.use('/api/viajes', require('./routes/viajes'));

// Asignar vaucher
app.use('/api/cupon', require('./routes/cupon'));


server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);    

});

//servicio de despacho de ordenes

 cron.schedule("*/1 * * * *", function () {
    
    dispatchDrivers();              
    
}); 


cron.schedule("*/3 */23 * * *", function () {  
         
   //GUARDA EN STORAGE EL PRECIO DEL DOLAR BLUE
  
   getPrice();
   
});


//servicio de despacho de vauchers cada 24 hs horario: 00:00 /"0 0 * * *"

cron.schedule("*/30 */3 */23 * * *", function ()  { 
     
     //CREA UN VAUCHER RANDOM 01FG-25SD-3528-ADF25

   const time = new Date();   

   createVauchers();
    
});


cron.schedule("*/40 */3 */23 * * *", function () {    
     
    // GUARDA EN COLLECTION USUARIO EL PRECIO DEL VAUCHER

    const time = new Date();  

    createPrice();
  
   
});
