var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    email: String,
    password: String,
    codigo: {
        type: Schema.Types.ObjectId,
        ref: 'Codigo'
    },
    validado: Boolean
});

var Usuario = mongoose.model('Usuario', usuario_schema);
module.exports = Usuario;