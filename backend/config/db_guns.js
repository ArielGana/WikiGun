//config/db_guns.js
require("dotenv").config(); // Cargar las variables de entorno

const mysql = require("mysql2");

const dbGuns = mysql.createConnection({
  host: process.env.DB_HOST1, // Variables de la base de datos de armas
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  database: process.env.DB_NAME1,
  port: process.env.DB_PORT1,
});

const connectDBGuns = () => {
  return new Promise((resolve, reject) => {
    dbGuns.connect((err) => {
      if (err) {
        reject("Error al conectar con la base de datos de Armas: " + err);
      } else {
        resolve("Conexión exitosa a la base de datos de Armas");
      }
    });
  });
};

module.exports = { dbGuns, connectDBGuns };
