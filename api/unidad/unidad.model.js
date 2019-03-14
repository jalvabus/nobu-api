var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unidad_schema = new Schema({
    numero_economico: String,
    placa: String,
    estacion: { type: Schema.Types.ObjectId, ref: 'Estacion' },
    guardia: { type: Schema.Types.ObjectId, ref: 'Guardia' }
})

module.exports = mongoose.model('Unidad', unidad_schema);