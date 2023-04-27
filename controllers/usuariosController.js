const db = require("../database/db");

exports.listarUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, rows) => {
    if (err) {
      console.error(err);
      res.render("error", { mensaje: "Error al listar los usuarios" });
    } else {
      res.render("listar", { usuarios: rows });
    }
  });
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
  
exports.editarUsuario = (req, res) => {
  const id = req.params.id;
  const { nombre, correo, telefono } = req.body;
  const usuarioEditado = { nombre, correo, telefono };
  db.query(
    "UPDATE usuarios SET ? WHERE id = ?",
    [usuarioEditado, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.render("error", { mensaje: "Error al editar el usuario" });
      } else if (result.affectedRows === 0) {
        res.render("error", { mensaje: "El usuario no existe" });
      } else {
        res.render("exito", { mensaje: "Usuario editado exitosamente" });
      }
    }
  );
};

exports.eliminarUsuario = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM usuarios WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.render("error", { mensaje: "Error al eliminar el usuario" });
    } else if (result.affectedRows === 0) {
      res.render("error", { mensaje: "El usuario no existe" });
    } else {
      res.render("exito", { mensaje: "Usuario eliminado exitosamente" });
    }
  });
};

exports.mostrarFormularioAgregar = (req, res) => {
    res.render('agregar');
  };
  
  exports.mostrarFormularioEditar = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM usuarios WHERE id = ?", id, (err, rows) => {
      if (err) {
        console.error(err);
        res.render("error", { mensaje: "Error al obtener el usuario" });
      } else if (rows.length === 0) {
        res.render("error", { mensaje: "El usuario no existe" });
      } else {
        res.render("editar", { usuario: rows[0] });
      }
    });
  };
  exports.actualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { nombre, correo, telefono } = req.body;
    const usuarioEditado = { nombre, correo, telefono };
    db.query(
      "UPDATE usuarios SET ? WHERE id = ?",
      [usuarioEditado, id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.render("error", { mensaje: "Error al actualizar el usuario" });
        } else if (result.affectedRows === 0) {
          res.render("error", { mensaje: "El usuario no existe" });
        } else {
          res.render("exito", { mensaje: "Usuario actualizado exitosamente" });
        }
      }
    );
  };
  
  