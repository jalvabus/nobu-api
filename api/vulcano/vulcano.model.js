var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vulcano_schema = new Schema({
    clave: String,
    numero_empleado: String,
    usuario: String,
    password: String,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    estado: String,
    estacion: {
        type: Schema.Types.ObjectId,
        ref: 'Estacion'
    },
    guardia: {
        type: Schema.Types.ObjectId,
        ref: 'Guardia'
    },
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado'
    },
    rol: String
});

module.exports = mongoose.model('Vulcano', vulcano_schema);