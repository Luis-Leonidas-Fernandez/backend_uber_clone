const { Schema, model } = require('mongoose');

const DriverSchema = Schema({

    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nacimiento: {
        type: String,
        required: true
    },    
    domicilio: {
        type: String,
        required: true
    },
    vehiculo: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    patente: {
        type: String,
        required: true
    },
    licencia: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'driver','admin'],
        default: 'user'
    },   

    order: {    
        type: String,
        enum: ['en-preparacion', 'libre', 'en-camino' ],
        default: 'en-preparacion'
    },
    

    viajes: {
        type: Number,
        default: 0,
        required: false
    },
    urlMapbox: {
        type: String,
        required: false
    },
    tokenMapBox: {
        type: String,
        required: false
    },
    idMapBox: {
        type: String,
        required: false
    },
    mapToken: {
        type: String,
        required: false
    },
   
    
    idAddress: [{
        type: Schema.Types.ObjectId, 
        ref: 'Address',      
        required: false,
    }],

       time : { type : Date, default: Date.now }
});

DriverSchema.method('toJSON', function() {
    const { __v, password, ...object } = this.toObject();
    //object.uuid = _id;
    return object;
})


module.exports = model('Driver',
    DriverSchema);