const axios    = require('axios').default;
const {LocalStorage} = require('node-localstorage');
const { getActiveUsers } = require('../controllers/cupones');


const db = new LocalStorage('./dolar');

const priceAxios = axios.create({
    baseURL: "https://www.inriservice.com/api/cupon/price",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
}) 


const createPrice = async () =>{
   
    
    // Obteniendo precio del vaucher
    const notExistUsers = {msg:  'No existen usuarios'};  
    const  priceDolar = db.getItem('costo_vaucher');   
   
    // Obteniendo ID USERS
    const usersDb = await getAllUsers();          
    const usuarios = usersDb[0];
    
    if(usuarios[0].id !== null){               
        
        const requests = await consigPrice(usuarios, priceDolar);// assing vaucher http.patch
        
        return requests;
        
    } else{
        return notExistUsers;
    }       
    

}

const getAllUsers= async () => {

    const arrayUsuarios = [];      

    const respuesta = await getActiveUsers();    

    arrayUsuarios.length= 0;

    const usuarios = respuesta;   
    
    if(usuarios) {
      
      
      arrayUsuarios.push(usuarios);      
           
     return arrayUsuarios;

    }else{       
                  
       return {msg: 'error con la function'};
    }

};

const consigPrice = async (usuarios, priceDolar) =>{        
        
         
    const req = [];      
    req.length = 0;

    for (let i = 0; i < usuarios.length; i++) {

        const element = usuarios[i];
        const miId = element.id;
        const priceDolarBlue = JSON.parse(priceDolar);        
       
        await axiosResp(miId, priceDolarBlue);                              
        req.push(miId);
                      
                        
    }           
    
    return  req;

}; 

const axiosResp = async (miId, priceDolarBlue) => {

const price = JSON.stringify( priceDolarBlue);
const id = miId.toString();

const result = await priceAxios.patch(`/${id}`, price);

const response = result.data; 
       
return response;
}  




module.exports = {
    createPrice
}