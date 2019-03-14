var Grado = require('./grado.model');

exports.getGrados = (req, res) => {
    Grado.find((err, grados) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(grados)
    })
}

exports.createGrado = (req, res) => {
    var grado = new Grado(req.body);
    grado.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Grado Creado",
            grado: grado
        })
    })
}

exports.updateGrado = (req, res) => {
    console.log(req.body);
    Grado.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, grado) => {
        if (err) console.log(err);
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Grado actualizado",
            grado: grado
        })
    })
}

exports.deleteGrado = (req, res) => {
    Grado.findByIdAndRemove({ _id: req.params.id }, (err, grado) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Grado eliminado",
            grado: grado
        })
    })
}