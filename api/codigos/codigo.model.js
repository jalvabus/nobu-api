var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codigo_schema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    codigo: String,
    fecha: Date,
    entregado: Boolean
})

module.exports = mongoose.model('Codigo', codigo_schema);