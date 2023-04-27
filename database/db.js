const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  port: '3306',
  password: '988776',
  database: 'colegio',
  connectionLimit: 5
});
pool.getConnection()
  .then(conn => {
    console.log("Conexión a la base de datos establecida");
    conn.release();
  })
  .catch(err => {
    console.log("No se pudo establecer la conexión a la base de datos:", err);
  });


module.exports = pool;
