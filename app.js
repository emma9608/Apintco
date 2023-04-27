const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/db');
const usuariosController = require('./controllers/usuariosController');

const app = express();

// Configuración del servidor
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.get('/', usuariosController.listarUsuarios);
app.get('/agregar', usuariosController.mostrarFormularioAgregar);
app.post('/agregar', usuariosController.agregarUsuario);
app.get('/editar/:id', usuariosController.mostrarFormularioEditar);
app.post('/editar/:id', usuariosController.actualizarUsuario);
app.get('/eliminar/:id', usuariosController.eliminarUsuario);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});