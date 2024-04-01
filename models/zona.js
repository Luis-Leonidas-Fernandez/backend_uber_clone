const { Schema, model } = require( 'mongoose');

const ZonaSchema = Schema({

    nombre: {
        type: String,
        required: true
    }, 


    basesId: {
        type: Schema.Types.ObjectId, 
        ref: 'Base',      
        required: false
        
    },  

    ubicacion: {         
        coordinates: {
            type: String,
            required: false
          
    },    
        type: ['Point'], 
          required: false
    },
    
   

   

});

ZonaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    //object.uid = _id;
    return object;
})



module.exports = model('Zona',
    ZonaSchema);