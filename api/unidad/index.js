var express = require('express');
var router = express.Router();
var controller = require('./unidad.controller');

router.get('/', controller.getUnidades);
router.post('/', controller.createUniad);
router.delete('/:id', controller.deleteUnidad);
router.put('/:id', controller.updateUnidad);

router.get('/getByGuardia/:guardia', controller.getUnidadesByguardia);

module.exports = router;