var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificacion_schema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    vulcano: {
        type: Schema.Types.ObjectId,
        ref: 'Vulcano'
    },
    fecha: Date,
    ubicacion: {
        longitud: String,
        latitud: String
    },  
    visto: Boolean
});

module.exports = mongoose.model('Notificacion', notificacion_schema);