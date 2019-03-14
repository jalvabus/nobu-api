var Lista = require('./lista.model');

exports.getListas = (req, res) => {
    Lista.find((err, listas) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(listas)
    })
        .populate({
            path: 'datosVulcano.vulcano',
            model: 'Vulcano',
        })
        .populate({
            path: 'guardia',
            model: 'Guardia',
        })

}

exports.obtenerHoy = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Lista.find({ fecha: fechaHoy }).then((lista, err) => {
        console.log(lista);
        if (lista[0]) {
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

exports.paseLista = (req, res) => {
    console.log(req.body);

    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Lista.find({ "fecha": fechaHoy, "datosVulcano.vulcano": req.body.vulcano })
        .then((listaVulcano) => {
            if (listaVulcano[0]) {
                var lista = listaVulcano[0];
                lista.datosVulcano.forEach((vulcano, i) => {
                    console.log(vulcano);
                    if (String(vulcano.vulcano) === String(req.body.vulcano)) {
                        console.log("AQUI ESTA");
                        listaVulcano[0].datosVulcano[i].asistencia = req.body.asistencia;
                        listaVulcano[0].save();
                    }
                })
                res.status(200).json({ mensaje: "SI esta el Vulcano,actualizado status", lista: listaVulcano[0] });
            } else {
                new Promise((resolve, reject) => {
                    Lista.find({ fecha: fechaHoy }).then((lista, err) => {
                        console.log(lista);
                        if (lista[0]) {
                            console.log("Lista Encontrada")
                            resolve(lista[0]);
                        } else {
                            var lista = new Lista();
                            lista.fecha = fechaHoy;
                            lista.guardia = req.body.guardia;
                            console.log("Lista Registrada")
                            resolve(lista);
                        }
                    })
                }).then(lista => {
                    lista.datosVulcano.push({
                        vulcano: req.body.vulcano,
                        asistencia: req.body.asistencia
                    })
                    lista.save(err => {
                        if (err) return res.status(500).json({ error: err })
                    })
                    res.status(200).json(lista);
                })
            }
        })

}

exports.deleteIfExist = (req, res) => {

    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Lista.findOneAndUpdate(
        { "fecha": fechaHoy },
        { $pull: { 'datosVulcano.vulcano': { _id: new ObjectId(req.body.vulcano) } } },
        { safe: true },
        (err, asignacion) => {
            if (err) return res.status(500).json({
                messaje: "Erro",
                err: err
            })

            return res.status(200).json({
                messaje: "Vulcano eliminado"
            })
        }
    )
}

exports.validateVulcano = (req, res) => {
    var fechaActual = new Date();
    var fechaHoy = (fechaActual.getMonth() + 1) + '/' + fechaActual.getDate() + '/' + fechaActual.getFullYear();

    Lista.findOne({ fecha: fechaHoy, 'datosVulcano.vulcano': req.params.idVulcano })
    .then((vulcano) => {
        if (vulcano) {
            res.status(200).json({
                mensaje: "Encontrado",
                asistencia: true
            })
        } else {
            res.status(200).json({
                mensaje: "No encontrado",
                asistencia: false
            })
        }
    })
}

exports.deleteLista = (req, res) => {
    Lista.findByIdAndRemove({ _id: req.params.id }, err => {
        if (err) return res.status(500).json({ error: err })
        return res.status(200).json({
            mensaje: "Lista Eliminada"
        })
    })

}