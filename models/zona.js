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
        type:{
            type: String,            
            enum: ['Point'], 
            required: true,
        },             
        coordinates: {
            type: String,
            required: false,
            index: '2dsphere'            
    },    
        
    },
    
   

   

});

ZonaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    //object.uid = _id;
    return object;
})



module.exports = model('Zona',
    ZonaSchema);