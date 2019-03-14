var Estacion = require('./estacion.model');

exports.getEstaciones = (req, res) => {
    Estacion.find((err, estaciones) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(estaciones)
    })
}

exports.createEstacion = (req, res) => {
    var estacion = new Estacion(req.body);
    estacion.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Estacion creada",
            estacion: estacion
        })
    })
}

exports.deleteEstacion = (req, res) => {
    Estacion.findByIdAndDelete({ _id: req.params.id }, (err, estacion) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Estacion eliminada",
            estacion: estacion
        })
    })
}

exports.updateEstacion = (req, res) => {
    Estacion.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, estacion) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Estacion actualizada",
            estacion: estacion
        })
    })
}