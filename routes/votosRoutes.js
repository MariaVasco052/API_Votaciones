const express = require('express');
const router = express.Router();
const votosController = require('../controllers/votosController.js');

router.get('/', votosController.consultar)
router.get('/estadisticas', votosController.consultarEstadisticas)

router.post('/', votosController.ingresar)

module.exports = router;