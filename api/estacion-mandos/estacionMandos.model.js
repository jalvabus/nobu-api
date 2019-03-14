var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estacionMandos_schema = new Schema({
    estacion: {
        type: Schema.Types.ObjectId,
        ref: 'Estacion'
    },
    vulcano: {
        type: Schema.Types.ObjectId,
        ref: 'Vulcano'
    },
    mando: {
        type: Schema.Types.ObjectId,
        ref: 'Mando'
    }
})

module.exports = mongoose.model('EstacionMandos', estacionMandos_schema);