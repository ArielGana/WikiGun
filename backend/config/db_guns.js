// config/db_guns.js
require("dotenv").config(); // Cargar las variables de entorno
const { Client } = require("pg"); // Usar el cliente de PostgreSQL

// Parsear la DATABASE_URL
const connectionString = process.env.DATABASE_URL;

// Crear una nueva instancia del cliente de PostgreSQL
const dbGuns = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones SSL con Supabase
  },
});

// Función para conectar a la base de datos
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
