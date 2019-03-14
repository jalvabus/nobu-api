
var router = require('express').Router();
var passport = require('./../config/auth');
var jwt = require('jsonwebtoken')
var Usuario = require('../api/usuario/usuario.model');
const secret = 'nobu2018'
var bcrypt = require('bcryptjs');


router.post('/login', function (req, res, next) {
    console.log(req.body);
    passport.authenticate('local', function (err, usuario) {
        if (err) return next(err);
        if (!usuario) {
            return res.status(401).json({ status: 'error', error: err, code: 'unauthorized' });
        } else {
            return res.json(jwt.sign({ _id: usuario._id }, secret));
        }
    })(req, res, next);

});

router.post('/loginUsuario', function (req, res, next) {
    console.log(req.body);
    var usuarioTxt = req.body.usuario;
    var passwordTxt = req.body.password;

    Usuario.findOne({ email: usuarioTxt })
        .exec()
        .then((usuario) => {
            console.log(usuario);
            if (!usuario) return res.status(401).json({ status: 'error', code: "Usuario no encontrado" });

            new Promise((resolve, reject) => {
                bcrypt.compare(passwordTxt, usuario.password, function (err, isOk) {
                    isOk ? resolve(usuario) : resolve(null)
                })
            }).then(usuario => {
                if (usuario) {
                    return res.json(jwt.sign({ _id: usuario._id }, secret));
                } else {
                    return res.status(401).json({ status: 'error', code: "Contraseña incorrecta" });
                }
            })

        })

});

module.exports = router;