var Asignacion = require('./asignacion.model');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getAsignaciones = (req, res) => {
    Asignacion.find((err, asignaciones) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(asignaciones)
    })
        .populate({
            path: 'unidad',
            model: 'Unidad'
        })
        .populate({
            path: 'datosVulcano.vulcano',
            model: 'Vulcano'
        })
}

exports.createAsignacion = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Asignacion.findOne({ "fecha": fechaHoy })
        .then((asignacionEncontrada) => {
            if (asignacionEncontrada) {
                Asignacion.findOne({ "fecha": fechaHoy, "datosVulcano.vulcano": req.body.vulcano })
                    .then((asignacionVulcanoEncontrada) => {
                        if (asignacionVulcanoEncontrada) {
                            asignacionVulcanoEncontrada.datosVulcano.forEach((vulcano, i) => {
                                if (String(vulcano.vulcano) === String(req.body.vulcano)) {
                                    asignacionVulcanoEncontrada.datosVulcano[i].unidad = req.body.unidad;
                                    asignacionVulcanoEncontrada.save();
                                }
                            })
                        } else {
                            asignacionEncontrada.datosVulcano.push({
                                vulcano: new ObjectId(req.body.vulcano),
                                unidad: new ObjectId(req.body.unidad)
                            })
                            asignacionEncontrada.save();
                        }
                    })
            } else {
                var asignacion = new Asignacion();
                asignacion.fecha = fechaHoy;
                asignacion.datosVulcano.push({
                    vulcano: new ObjectId(req.body.vulcano),
                    unidad: new ObjectId(req.body.unidad)
                })
                asignacion.guardia = req.body.guardia;
                asignacion.save();
            }
        })
}

exports.deleteIfExist = (req, res) => {

    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Asignacion.findOneAndUpdate(
        { "fecha": fechaHoy },
        { $pull: { datosVulcano: [{ vulcano: new ObjectId(req.body.vulcano) }] } },
        { multi: false },
        (err, asignacion) => {
            if (err) console.log(err);
            /*
            return res.status(500).json({
                messaje: "Erro",
                err: err
            })

            return res.status(200).json({
                messaje: "Vulcano eliminado"
            })
            */
        }
    )
}

exports.obtenerHoy = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Asignacion.findOne({ fecha: fechaHoy }).then((asignacion, err) => {
        if (asignacion) {
            res.status(200).json({
                mensaje: "Encontrada"
            })
        } else {
            res.status(200).json({
                mensaje: "No Encontrada"
            })
        }
    })

}

exports.updateAsigncaion = (req, res) => {
    Asignacion.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, asignacion) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Asignacion a unidad actualizada",
            asignacion: asignacion
        })
    })
}

exports.deleteAsigncaion = (req, res) => {
    Asignacion.findByIdAndRemove({ _id: req.params.id }, (err, asignacion) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Asignacion a unidad eliminada",
            asignacion: asignacion
        })
    })
}