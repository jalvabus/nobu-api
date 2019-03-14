var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grado_schema = new Schema({
    grado: String
})

module.exports = mongoose.model('Grado', grado_schema);