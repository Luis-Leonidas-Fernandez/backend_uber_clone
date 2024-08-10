const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { driverConectado, driverDesconectado } = require('../controllers/socket');
const { grabarLocation } = require('../controllers/location');
// Mensajes de Sockets
io.on('connection', (client) => {

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    console.log('Driver Connectado');

    // Verificar autenticación
    if (!valido) { return client.disconnect(); }

    // Driver autenticado
    driverConectado(uid);

    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 5f298534ad4169714548b785
    client.join(uid);

    // Escuchar la ubicacion del driver
    
    client.on('driver-location', async(payload) => { 
        
        const location = [];

        location.push(payload);
        

        if(location ){
            await grabarLocation(location[0]);
        }else{
            false;
        }                        
               

    });
   


    client.on('disconnect', () => {       
        driverDesconectado(uid);
        console.log("driver desconectado");
    });
   
});
