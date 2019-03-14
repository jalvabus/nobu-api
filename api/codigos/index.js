var express = require('express');
var router = express.Router();
var controller = require('./codigo.controller');

router.get('/', controller.getCodigos);

module.exports = router;