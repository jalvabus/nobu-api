var express = require('express');
var router = express.Router();
var controller = require('./comision.controller');

router.get('/', controller.getComisiones);
router.post('/', controller.createComision);
router.delete('/:id', controller.deleteComision);
router.put('/:id', controller.updateComision);

module.exports = router;