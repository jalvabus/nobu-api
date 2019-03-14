var express = require('express');
var router = express.Router();
var controller = require('./vulcano.controller');

router.get('/', controller.readVulcanos);
router.post('/', controller.createVulcano);
router.delete('/:id', controller.deleteVulcano);
router.put('/:id', controller.updateVulcano);

router.post('/fetchVulcano', controller.fetchVulcano);
router.get('/getByGuardia/:guardia', controller.readVulcanosByGuardia);

module.exports = router;