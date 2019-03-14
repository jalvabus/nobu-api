var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lista_schema = new Schema({
    /*
    estacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Estacion'
    }],
    guardia: [{
        type: Schema.Types.ObjectId,
        ref: 'Gurdia'
    }],
    */
    fecha: String,
    datosVulcano: [{
        vulcano: {
            type: Schema.Types.ObjectId,
            ref: 'Vulcano'
        },
        asistencia: Boolean,
        actividad: {
            type: Schema.Types.ObjectId,
            ref: 'Actividad'
        }
    }],
    guardia: {
        type: Schema.Types.ObjectId,
        ref: 'Guardia'
    }
})

module.exports = mongoose.model('Lista', lista_schema);