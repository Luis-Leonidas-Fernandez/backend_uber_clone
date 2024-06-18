const { Schema, model } = require( 'mongoose');

const InvoiceSchema = Schema({

    
    adminId: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin',      
        required: false        
    }, 
    viajes: {
        
        cantidad: {
            type: Number,
            required: false
        },
        precio: {
            type: Number,
            required: false
        }
    },

    descuento: {
        type: Number,
        required: false
    },   

    soporte: {
        type: Number,
        required: false
    },    
    
}, 

{
    timestamps: true   

});

InvoiceSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('Invoice',
    InvoiceSchema);