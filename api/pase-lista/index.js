var express = require('express');
var router = express.Router();
var controller = require('./lista.controller');

router.get('/', controller.getListas);
router.post('/pase', controller.paseLista);
router.get('/hoy', controller.obtenerHoy);
router.delete('/:id', controller.deleteLista);

router.get('/validateAsistencia/:idVulcano', controller.validateVulcano);

module.exports = router;