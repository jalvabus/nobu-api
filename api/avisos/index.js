var express = require('express');
var router = express.Router();
var controller = require('./avisos.controller');

router.get('/', controller.getAvisos);
router.get('/avisosHoy', controller.getAvisosHoy);
router.post('/', controller.createAviso);
router.put('/:id', controller.updateAviso);
router.delete('/:id', controller.deleteAviso)

module.exports = router;