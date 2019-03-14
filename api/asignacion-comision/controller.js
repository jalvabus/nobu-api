var Asignacion = require('./model');
var multiparty = require('multiparty');


exports.verAsignaciones = (req, res) => {
    Asignacion.find((asingaciones, err) => {
        if (err) return res.status(500).json({
            mensaje: 'error',
            error: err
        })

        return res.status(200).json(asingaciones);
    })
}

exports.createAsignacion = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        res.status(200).json({ fields: fields, files: files })
    });

}

exports.getAsignacionHoy = (req, res) => {
    
}