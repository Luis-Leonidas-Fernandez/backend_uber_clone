const { Schema, model } = require('mongoose');

const AddressSchema = Schema({

    miId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false,
    },

    idDriver: {
        type: Schema.Types.ObjectId, 
        ref: 'Driver',      
        required: false
        
    },    

    estado:{
        type: Boolean,
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
    mensaje: {
        coordinates: {
            type: Array,
            required: false            
          
    },    
        type: ['Point'], 
          required: false
    }, 
    
}, 

{
    timestamps: true
});

AddressSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();    
    return object;
})

module.exports = model('Address', AddressSchema);