var Aviso = require('./avisos.model');

exports.getAvisos = (req, res) => {
    Aviso.find((err, avisos) => {
        if (err) return res.status(500).json({
            mensaje: "Error",
            err: err
        })

        return res.status(200).json(avisos);
    })
        .populate({
            path: 'administrador',
            model: 'Vulcano'
        })
}

exports.createAviso = (req, res) => {

    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    console.log(req.body);

    var aviso = new Aviso(req.body);
    aviso.fecha = fechaHoy;

    aviso.save((err, aviso) => {
        if (err) return res.status(500).json({
            mensaje: "Error",
            err: err
        })

        return res.status(200).json(aviso);
    })
}

exports.getAvisosHoy = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Aviso.find({ fecha: fechaHoy }, (err, avisos) => {
        if (err) return res.status(500).json({
            mensaje: "Error",
            err: err
        })

        return res.status(200).json(avisos);
    })
        .populate({
            path: 'administrador',
            model: 'Vulcano'
        })
}

exports.updateAviso = (req, res) => {
    Aviso.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, avisos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Aviso actualizado",
            avisos: avisos
        })
    })
}

exports.deleteAviso = (req, res) => {
    Aviso.findByIdAndRemove({ _id: req.params.id }, (err, avisos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Aviso eliminado",
            avisos: avisos
        })
    })
}