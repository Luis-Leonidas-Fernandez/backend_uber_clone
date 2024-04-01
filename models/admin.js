const { Schema, model } = require( 'mongoose');

const AdminSchema = Schema({

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
    
    role: {
        type: {type: String, enum: ['user', 'driver','admin'], default: 'admin'}
         
       },

   

});

AdminSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Admin',
    AdminSchema);