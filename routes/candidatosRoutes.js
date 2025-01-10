const express = require('express');
const router = express.Router();
const candidatosController = require('../controllers/candidatosController.js');

router.get('/', candidatosController.consultar)

router.post('/', candidatosController.ingresar)

router.route("/:id")
    .get(candidatosController.consultarDetalle)
    .delete(candidatosController.borrar);

module.exports = router;