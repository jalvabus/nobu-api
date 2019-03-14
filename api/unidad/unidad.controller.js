var Unidad = require('./unidad.model');

exports.getUnidades = (req, res) => {
    Unidad.find((err, unidades) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(unidades)
    })
        .populate({
            path: 'estacion',
            model: 'Estacion'
        })
        .populate({
            path: 'guardia',
            model: 'Guardia'
        })
}

exports.getUnidadesByguardia = (req, res) => {
    Unidad.find({ guardia: req.params.guardia }, (err, unidades) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(unidades)
    })
        .populate({
            path: 'estacion',
            model: 'Estacion'
        })
        .populate({
            path: 'guardia',
            model: 'Guardia'
        })
}

exports.createUniad = (req, res) => {
    var unidad = new Unidad(req.body);

    unidad.save(err => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Unidad Creada",
            unidad: unidad
        })
    })
}

exports.updateUnidad = (req, res) => {
    Unidad.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, unidad) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Unidad Actualizada",
            unidad: unidad
        })
    })
}

exports.deleteUnidad = (req, res) => {
    Unidad.findByIdAndRemove({ _id: req.params.id }, (err, unidad) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Unidad Eliminada",
            unidad: unidad
        })
    })
}