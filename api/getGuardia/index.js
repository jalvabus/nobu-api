var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/:fecha', controller.getGuardiaHoy);
router.get('/asignar', controller.asignarGuardiaHoy);

module.exports = router;