const { Schema, model } = require( 'mongoose');

const BaseSchema = Schema({

    base: {
        type: Number,
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
            required: true,
            index: '2dsphere'           
    },
         
        
    },
    

    adminId: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin',      
        required: false
        
    },

    zonaName: {
        type: String,           
        required: false
        
    },
    
    idDriver: [{
        type: Schema.Types.ObjectId, 
        ref: 'Driver',      
        required: false,
        default: ""
        
    }],       
    
    
    viajes: {
        type: Number,
        required: false,
        default: 0
    },  
}, 

{
    timestamps: true  

   

});

BaseSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    //object.uid = _id;
    return object;
})



module.exports = model('Base',
    BaseSchema);