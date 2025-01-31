require("dotenv").config();
const express = require("express");
const cors = require("cors");
const armasRoutes = require("./routes/routes_gunsdb");
const cloudRoutes = require("./config/cloud");

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Usar las rutas de armas
app.use("/api", armasRoutes);

// Usar las rutas de Cloudinary
app.use("/api/cloudinary", cloudRoutes);

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend de Sitio de gun!");
});

// Exportar la aplicación para Vercel
module.exports = app;
