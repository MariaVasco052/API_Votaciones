const express = require('express');
const router = express.Router();
const votantesController = require('../controllers/votantesController.js');

router.get('/', votantesController.consultar)

router.post('/', votantesController.ingresar)

router.route("/:id")
    .get(votantesController.consultarDetalle)
    .delete(votantesController.borrar);

module.exports = router;