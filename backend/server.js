const express = require("express");
const db = require("./config/db"); // Importar la conexión a la base de datos
require("dotenv").config();

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas de ejemplo
app.get("/", (req, res) => {
  res.send("Bienvenido al Comparador de Armas");
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
