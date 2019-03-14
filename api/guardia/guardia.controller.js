var Guardia = require('./guardia.model');

exports.getGuardias = (req, res) => {
    Guardia.find((err, guardias) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(guardias)
    })
}

exports.createGuardia = (req, res) => {
    var guardia = new Guardia(req.body);
    guardia.save((err, guardia) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Guardia creada",
            guardia: guardia
        })
    })
}

exports.updateGuardia = (req, res) => {
    Guardia.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, guardia) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Guardia actualizada",
            guardia: guardia
        })
    })
}

exports.deleteGuardia = (req, res) => {
    Guardia.findByIdAndRemove({ _id: req.params.id }, (err, guardia) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Guardia eliminada",
            guardia: guardia
        })
    })
}