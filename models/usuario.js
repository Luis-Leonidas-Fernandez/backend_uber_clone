const { Schema, model } = require( 'mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    role: {
        type: {type: String, enum: ['user', 'driver','admin'], default: 'user'}
         
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
    cupon:{
        type: Array,
        required: false,
        default: []
    }


});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Usuario',
    UsuarioSchema);