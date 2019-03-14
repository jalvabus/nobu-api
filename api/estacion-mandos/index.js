var express = require('express');
var router = express.Router();
var controller = require('./estacionMandos.controller');

router.get('/', controller.getMandos);
router.post('/', controller.createMando);
router.delete('/:id', controller.deleteMando);
router.put('/:id', controller.updateMAndo);

module.exports = router;