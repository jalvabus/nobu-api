var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guardia_Schema = new Schema({
    guardia: String
});

module.exports = mongoose.model('Guardia', guardia_Schema);