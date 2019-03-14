var Usuario = require('./usuario.model');
var bcrypt = require('bcryptjs');
var Codigo = require('../codigos/codigo.model');
var jwt = require('jsonwebtoken');
var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);

var nodemailer = require('nodemailer');
const secret = 'nobu2018'

exports.createUsuario = (req, res) => {
    console.log(req.body);
    var usuario = new Usuario(req.body);

    new Promise((resolve, reject) => {
        bcrypt.genSalt(10)
            .then((salt) => {
                return bcrypt.hashSync(req.body.password, salt)
            }).then((password) => {
                usuario.password = password;
                usuario.save(err => {
                    if (err) return res.status(500).json({
                        error: err
                    })
                    resolve(usuario);
                });
            })
    }).then(usuario => {
        Codigo.find((err, codigos) => {
            var cod =  codigos[codigos.length - 1];
            var code = Number(cod.codigo);
            console.log(code);
            var codigo = new Codigo();
            codigo.codigo = code + 5;
            codigo.fecha = new Date();
            codigo.usuario = usuario._id;
            codigo.entregado = false;

            codigo.save(err => {

                if (!sendEmail(usuario.email, codigo.codigo)) return res.status(500).json({
                    error: "Error al enviar el correo"
                })

                if (err) return res.status(500).json({
                    error: err
                })

                Usuario.findById({ _id: usuario._id }).then((usuarioCodigo) => {
                    usuarioCodigo.codigo = codigo._id;
                    usuarioCodigo.save(err => {
                        return (codigo);
                    })
                })
            })
        })


    }).then(registro => {
        return res.status(200).json({
            mensaje: "Usuario Registrado",
            usuario: usuario
        })
    })

}

function sendEmail(usuario, codigo) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'juanalva432@gmail.com',
            pass: 'apocalypse00'
        }
    });

    const mailOptions = {
        from: 'juanalva432@gmail.com', // sender address
        to: usuario, // list of receivers
        subject: 'Codigo de Verificacion | NOBU', // Subject line
        html: '<p>Tu codigo de verificacion es</p> <br><br><h2>' + codigo + '</h2>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) return false;
    });

    return true;

}

exports.verificarCodigo = (req, res) => {
    console.log(req.body);
    Usuario.findOne({ email: req.body.email })
        .exec()
        .then((usuario) => {

            if (!usuario) return res.status(401).json({ status: 'error', code: "Usuario no encontrado" });

            var codigo = usuario.codigo;

            Codigo.findOne({ _id: codigo }).exec().then(code => {
                if (code.codigo === req.body.codigo) {
                    code.entregado = true;
                    code.save();

                    return res.status(200).json({ status: 'success', code: "Codigo validado con exito" });
                } else {
                    return res.status(500).json({ status: 'error', code: "El codigo ingresado no es correcto" });
                }
            })

        })
}

exports.getUsuarios = (req, res) => {
    Usuario.find((err, usuarios) => {
        res.status(200).json({
            usuarios: usuarios
        })
    })
        .populate({ path: 'codigo', model: 'Codigo' })
}

exports.fetchUsuario = (req, res) => {
    jwt.verify(req.body.token, secret, function (err, decoded) {
        if (err) return res.json(err);

        Usuario.findById(decoded)
            .populate({ path: 'codigo', model: 'Codigo' })
            .then(usuario => usuario ? res.json(usuario) : res.json(false))
            .catch(err => res.json(err))
    });
}

exports.deleteUsuario = (req, res) => {
    Usuario.findByIdAndRemove({ _id: req.params.id }, (err, usuario) => {
        if (err) return res.status(500).json({
            error: err
        })
        return res.status(200).json({
            mensaje: "Usuario eliminado",
            usuario: usuario
        })
    })
}

exports.getLastCode = (req, res) => {
    Codigo.find((err, codigos) => {
        console.log(codigos.length);
        res.json({
            last: codigos[codigos.length - 1]
        })
    })
}