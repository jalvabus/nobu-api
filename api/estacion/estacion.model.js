var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estacion_schema = new Schema({
    estacion: String,
    direccion: String
})

module.exports = mongoose.model('Estacion', estacion_schema);