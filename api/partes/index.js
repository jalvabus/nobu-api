var express = require('express');
var router = express.Router();
var controller = require('./partes.controller');

router.get('/', controller.verReporte);

module.exports = router;