//config/db.js
require("dotenv").config(); // Cargar las variables de entorno

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST, // Variables de la base de datos principal
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const connectDB = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        reject("Error al conectar con la base de datos: " + err);
      } else {
        resolve("Conexión exitosa a la base de datos");
      }
    });
  });
};

module.exports = { db, connectDB };
