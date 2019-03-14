var bcrypt = require('bcryptjs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy, Strategy = require('passport-http-bearer').Strategy;
var Promise = require('bluebird');

var Vulcano = require('../api/vulcano/vulcano.model');
var Usuario = require('../api/usuario/usuario.model');

var jwt = require('jsonwebtoken')

Promise.promisifyAll(bcrypt);

const secret = 'nobu2018'

passport.use(new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    session: false
},
    function (usuarioTxt, passwordTxt, done) {
        // usuarioTxt = sanitizer.sanitize(usuarioTxt);

        Vulcano.findOne({ usuario: usuarioTxt })
            .exec()
            .then((usuario) => {

                if (!usuario) { return done(null, false) };

                bcrypt.compare(passwordTxt, usuario.password, function (err, isOk) {
                    isOk ? done(null, usuario) : done(null, false)
                })
            })
    }
));


passport.use(new Strategy(function (token, cb) {
    console.log(token);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) return cb(err);

        Vulcano.findById(decoded)
            .then(usuario => usuario ? cb(null, usuario) : cb(null, false))
            .catch(err => cb(err))
    });
}));


module.exports = passport;