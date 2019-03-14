var Codigo = require('./codigo.model');

exports.getCodigos = (req, res) => {
    Codigo.find()
        .exec()
        .then((codigos) => {
            res.status(200).json({
                codigos: codigos
            })
        })
}