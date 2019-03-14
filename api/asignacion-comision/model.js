var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asignacion_comision = new Schema({
    fecha: String,
    vulcano: [{
        type: Schema.Types.ObjectId,
        ref: 'Vulcano'
    }],
    comision: {
        type: Schema.Types.ObjectId,
        ref: 'Comision'
    }
})

module.exports = mongoose.model('AsignacionComision', asignacion_comision);