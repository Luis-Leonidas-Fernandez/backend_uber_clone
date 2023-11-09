//const { response } = require('express');

const validarDistanciaEntreCoordendas = (ubicacion) => {

    const latUser = ubicacion[0];
    const longUser= ubicacion[1];

    const remiseriaLocation = { latitude: -27.450263,   longitude: -58.976485 };
    const userLocation      = { latitude: latUser, longitude: longUser};

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
    const distanciaPermitida = 2000;
   
    try {

        if ( distanciaUsuario > distanciaPermitida) {
            return 0;            
            
        }else{

            if ( distanciaResultado <= distanciaPermitida) {

                return 1;
    
            }   
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

