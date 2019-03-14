var EstacionMandos = require('./estacionMandos.model');

exports.getMandos = (req, res) => {
    EstacionMandos.find((err, mandos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mandos: mandos
        })
    })
        .populate({
            path: 'estacion',
            model: 'Estacion'
        })
        .populate({
            path: 'vulcano',
            model: 'Vulcano'
        })
        .populate({
            path: 'mando',
            model: 'Mando'
        })
}

exports.createMando = (req, res) => {
    var mando = new EstacionMandos(req.body);

    mando.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Mando registradro correctamente",
            mando: mando
        })
    })
}

exports.deleteMando = (req, res) => {
    EstacionMandos.findByIdAndDelete({ _id: req.params.id }, (err, mando) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Mando eliminado correctamente",
            mando: mando
        })
    })
}

exports.updateMAndo = (req, res) => {
    EstacionMandos.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, mando) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Mando actualizado correctamente",
            mando: mando
        })
    })
}