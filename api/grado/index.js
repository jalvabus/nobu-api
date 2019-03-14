var express = require('express');
var router = express.Router();
var controller = require('./grado.controller');

router.get('/', controller.getGrados);
router.post('/', controller.createGrado);
router.delete('/:id', controller.deleteGrado);
router.put('/:id', controller.updateGrado);

module.exports = router;