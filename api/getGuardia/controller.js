var GuardiaAsign = require('./getGuardia.model');
var Guardia = require('../guardia/guardia.model');
var moment = require('moment')

exports.getGuardiaHoy = (req, res) => {

    new Promise((resolve, reject) => {
        GuardiaAsign.find((err, guardia) => {
            resolve(guardia[0]);
        })
    }).then((guardiaObtendia) => {
        var fechaInicioGuardia = new Date(guardiaObtendia.fecha);
        var fechaActual = new Date(req.params.fecha);

        var fecha1 = moment(fechaInicioGuardia);
        var fecha2 = moment(fechaActual);

        var diasDiff = fecha2.diff(fecha1, 'days') + 1;

        return (diasDiff);
    }).then((diasDiferencia) => {
        var totalGuardias = 0;
        var guardiasArray = [];
        Guardia.find((err, guardias) => {
            totalGuardias = guardias.length;
            guardiasArray = guardias;

            var coc = (diasDiferencia / totalGuardias) >> 0;
            var residuo = (diasDiferencia % totalGuardias);

            console.log("Dias diff: " + diasDiferencia);
            console.log("Total guardias: " + totalGuardias);
            console.log("Cociente: " + coc);
            console.log("Residuo: " + residuo);

            if (diasDiferencia >= totalGuardias) {
                var posicion = 0;
                if (residuo === 0) {
                    posicion = 0;
                } else if (residuo < (diasDiferencia / totalGuardias)) {
                    posicion = 1;
                } else if (residuo > (diasDiferencia / totalGuardias)) {
                    posicion = 2;
                }

                res.json(guardias[posicion])
            } else {
                res.json(guardias[diasDiferencia])
            }
        })

    })
}

exports.asignarGuardiaHoy = (req, res) => {
    Guardia.findOne({ guardia: 'Roja' }, (err, guardiaObtendia) => {
        if (err) return res.status(500).json({ eror: err, code: 'No existe la guardia' })

        var guardiaAsign = new GuardiaAsign();
        guardiaAsign.guardia = guardiaObtendia._id;
        guardiaAsign.fecha = new Date();
        guardiaAsign.save();
        return res.status(200).json({
            mensaje: "Guardia asignada",
            guardia: guardiaAsign
        })
    })

}