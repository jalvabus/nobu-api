var Comision = require('./comision.model');

exports.getComisiones = (req, res) => {
    Comision.find((err, comisiones) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(comisiones);
    })
}

exports.createComision = (req, res) => {
    var comision = new Comision(req.body);
    comision.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            comision: comision
        })
    })
}

exports.deleteComision = (req, res) => {
    var id = req.params.id;
    Comision.findByIdAndRemove({ _id: id }, (err, comision) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Comision Eliminada",
            comision: comision
        })
    })
}

exports.updateComision = (req, res) => {
    var id = req.params.id;
    Comision.findByIdAndUpdate({ _id: id }, { $set: req.body }, (err, comision) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Actividad Actualizada",
            comision: comision
        })
    })
}