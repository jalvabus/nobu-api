var express = require('express');
var router = express.Router();
var controller = require('./mando.controller');

router.get('/', controller.getMandos);
router.post('/', controller.createMando);
router.put('/:id', controller.updateMando);
router.delete('/:id', controller.deleteMando);

module.exports = router;