const axios    = require('axios').default;
const { getActiveUsers } = require('../controllers/cupones');


 const cuponAxios = axios.create({
    baseURL: "https://www.inriservice.com/api/cupon",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
})

const deletedAxios = axios.create({
    baseURL: "https://www.inriservice.com/api/cupon/vauchers",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
})

   const deletedAllVacuhers= async() => {
          
    const result = (await deletedAxios.put().catch()).status;    
    return result;

   }
    
    const  createVauchers = async () => {
     
     const notExistUsers = {msg:  'No existen usuarios'}; 

     const usersDb = await getUsers();          
     const usuarios = usersDb[0];         

      if(usuarios[0].id !== null){               
        
        const requests = await consigVaucher(usuarios);// assing vaucher http.patch
        
        return requests;
        
    } else{
        return notExistUsers;
    }   
     
               
    }
    
    

    const getUsers= async () => {

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
    
    const consigVaucher = async (usuarios) =>{        
        
         
            const req = [];      
            req.length = 0;

            for (let i = 0; i < usuarios.length; i++) {

                const element = usuarios[i];
                const miId = element.id;                
                await axiosResp(miId);                              
                req.push(miId);
                              
                                
            }           
            
            return  req;
        
    }; 

     const axiosResp = async (miId) => {

        const id = miId.toString();
        const result = (await cuponAxios.patch(`/${id}`).catch()).status;        
        const response = result.data;        
        return response;
    } 

    
module.exports = {
    createVauchers,
    deletedAllVacuhers
  
    
    
}




