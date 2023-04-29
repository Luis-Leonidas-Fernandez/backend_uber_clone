const { response } = require('express');

const validarDistanciaEntreCoordendas = (req, res = response, next) => {

    const {ubicacion } = req.body;

    const remiseriaLocation = { latitude: -27.450263,   longitude: -58.976485 };
    const userLocation      = { latitude: ubicacion[0], longitude: ubicacion[1]};

    // Convertir todas las coordenadas a radianes
    lat1 = gradosARadianes(remiseriaLocation.latitude);    
    lon1 = gradosARadianes(remiseriaLocation.longitude);   
    lat2 = gradosARadianes(userLocation.latitude);   
    lon2 = gradosARadianes(userLocation.longitude);
   

    // Aplicar fórmula para convertir de metros a kilometros
    const RADIO_TIERRA_EN_KILOMETROS = 6371;
    let diferenciaEntreLongitudes = (lon2 - lon1);
    let diferenciaEntreLatitudes = (lat2 - lat1);
    let a = Math.pow(Math.sin(diferenciaEntreLatitudes / 2.0), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diferenciaEntreLongitudes / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanciaResultado = RADIO_TIERRA_EN_KILOMETROS * c;
    let distanciaUsuario = Math.round(distanciaResultado * 1000);
   
    console.log(distanciaUsuario, 'resultado en metros' );
    
    const distanciaPermitida = Number(2000);
   
    try {

        if ( distanciaUsuario > distanciaPermitida) {
            return res.status(401).json({
                ok: false,
                msg: 'Usted se encuentra fuera del area de covertura'
            });
        }
        
        if ( distanciaResultado <= distanciaPermitida) {

            next();

        }   

       

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en calcular distancia entre dos coordenadas'
        })
    }


};

const gradosARadianes = (grados) => {
    return grados * Math.PI / 180;
};

module.exports = {
    validarDistanciaEntreCoordendas
}

