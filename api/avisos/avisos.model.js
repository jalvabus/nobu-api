var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var avisos_schema = new Schema({
    fecha: String,
    aviso: String,
    administrador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('Aviso', avisos_schema);