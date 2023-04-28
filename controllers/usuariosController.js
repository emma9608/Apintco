const db = require("../database/db");

exports.listarUsuarios = async (req, res) => {
  try {
    const rows = await db.query("SELECT * FROM usuarios");
    res.render("listar", { usuarios: rows });
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al listar los usuarios" });
  }
};

exports.agregarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const result = await db.query("INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)", [nombre, email, contraseña]);
    console.log(result);
    res.render("exito", { mensaje: "Usuario agregado exitosamente" });
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al agregar el usuario" });
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, correo, telefono } = req.body;
    const usuarioEditado = { nombre, correo, telefono };
    const result = await db.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [usuarioEditado, id]
    );
    if (result.affectedRows === 0) {
      res.render("error", { mensaje: "El usuario no existe" });
    } else {
      res.render("exito", { mensaje: "Usuario editado exitosamente" });
    }
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al editar el usuario" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("DELETE FROM usuarios WHERE id = ?", id);
    if (result.affectedRows === 0) {
      res.render("error", { mensaje: "El usuario no existe" });
    } else {
      res.render("exito", { mensaje: "Usuario eliminado exitosamente" });
    }
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al eliminar el usuario" });
  }
};

exports.mostrarFormularioAgregar = async (req, res) => {
  res.render("agregar");
};

exports.mostrarFormularioEditar = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await db.query("SELECT * FROM usuarios WHERE id = ?", id);
    if (rows.length === 0) {
      res.render("error", { mensaje: "El usuario no existe" });
    } else {
      res.render("editar", { usuario: rows[0] });
    }
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al obtener el usuario" });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, correo, telefono } = req.body;
    const usuarioEditado = { nombre, correo, telefono };
    const result = await db.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [usuarioEditado, id]
    );
    if (result.affectedRows === 0) {
      res.render("error", { mensaje: "El usuario no existe" });
    } else {
      res.render("exito", { mensaje: "Usuario actualizado exitosamente" });
    }
  } catch (err) {
    console.error(err);
    res.render("error", { mensaje: "Error al actualizar el usuario" });
  }
};

  