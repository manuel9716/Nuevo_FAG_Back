// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Archivos estáticos como CSS

// Configurar el motor de plantillas
app.set('view engine', 'ejs');

// Rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Escuchar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});