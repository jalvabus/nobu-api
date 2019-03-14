var express= require('express');
var router = express.Router();
var controller = require('./estacion.controller');

router.get('/', controller.getEstaciones);
router.post('/', controller.createEstacion);
router.delete('/:id', controller.deleteEstacion);
router.put('/:id', controller.updateEstacion);

module.exports = router;