var router = require('express').Router();
var passport = require('../config/auth');

/*
router.all('*', function (req, res, next) {
    console.log(req.headers);
    passport.authenticate('bearer', function (err, usuario) {
        if (err) return next(err);
        if (usuario) {
            req.usuario = usuario;
            return next();
        } else {
            return res.status(401).json({ status: 'error', code: 'unauthorized', error: err });
        }
    })(req, res, next);

});
*/

router.get('/', (req, res) => {
    res.json({ mensaje: "GET /api" })
});

router.use('/aviso', require('./avisos'));
router.use('/asignacion-unidad', require('./asignacion-unidad'));
router.use('/asignacion-comision', require('./asignacion-comision'));
router.use('/codigos', require('./codigos'));
router.use('/comision', require('./comision'));
router.use('/estacion', require('./estacion'));
router.use('/estacion-mandos', require('./estacion-mandos'))
router.use('/grado', require('./grado'));
router.use('/guardia', require('./guardia'));
router.use('/mando', require('./mando'));
router.use('/notificacion', require('./notificaciones'));
router.use('/pase-lista', require('./pase-lista'));
router.use('/unidad', require('./unidad'));
router.use('/usuario', require('./usuario'));
router.use('/vulcano', require('./vulcano'));

router.use('/parte', require('./partes'));

router.use('/getGuardia', require('./getGuardia'));
module.exports = router;