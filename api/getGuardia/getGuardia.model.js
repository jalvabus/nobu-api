var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var guardia_Schema = new Schema({
    guardia: {
        type: Schema.Types.ObjectId,
        ref: 'Guardia'
    },
    fecha: String
});

module.exports = mongoose.model('InicioGuardia', guardia_Schema);