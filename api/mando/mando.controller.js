var Mando = require('./model.mando');

exports.getMandos = (req, res) => {
    Mando.find((err, mandos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(mandos)
    })
}

exports.createMando = (req, res) => {
    var mando = new Mando(req.body);
    mando.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Mando creado",
            mando: mando
        })
    })
}

exports.deleteMando = (req, res) => {
    Mando.findByIdAndRemove({ _id: req.params.id }, { $set: req.body }, (err, mando) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Mando eliminado",
            mando: mando
        })
    })
}

exports.updateMando = (req, res) => {
    Mando.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, mando) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "mando actualizado",
            mando: mando
        })
    })
}