// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Controlador
const mainController = require('../controllers/mainController');

// Ruta de inicio
router.get('/', mainController.index);

module.exports = router;