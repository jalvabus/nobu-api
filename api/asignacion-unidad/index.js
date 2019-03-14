var express = require('express');
var router = express.Router();
var controller = require('./asignacion.controller');

router.get('/', controller.getAsignaciones);
router.post('/', controller.createAsignacion);
router.delete('/:id', controller.deleteAsigncaion);
router.put('/:id', controller.updateAsigncaion);
router.post('/delete', controller.deleteIfExist);

router.get('/getAsignacionHoy', controller.obtenerHoy);

module.exports = router;