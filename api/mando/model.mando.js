var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mando_schema = new Schema({
    mando: String
})

module.exports = mongoose.model('Mando', mando_schema);