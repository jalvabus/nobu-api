var express = require('express');
var router = express.Router();
var controller = require('./notificacion.controller');

router.get('/', controller.getNotificaciones);
router.post('/', controller.CreateNotificacion);
router.get('/:id_usuario', controller.NotificacionesPorUsuario);

module.exports = router;