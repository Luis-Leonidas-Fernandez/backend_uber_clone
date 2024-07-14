const axios    = require('axios').default;
const { getUbicacionesAutomatic }= require('../controllers/authCoordenadas');


const mainAxios = axios.create({
    baseURL: "http://localhost:3000/api/booking",
    timeout: 5000
})

    
    
    const  dispatchDrivers = async () => {     
     

     const id = await getOrders();
     const notExistOrder = {msg:  'No existen ordenes para despachar'};      
     const idsOrders = id[0];     
       
     if(idsOrders[0].miId !== '1'){               
        
        const requests = await consigDriver(idsOrders);
        
        return requests;
        
    } else{
        return notExistOrder;
    }  
     
               
    }
    

    const getOrders= async () => {

        const arrayAddress = [];      

        const respuesta = await getUbicacionesAutomatic();        

        const orders = respuesta;     
        
        if(orders) {
          
          
          arrayAddress.push(orders);      
               
         return arrayAddress;

        }else{       
                      
           return {msg: 'error con la funcion'};
        }

    };
    
    const consigDriver = async (idsOrders) =>{ 
        
        
         
            const req = [];      
            req.length = 0;
            for (let i = 0; i < idsOrders.length; i++) {

                const element = idsOrders[i];
                const miId = element.miId;
                const ubicacion = element.ubicacion.coordinates;   
                
                const rec = await axiosResp(miId, ubicacion);
                req.push(element);               
                                
            }           
       
            return  req;
        
    };

    const axiosResp = async (miId, ubicacion) => {
        
       
        
        const id = miId.toString();
        const res = await mainAxios.patch(`/${id}`, ubicacion);
        const result = res.data;
        return result;
    }

    
module.exports = {
    dispatchDrivers,
    consigDriver,
    getOrders
}



  
















