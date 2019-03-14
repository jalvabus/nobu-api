var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comision_schema = new Schema ({
    comision: String
})

module.exports = mongoose.model('Comision', comision_schema);