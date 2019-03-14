var express = require('express');
var router = express.Router();
var controller = require('./usuario.controller');

router.get('/', controller.getUsuarios);
router.post('/', controller.createUsuario);
router.post('/fetchUsuario', controller.fetchUsuario);
router.post('/verificarCodigo', controller.verificarCodigo);
router.delete('/:id', controller.deleteUsuario);

router.get('/lastOne', controller.getLastCode);

module.exports = router;