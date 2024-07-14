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
        type:{
            type: String,            
            enum: ['Point'], 
            required: true,
        },          
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'          
    },  
        
   },

    mensaje: {

        type:{
            type: String,            
            enum: ['Point'], 
            default: 'Point',
            
        },  
        coordinates: {
            type: Array,
            required: false   
    },    
       
   }, 
    
}, 

{
    timestamps: true
});

AddressSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();    
    return object;
})

module.exports = model('Address', AddressSchema);