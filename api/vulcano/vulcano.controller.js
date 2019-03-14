var Vulcano = require('./vulcano.model');
var bcrypt = require('bcryptjs');

var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);

var jwt = require('jsonwebtoken')
const secret = 'nobu2018'

exports.readVulcanos = (req, res) => {
    Vulcano.find((err, vulcanos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(vulcanos)
    })
        .populate({ path: 'estacion', model: 'Estacion' })
        .populate({ path: 'guardia', model: 'Guardia' })
        .populate({ path: 'grado', model: 'Grado' })
}

exports.readVulcanosByGuardia = (req, res) => {
    Vulcano.find({ guardia: req.params.guardia }, (err, vulcanos) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json(vulcanos)
    })
        .populate({ path: 'estacion', model: 'Estacion' })
        .populate({ path: 'guardia', model: 'Guardia' })
        .populate({ path: 'grado', model: 'Grado' })
}

exports.createVulcano = (req, res) => {
    var vulcano = new Vulcano(req.body);
    vulcano.estado = "Activo";
    vulcano.rol = "vulcano";

    bcrypt.genSalt(10)
        .then((salt) => {
            return bcrypt.hashSync("nobu2018$$", salt)
        }).then((password) => {
            vulcano.password = password;
            vulcano.save(err => {
                if (err) return res.status(500).json({
                    error: err
                })

                return res.status(200).json({
                    mensaje: "Vulcano Registrado",
                    vulcano: vulcano
                })
            });
        })
}

exports.deleteVulcano = (req, res) => {
    Vulcano.findByIdAndRemove({ _id: req.params.id }, { $set: req.body }, (err, vulcano) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Vulcano eliminado",
            vulcano: vulcano
        })
    })
}

exports.updateVulcano = (req, res) => {
    Vulcano.findById(req.params.id, (err, vulcano) => {
        if (err) return res.status(500).json({
            error: err
        })

        vulcano.clave = req.body.clave;
        vulcano.numero_empleado = req.body.numero_empleado;
        vulcano.usuario = req.body.usuario;
        vulcano.nombre = req.body.nombre;
        vulcano.apellido_paterno = req.body.apellido_paterno;
        vulcano.apellido_materno = req.body.apellido_materno;
        vulcano.estado = req.body.estado;
        vulcano.estacion = req.body.estacion;
        vulcano.guardia = req.body.guardia;
        vulcano.grado = req.body.grado;

        bcrypt.genSaltAsync(10)
            .then((salt) => {
                return bcrypt.hashAsync(req.body.password, salt);
            }).then(function (password) {
                vulcano.password = password
                return vulcano.save()
            })
            .then((vulcano) => {
                res.status(500).json({
                    mensaje: 'Vulcano actualizado con éxito',
                    vulcano: vulcano
                })
            })
    })
}

exports.fetchVulcano = (req, res) => {
    jwt.verify(req.body.token, secret, function (err, decoded) {
        if (err) return res.json(err);

        Vulcano.findById(decoded, (err, usuario) => {
            if (err) return res.status(500).json({
                error: err
            })
            return res.status(200).json(usuario)
        })
            .populate({ path: 'estacion', model: 'Estacion' })
            .populate({ path: 'guardia', model: 'Guardia' })
            .populate({ path: 'grado', model: 'Grado' })

            /*
        Vulcano.findById(decoded)
            .then(usuario => usuario ? res.json(usuario) : res.json(false))
            .catch(err => res.json(err))
            */
    });
}