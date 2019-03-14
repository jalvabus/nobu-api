var express = require('express');
var router = express.Router();
var controller = require('./guardia.controller');

router.get('/', controller.getGuardias);
router.post('/', controller.createGuardia);
router.delete('/:id', controller.deleteGuardia);
router.put('/:id', controller.updateGuardia);

module.exports = router;