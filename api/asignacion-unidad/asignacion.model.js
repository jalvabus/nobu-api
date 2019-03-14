var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asignacion_schema = new Schema({
    fecha: String,
    guardia: {
        type: Schema.Types.ObjectId,
        ref: 'Guardia'
    },
    datosVulcano: [{
        vulcano: {
            type: Schema.Types.ObjectId,
            ref: 'Vulcano'
        },
        unidad: {
            type: Schema.Types.ObjectId,
            ref: 'Unidad'
        }
    }]
});

module.exports = mongoose.model('AsignacionUnidad', asignacion_schema);