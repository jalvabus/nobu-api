var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.get('/', controller.verAsignaciones);
router.post('/', controller.createAsignacion);
router.get('/getComisionHoy', controller.getAsignacionHoy);

module.exports = router;